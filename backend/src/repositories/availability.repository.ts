import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/database.js";
import { SaleAvailability } from "../types/index.js";

export class AvailabilityRepository {
  constructor(private db: Pool = pool) {}

  async findBySaleId(saleId: number): Promise<SaleAvailability[]> {
    const query = `
      SELECT id, sale_id as saleId, day_of_week as dayOfWeek, start_time as startTime, end_time as endTime, is_active as isActive
      FROM sale_availability
      WHERE sale_id = ? AND is_active = 1
      ORDER BY day_of_week ASC, start_time ASC
    `;
    const [rows] = await this.db.query<RowDataPacket[]>(query, [saleId]);
    return rows as SaleAvailability[];
  }

  async checkSlotAvailable(
    saleId: number,
    dayOfWeek: number,
    startTime: string,
    endTime: string
  ): Promise<boolean> {
    const query = `
      SELECT id FROM sale_availability
      WHERE sale_id = ?
        AND day_of_week = ?
        AND start_time <= ?
        AND end_time >= ?
        AND is_active = 1
      LIMIT 1
    `;
    const [rows] = await this.db.query<RowDataPacket[]>(query, [
      saleId,
      dayOfWeek,
      startTime,
      endTime
    ]);
    return rows.length > 0;
  }

  async setAvailability(
    saleId: number,
    slots: { dayOfWeek: number; startTime: string; endTime: string }[]
  ): Promise<void> {
    await this.db.query(`DELETE FROM sale_availability WHERE sale_id = ?`, [saleId]);
    for (const slot of slots) {
      await this.db.query(
        `INSERT INTO sale_availability (sale_id, day_of_week, start_time, end_time, is_active) VALUES (?, ?, ?, ?, 1)`,
        [saleId, slot.dayOfWeek, slot.startTime, slot.endTime]
      );
    }
  }
}
