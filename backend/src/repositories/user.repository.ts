import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { randomUUID } from "node:crypto";
import { pool } from "../config/database.js";
import { User, UserProfile, UserRole } from "../types/index.js";

export class UserRepository {
  constructor(private db: Pool = pool) {}

  async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT u.*, r.code as role_name 
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = ?
      LIMIT 1
    `;
    const [rows] = await this.db.query<RowDataPacket[]>(query, [email]);
    return (rows[0] as User) || null;
  }

  async findById(id: string): Promise<UserProfile | null> {
    const query = `
      SELECT u.id, u.email, u.full_name as fullName, u.phone, r.code as role, u.is_active as isActive, u.created_at as createdAt
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
      LIMIT 1
    `;
    const [rows] = await this.db.query<RowDataPacket[]>(query, [id]);
    return (rows[0] as UserProfile) || null;
  }

  async findAll(role?: UserRole): Promise<UserProfile[]> {
    let query = `
      SELECT u.id, u.email, u.full_name as fullName, u.phone, r.code as role, u.is_active as isActive, u.created_at as createdAt
      FROM users u
      JOIN roles r ON u.role_id = r.id
    `;
    const params: any[] = [];
    if (role) {
      query += ` WHERE r.name = ?`;
      params.push(role);
    }
    query += ` ORDER BY u.created_at DESC`;
    const [rows] = await this.db.query<RowDataPacket[]>(query, params);
    return rows as UserProfile[];
  }

  async getRoleIdByName(roleName: UserRole): Promise<string | null> {
    const [rows] = await this.db.query<RowDataPacket[]>(
      `SELECT id FROM roles WHERE code = ? LIMIT 1`,
      [roleName]
    );
    return rows[0] ? (rows[0].id as string) : null;
  }

  async create(data: {
    email: string;
    passwordHash: string;
    fullName: string;
    phone: string;
    roleId: string;
  }): Promise<string> {
    const id = randomUUID();
    const query = `
      INSERT INTO users (id, email, password_hash, full_name, phone, role_id, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 1, NOW(), NOW())
    `;
    const [result] = await this.db.query<ResultSetHeader>(query, [
      id,
      data.email,
      data.passwordHash,
      data.fullName,
      data.phone,
      data.roleId
    ]);
    return id;
  }

  async updateActiveStatus(id: string, isActive: boolean): Promise<boolean> {
    const [result] = await this.db.query<ResultSetHeader>(
      `UPDATE users SET is_active = ?, updated_at = NOW() WHERE id = ?`,
      [isActive ? 1 : 0, id]
    );
    return result.affectedRows > 0;
  }
}
