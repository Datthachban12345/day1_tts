import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
};

async function initDatabase() {
  console.log("🔄 Connecting to MySQL...");

  // Connect without database first
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create database
    console.log("📦 Creating database...");
    await connection.query(`CREATE DATABASE IF NOT EXISTS booking_db`);
    await connection.query(`USE booking_db`);

    // Drop and recreate tables
    console.log("🗑️  Dropping existing tables...");
    await connection.query(`DROP TABLE IF EXISTS notifications`);
    await connection.query(`DROP TABLE IF EXISTS bookings`);
    await connection.query(`DROP TABLE IF EXISTS availability`);
    await connection.query(`DROP TABLE IF EXISTS properties`);
    await connection.query(`DROP TABLE IF EXISTS users`);
    await connection.query(`DROP TABLE IF EXISTS roles`);

    // Create tables
    console.log("📋 Creating tables...");
    await connection.query(`
      CREATE TABLE roles (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        code VARCHAR(20) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        role_id VARCHAR(36) NOT NULL,
        is_active BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles(id)
      )
    `);

    await connection.query(`
      CREATE TABLE properties (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        address VARCHAR(500) NOT NULL,
        district VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL DEFAULT 'Hà Nội',
        price DECIMAL(15,0) NOT NULL,
        property_type ENUM('APARTMENT', 'HOUSE', 'LAND', 'VILLA', 'TOWNHOUSE') NOT NULL,
        bedrooms INT DEFAULT 0,
        bathrooms INT DEFAULT 0,
        area_sqm DECIMAL(10,2) DEFAULT 0,
        description TEXT,
        image_url VARCHAR(500),
        is_vip BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE availability (
        id VARCHAR(36) PRIMARY KEY,
        property_id VARCHAR(36) NOT NULL,
        date DATE NOT NULL,
        slots JSON NOT NULL,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        UNIQUE KEY unique_property_date (property_id, date)
      )
    `);

    await connection.query(`
      CREATE TABLE bookings (
        id VARCHAR(36) PRIMARY KEY,
        property_id VARCHAR(36) NOT NULL,
        customer_id VARCHAR(36) NOT NULL,
        scheduled_date DATE NOT NULL,
        scheduled_time TIME NOT NULL,
        status ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id),
        FOREIGN KEY (customer_id) REFERENCES users(id)
      )
    `);

    await connection.query(`
      CREATE TABLE notifications (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Insert roles
    console.log("👥 Inserting roles...");
    await connection.query(`
      INSERT INTO roles (id, name, code) VALUES
        ('11111111-1111-1111-1111-111111111111', 'Customer', 'CUSTOMER'),
        ('22222222-2222-2222-2222-222222222222', 'Sales', 'SALE'),
        ('33333333-3333-3333-3333-333333333333', 'Admin', 'ADMIN')
    `);

    // Generate password hash
    console.log("🔐 Generating password hash...");
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("password123", salt);

    // Insert demo users
    console.log("👤 Inserting demo users...");
    await connection.query(
      `INSERT INTO users (id, email, password_hash, full_name, phone, role_id) VALUES (?, ?, ?, ?, ?, ?)`,
      ["aaaa1111-1111-1111-1111-111111111111", "customer.minh@gmail.com", passwordHash, "Nguyễn Minh", "0912345678", "11111111-1111-1111-1111-111111111111"]
    );
    await connection.query(
      `INSERT INTO users (id, email, password_hash, full_name, phone, role_id) VALUES (?, ?, ?, ?, ?, ?)`,
      ["aaaa2222-2222-2222-2222-222222222222", "sale.nam@homebooking.vn", passwordHash, "Trần Nam", "0987654321", "22222222-2222-2222-2222-222222222222"]
    );
    await connection.query(
      `INSERT INTO users (id, email, password_hash, full_name, phone, role_id) VALUES (?, ?, ?, ?, ?, ?)`,
      ["aaaa3333-3333-3333-3333-333333333333", "admin@homebooking.vn", passwordHash, "Admin User", "0900000000", "33333333-3333-3333-3333-333333333333"]
    );

    // Insert demo properties
    console.log("🏠 Inserting demo properties...");
    await connection.query(
      `INSERT INTO properties (id, title, address, district, city, price, property_type, bedrooms, bathrooms, area_sqm, is_vip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ["bbbb1111-1111-1111-1111-111111111111", "Căn hộ cao cấp Times City", "Toà T, Times City, 458 Minh Khai", "Hai Bà Trưng", "Hà Nội", 3500000000, "APARTMENT", 2, 2, 85, 1]
    );
    await connection.query(
      `INSERT INTO properties (id, title, address, district, city, price, property_type, bedrooms, bathrooms, area_sqm, is_vip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ["bbbb2222-2222-2222-2222-222222222222", "Nhà phố mặt phố Đội Cấn", "123 Đội Cấn, Ba Đình", "Ba Đình", "Hà Nội", 12000000000, "TOWNHOUSE", 4, 3, 120, 1]
    );
    await connection.query(
      `INSERT INTO properties (id, title, address, district, city, price, property_type, bedrooms, bathrooms, area_sqm, is_vip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ["bbbb3333-3333-3333-3333-333333333333", "Biệt thự Vinhomes Riverside", "Khu B, Vinhomes Riverside", "Long Biên", "Hà Nội", 25000000000, "VILLA", 5, 4, 350, 1]
    );

    // Insert demo availability
    console.log("📅 Inserting demo availability...");
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      await connection.query(
        `INSERT INTO availability (id, property_id, date, slots) VALUES (?, ?, ?, ?)`,
        [randomUUID(), "bbbb1111-1111-1111-1111-111111111111", dateStr, JSON.stringify([
          { time: "09:00", isBooked: false },
          { time: "10:00", isBooked: i === 0 },
          { time: "11:00", isBooked: false },
          { time: "14:00", isBooked: false },
          { time: "15:00", isBooked: false },
          { time: "16:00", isBooked: i === 1 }
        ])]
      );
    }

    console.log("✅ Database initialized successfully!");
    console.log("\n📝 Demo accounts:");
    console.log("   Customer: customer.minh@gmail.com / password123");
    console.log("   Sales:    sale.nam@homebooking.vn / password123");
    console.log("   Admin:    admin@homebooking.vn / password123");

  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

initDatabase();
