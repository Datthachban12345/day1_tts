"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityRepository = void 0;
const node_crypto_1 = require("node:crypto");
const database_js_1 = require("../config/database.js");
class AvailabilityRepository {
    db;
    constructor(db = database_js_1.pool) {
        this.db = db;
    }
    async findBySaleId(saleId) {
        const query = `
      SELECT id, sale_id as saleId, day_of_week as dayOfWeek, start_time as startTime, end_time as endTime, is_active as isActive
      FROM sale_availability
      WHERE sale_id = ? AND is_active = 1
      ORDER BY day_of_week ASC, start_time ASC
    `;
        const [rows] = await this.db.query(query, [saleId]);
        return rows;
    }
    async checkSlotAvailable(saleId, dayOfWeek, startTime, endTime) {
        const query = `
      SELECT id FROM sale_availability
      WHERE sale_id = ?
        AND day_of_week = ?
        AND start_time <= ?
        AND end_time >= ?
        AND is_active = 1
      LIMIT 1
    `;
        const [rows] = await this.db.query(query, [
            saleId,
            dayOfWeek,
            startTime,
            endTime
        ]);
        return rows.length > 0;
    }
    async setAvailability(saleId, slots) {
        await this.db.query(`DELETE FROM sale_availability WHERE sale_id = ?`, [saleId]);
        for (const slot of slots) {
            await this.db.query(`INSERT INTO sale_availability (id, sale_id, day_of_week, start_time, end_time, is_active) VALUES (?, ?, ?, ?, ?, 1)`, [(0, node_crypto_1.randomUUID)(), saleId, slot.dayOfWeek, slot.startTime, slot.endTime]);
        }
    }
}
exports.AvailabilityRepository = AvailabilityRepository;
