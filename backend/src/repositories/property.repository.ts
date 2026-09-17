import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { randomUUID } from "node:crypto";
import { pool } from "../config/database.js";
import { Property, PropertyFilterDTO, PropertyMedia } from "../types/index.js";

export class PropertyRepository {
  constructor(private db: Pool = pool) {}

  async findAll(filter: PropertyFilterDTO): Promise<{ data: any[]; total: number }> {
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const offset = (page - 1) * limit;

    let whereClause = `WHERE p.status = 'AVAILABLE'`;
    const params: any[] = [];

    if (filter.search) {
      whereClause += ` AND (p.title LIKE ? OR p.address LIKE ? OR p.district LIKE ?)`;
      const search = `%${filter.search}%`;
      params.push(search, search, search);
    }

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
    const [countRows] = await this.db.query<RowDataPacket[]>(countQuery, params);
    const total = countRows[0]?.total || 0;

    const dataQuery = `
      SELECT p.*, pm.url as thumbnailUrl
      FROM properties p
      LEFT JOIN property_media pm ON p.id = pm.property_id AND pm.is_primary = 1
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;
    const [rows] = await this.db.query<RowDataPacket[]>(dataQuery, [...params, limit, offset]);

    return {
      data: rows,
      total
    };
  }

  async findById(id: string): Promise<any | null> {
    const [propRows] = await this.db.query<RowDataPacket[]>(
      `SELECT p.*, u.full_name as assignedSaleName 
       FROM properties p 
       LEFT JOIN users u ON p.assigned_sale_id = u.id 
       WHERE p.id = ? LIMIT 1`,
      [id]
    );
    if (!propRows[0]) return null;

    const [mediaRows] = await this.db.query<RowDataPacket[]>(
      `SELECT id, url as mediaUrl, media_type as mediaType, is_primary as isPrimary 
       FROM property_media 
       WHERE property_id = ? 
       ORDER BY is_primary DESC, id ASC`,
      [id]
    );

    return {
      ...propRows[0],
      media: mediaRows
    };
  }

  async create(data: Partial<Property>, mediaUrls: string[] = []): Promise<string> {
    const propertyId = randomUUID();
    const query = `
      INSERT INTO properties (id, title, description, property_type, price, area, bedrooms, bathrooms, address, district, city, status, created_by, assigned_sale_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'AVAILABLE', ?, ?, NOW(), NOW())
    `;
    const [result] = await this.db.query<ResultSetHeader>(query, [
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
      const mediaId = randomUUID();
      await this.db.query(
        `INSERT INTO property_media (id, property_id, url, media_type, is_primary, display_order, created_at) VALUES (?, ?, ?, 'IMAGE', ?, ?, NOW())`,
        [mediaId, propertyId, mediaUrls[i], i === 0 ? 1 : 0, i + 1]
      );
    }
    return propertyId;
  }
}
