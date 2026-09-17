"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const node_crypto_1 = require("node:crypto");
const database_js_1 = require("../config/database.js");
class NotificationRepository {
    db;
    constructor(db = database_js_1.pool) {
        this.db = db;
    }
    async create(data, conn) {
        const id = (0, node_crypto_1.randomUUID)();
        const client = conn || this.db;
        const query = `
      INSERT INTO notifications (id, user_id, title, message, type, is_read, created_at)
      VALUES (?, ?, ?, ?, 'SYSTEM', 0, NOW())
    `;
        const [result] = await client.query(query, [
            id,
            data.userId,
            data.title,
            data.message
        ]);
        return id;
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
