import { Pool, PoolConnection, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/database.js";
import { Booking, BookingStatus, BookingStatusHistory } from "../types/index.js";

export class BookingRepository {
  constructor(private db: Pool = pool) {}

  async findById(id: number, conn?: PoolConnection): Promise<Booking | null> {
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
    const [rows] = await client.query<RowDataPacket[]>(query, [id]);
    return (rows[0] as Booking) || null;
  }

  async findConflicts(
    saleId: number,
    bookingDate: string,
    startTime: string,
    endTime: string,
    conn?: PoolConnection
  ): Promise<Booking[]> {
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
    const [rows] = await client.query<RowDataPacket[]>(query, [
      saleId,
      bookingDate,
      startTime,
      startTime,
      endTime,
      endTime,
      startTime,
      endTime
    ]);
    return rows as Booking[];
  }

  async findByCustomer(customerId: number, status?: string): Promise<Booking[]> {
    let query = `
      SELECT b.*, us.full_name as sale_name, p.title as property_title
      FROM bookings b
      JOIN users us ON b.sale_id = us.id
      JOIN properties p ON b.property_id = p.id
      WHERE b.customer_id = ?
    `;
    const params: any[] = [customerId];
    if (status) {
      query += ` AND b.status = ?`;
      params.push(status);
    }
    query += ` ORDER BY b.booking_date DESC, b.start_time DESC`;
    const [rows] = await this.db.query<RowDataPacket[]>(query, params);
    return rows as Booking[];
  }

  async findBySale(saleId: number, status?: string): Promise<Booking[]> {
    let query = `
      SELECT b.*, uc.full_name as customer_name, uc.phone as customer_phone, p.title as property_title
      FROM bookings b
      JOIN users uc ON b.customer_id = uc.id
      JOIN properties p ON b.property_id = p.id
      WHERE b.sale_id = ?
    `;
    const params: any[] = [saleId];
    if (status) {
      query += ` AND b.status = ?`;
      params.push(status);
    }
    query += ` ORDER BY b.booking_date DESC, b.start_time DESC`;
    const [rows] = await this.db.query<RowDataPacket[]>(query, params);
    return rows as Booking[];
  }

  async findAll(status?: string): Promise<Booking[]> {
    let query = `
      SELECT b.*, uc.full_name as customer_name, us.full_name as sale_name, p.title as property_title
      FROM bookings b
      JOIN users uc ON b.customer_id = uc.id
      JOIN users us ON b.sale_id = us.id
      JOIN properties p ON b.property_id = p.id
    `;
    const params: any[] = [];
    if (status) {
      query += ` WHERE b.status = ?`;
      params.push(status);
    }
    query += ` ORDER BY b.created_at DESC`;
    const [rows] = await this.db.query<RowDataPacket[]>(query, params);
    return rows as Booking[];
  }

  async createBookingInTransaction(
    data: {
      customerId: number;
      saleId: number;
      propertyId: number;
      bookingDate: string;
      startTime: string;
      endTime: string;
      customerNote?: string;
    },
    conn: PoolConnection
  ): Promise<number> {
    const query = `
      INSERT INTO bookings (customer_id, sale_id, property_id, booking_date, start_time, end_time, status, customer_note, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'PENDING', ?, NOW(), NOW())
    `;
    const [result] = await conn.query<ResultSetHeader>(query, [
      data.customerId,
      data.saleId,
      data.propertyId,
      data.bookingDate,
      data.startTime,
      data.endTime,
      data.customerNote || null
    ]);
    const bookingId = result.insertId;

    // Insert initial status history
    await conn.query(
      `INSERT INTO booking_status_history (booking_id, old_status, new_status, actor_id, reason, created_at)
       VALUES (?, NULL, 'PENDING', ?, 'Khách hàng tạo lịch xem nhà mới', NOW())`,
      [bookingId, data.customerId]
    );

    return bookingId;
  }

  async updateStatusInTransaction(
    bookingId: number,
    oldStatus: BookingStatus,
    newStatus: BookingStatus,
    actorId: number,
    reason: string | undefined,
    conn: PoolConnection
  ): Promise<void> {
    await conn.query(
      `UPDATE bookings SET status = ?, updated_at = NOW() WHERE id = ?`,
      [newStatus, bookingId]
    );

    await conn.query(
      `INSERT INTO booking_status_history (booking_id, old_status, new_status, actor_id, reason, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [bookingId, oldStatus, newStatus, actorId, reason || null]
    );
  }

  async getStatusHistory(bookingId: number): Promise<BookingStatusHistory[]> {
    const query = `
      SELECT h.id, h.booking_id, h.old_status, h.new_status, h.actor_id, 
             u.full_name as actor_name, r.name as actor_role, h.reason, h.created_at
      FROM booking_status_history h
      LEFT JOIN users u ON h.actor_id = u.id
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE h.booking_id = ?
      ORDER BY h.created_at ASC
    `;
    const [rows] = await this.db.query<RowDataPacket[]>(query, [bookingId]);
    return rows as BookingStatusHistory[];
  }
}
