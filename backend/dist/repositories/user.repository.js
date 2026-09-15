"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_js_1 = require("../config/database.js");
class UserRepository {
    db;
    constructor(db = database_js_1.pool) {
        this.db = db;
    }
    async findByEmail(email) {
        const query = `
      SELECT u.*, r.name as role_name 
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = ?
      LIMIT 1
    `;
        const [rows] = await this.db.query(query, [email]);
        return rows[0] || null;
    }
    async findById(id) {
        const query = `
      SELECT u.id, u.email, u.full_name as fullName, u.phone, r.name as role, u.is_active as isActive, u.created_at as createdAt
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
      LIMIT 1
    `;
        const [rows] = await this.db.query(query, [id]);
        return rows[0] || null;
    }
    async findAll(role) {
        let query = `
      SELECT u.id, u.email, u.full_name as fullName, u.phone, r.name as role, u.is_active as isActive, u.created_at as createdAt
      FROM users u
      JOIN roles r ON u.role_id = r.id
    `;
        const params = [];
        if (role) {
            query += ` WHERE r.name = ?`;
            params.push(role);
        }
        query += ` ORDER BY u.created_at DESC`;
        const [rows] = await this.db.query(query, params);
        return rows;
    }
    async getRoleIdByName(roleName) {
        const [rows] = await this.db.query(`SELECT id FROM roles WHERE name = ? LIMIT 1`, [roleName]);
        return rows[0] ? rows[0].id : null;
    }
    async create(data) {
        const query = `
      INSERT INTO users (email, password_hash, full_name, phone, role_id, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())
    `;
        const [result] = await this.db.query(query, [
            data.email,
            data.passwordHash,
            data.fullName,
            data.phone,
            data.roleId
        ]);
        return result.insertId;
    }
    async updateActiveStatus(id, isActive) {
        const [result] = await this.db.query(`UPDATE users SET is_active = ?, updated_at = NOW() WHERE id = ?`, [isActive ? 1 : 0, id]);
        return result.affectedRows > 0;
    }
}
exports.UserRepository = UserRepository;
