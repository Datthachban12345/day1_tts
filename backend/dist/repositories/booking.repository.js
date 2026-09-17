"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const node_crypto_1 = require("node:crypto");
const database_js_1 = require("../config/database.js");
class BookingRepository {
    db;
    constructor(db = database_js_1.pool) {
        this.db = db;
    }
    async findById(id, conn) {
        const client = conn || this.db;
        const query = `
      SELECT b.*, 
             uc.full_name as customer_name, uc.phone as customer_phone,
             us.full_name as sale_name,
             p.title as property_title
      FROM bookings b
      JOIN users uc ON b.customer_id = uc.id
      JOIN users us ON b.sale_id = us.id
      JOIN properties p ON b.property_id = p.id
      WHERE b.id = ?
      LIMIT 1
    `;
        const [rows] = await client.query(query, [id]);
        return rows[0] || null;
    }
    async findConflicts(saleId, bookingDate, startTime, endTime, conn) {
        const client = conn || this.db;
        const query = `
      SELECT * FROM bookings
      WHERE sale_id = ?
        AND booking_date = ?
        AND status IN ('PENDING', 'CONFIRMED')
        AND (
          (start_time <= ? AND end_time > ?) OR
          (start_time < ? AND end_time >= ?) OR
          (start_time >= ? AND end_time <= ?)
        )
    `;
        const [rows] = await client.query(query, [
            saleId,
            bookingDate,
            startTime,
            startTime,
            endTime,
            endTime,
            startTime,
            endTime
        ]);
        return rows;
    }
    async findByCustomer(customerId, status) {
        let query = `
      SELECT b.*, us.full_name as sale_name, p.title as property_title
      FROM bookings b
      JOIN users us ON b.sale_id = us.id
      JOIN properties p ON b.property_id = p.id
      WHERE b.customer_id = ?
    `;
        const params = [customerId];
        if (status) {
            query += ` AND b.status = ?`;
            params.push(status);
        }
        query += ` ORDER BY b.booking_date DESC, b.start_time DESC`;
        const [rows] = await this.db.query(query, params);
        return rows;
    }
    async findBySale(saleId, status) {
        let query = `
      SELECT b.*, uc.full_name as customer_name, uc.phone as customer_phone, p.title as property_title
      FROM bookings b
      JOIN users uc ON b.customer_id = uc.id
      JOIN properties p ON b.property_id = p.id
      WHERE b.sale_id = ?
    `;
        const params = [saleId];
        if (status) {
            query += ` AND b.status = ?`;
            params.push(status);
        }
        query += ` ORDER BY b.booking_date DESC, b.start_time DESC`;
        const [rows] = await this.db.query(query, params);
        return rows;
    }
    async findAll(status) {
        let query = `
      SELECT b.*, uc.full_name as customer_name, us.full_name as sale_name, p.title as property_title
      FROM bookings b
      JOIN users uc ON b.customer_id = uc.id
      JOIN users us ON b.sale_id = us.id
      JOIN properties p ON b.property_id = p.id
    `;
        const params = [];
        if (status) {
            query += ` WHERE b.status = ?`;
            params.push(status);
        }
        query += ` ORDER BY b.created_at DESC`;
        const [rows] = await this.db.query(query, params);
        return rows;
    }
    async createBookingInTransaction(data, conn) {
        const bookingId = (0, node_crypto_1.randomUUID)();
        const query = `
      INSERT INTO bookings (id, customer_id, sale_id, property_id, booking_date, start_time, end_time, status, customer_note, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', ?, NOW(), NOW())
    `;
        const [result] = await conn.query(query, [
            bookingId,
            data.customerId,
            data.saleId,
            data.propertyId,
            data.bookingDate,
            data.startTime,
            data.endTime,
            data.customerNote || null
        ]);
        // Insert initial status history
        await conn.query(`INSERT INTO booking_status_history (id, booking_id, previous_status, new_status, changed_by, reason, created_at)
        VALUES (?, ?, NULL, 'PENDING', ?, 'Khách hàng tạo lịch xem nhà mới', NOW())`, [(0, node_crypto_1.randomUUID)(), bookingId, data.customerId]);
        return bookingId;
    }
    async updateStatusInTransaction(bookingId, oldStatus, newStatus, actorId, reason, conn) {
        await conn.query(`UPDATE bookings SET status = ?, updated_at = NOW() WHERE id = ?`, [newStatus, bookingId]);
        await conn.query(`INSERT INTO booking_status_history (id, booking_id, previous_status, new_status, changed_by, reason, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`, [(0, node_crypto_1.randomUUID)(), bookingId, oldStatus, newStatus, actorId, reason || null]);
    }
    async getStatusHistory(bookingId) {
        const query = `
      SELECT h.id, h.booking_id, h.previous_status as old_status, h.new_status, h.changed_by as actor_id, 
             u.full_name as actor_name, r.name as actor_role, h.reason, h.created_at
      FROM booking_status_history h
      LEFT JOIN users u ON h.changed_by = u.id
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE h.booking_id = ?
      ORDER BY h.created_at ASC
    `;
        const [rows] = await this.db.query(query, [bookingId]);
        return rows;
    }
}
exports.BookingRepository = BookingRepository;
