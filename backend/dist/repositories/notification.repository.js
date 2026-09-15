"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const database_js_1 = require("../config/database.js");
class NotificationRepository {
    db;
    constructor(db = database_js_1.pool) {
        this.db = db;
    }
    async create(data, conn) {
        const client = conn || this.db;
        const query = `
      INSERT INTO notifications (user_id, title, message, is_read, created_at)
      VALUES (?, ?, ?, 0, NOW())
    `;
        const [result] = await client.query(query, [
            data.userId,
            data.title,
            data.message
        ]);
        return result.insertId;
    }
    async findByUserId(userId) {
        const query = `
      SELECT id, user_id as userId, title, message, is_read as isRead, created_at as createdAt
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
        const [rows] = await this.db.query(query, [userId]);
        return rows;
    }
    async markAsRead(id, userId) {
        const [result] = await this.db.query(`UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?`, [id, userId]);
        return result.affectedRows > 0;
    }
}
exports.NotificationRepository = NotificationRepository;
