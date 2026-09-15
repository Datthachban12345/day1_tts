import { Pool, PoolConnection, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/database.js";
import { Notification } from "../types/index.js";

export class NotificationRepository {
  constructor(private db: Pool = pool) {}

  async create(
    data: { userId: number; title: string; message: string },
    conn?: PoolConnection
  ): Promise<number> {
    const client = conn || this.db;
    const query = `
      INSERT INTO notifications (user_id, title, message, is_read, created_at)
      VALUES (?, ?, ?, 0, NOW())
    `;
    const [result] = await client.query<ResultSetHeader>(query, [
      data.userId,
      data.title,
      data.message
    ]);
    return result.insertId;
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    const query = `
      SELECT id, user_id as userId, title, message, is_read as isRead, created_at as createdAt
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
    const [rows] = await this.db.query<RowDataPacket[]>(query, [userId]);
    return rows as Notification[];
  }

  async markAsRead(id: number, userId: number): Promise<boolean> {
    const [result] = await this.db.query<ResultSetHeader>(
      `UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?`,
      [id, userId]
    );
    return result.affectedRows > 0;
  }
}
