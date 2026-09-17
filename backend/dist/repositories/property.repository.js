"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyRepository = void 0;
const node_crypto_1 = require("node:crypto");
const database_js_1 = require("../config/database.js");
class PropertyRepository {
    db;
    constructor(db = database_js_1.pool) {
        this.db = db;
    }
    async findAll(filter) {
        const page = filter.page || 1;
        const limit = filter.limit || 10;
        const offset = (page - 1) * limit;
        let whereClause = `WHERE p.status = 'AVAILABLE'`;
        const params = [];
        if (filter.city) {
            whereClause += ` AND p.city LIKE ?`;
            params.push(`%${filter.city}%`);
        }
        if (filter.district) {
            whereClause += ` AND p.district LIKE ?`;
            params.push(`%${filter.district}%`);
        }
        if (filter.minPrice !== undefined) {
            whereClause += ` AND p.price >= ?`;
            params.push(filter.minPrice);
        }
        if (filter.maxPrice !== undefined) {
            whereClause += ` AND p.price <= ?`;
            params.push(filter.maxPrice);
        }
        if (filter.minArea !== undefined) {
            whereClause += ` AND p.area >= ?`;
            params.push(filter.minArea);
        }
        if (filter.bedrooms !== undefined) {
            whereClause += ` AND p.bedrooms >= ?`;
            params.push(filter.bedrooms);
        }
        if (filter.propertyType) {
            whereClause += ` AND p.property_type = ?`;
            params.push(filter.propertyType);
        }
        const countQuery = `SELECT COUNT(*) as total FROM properties p ${whereClause}`;
        const [countRows] = await this.db.query(countQuery, params);
        const total = countRows[0]?.total || 0;
        const dataQuery = `
      SELECT p.*, pm.url as thumbnailUrl
      FROM properties p
      LEFT JOIN property_media pm ON p.id = pm.property_id AND pm.is_primary = 1
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;
        const [rows] = await this.db.query(dataQuery, [...params, limit, offset]);
        return {
            data: rows,
            total
        };
    }
    async findById(id) {
        const [propRows] = await this.db.query(`SELECT p.*, u.full_name as assignedSaleName 
       FROM properties p 
       LEFT JOIN users u ON p.assigned_sale_id = u.id 
       WHERE p.id = ? LIMIT 1`, [id]);
        if (!propRows[0])
            return null;
        const [mediaRows] = await this.db.query(`SELECT id, url as mediaUrl, media_type as mediaType, is_primary as isPrimary 
       FROM property_media 
       WHERE property_id = ? 
       ORDER BY is_primary DESC, id ASC`, [id]);
        return {
            ...propRows[0],
            media: mediaRows
        };
    }
    async create(data, mediaUrls = []) {
        const propertyId = (0, node_crypto_1.randomUUID)();
        const query = `
      INSERT INTO properties (id, title, description, property_type, price, area, bedrooms, bathrooms, address, district, city, status, created_by, assigned_sale_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'AVAILABLE', ?, ?, NOW(), NOW())
    `;
        const [result] = await this.db.query(query, [
            propertyId,
            data.title,
            data.description || null,
            data.property_type,
            data.price,
            data.area,
            data.bedrooms || 1,
            data.bathrooms || 1,
            data.address,
            data.district,
            data.city,
            data.created_by || null,
            data.assigned_sale_id || null
        ]);
        for (let i = 0; i < mediaUrls.length; i++) {
            const mediaId = (0, node_crypto_1.randomUUID)();
            await this.db.query(`INSERT INTO property_media (id, property_id, url, media_type, is_primary, display_order, created_at) VALUES (?, ?, ?, 'IMAGE', ?, ?, NOW())`, [mediaId, propertyId, mediaUrls[i], i === 0 ? 1 : 0, i + 1]);
        }
        return propertyId;
    }
}
exports.PropertyRepository = PropertyRepository;
