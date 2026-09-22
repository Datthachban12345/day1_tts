-- Create database
CREATE DATABASE IF NOT EXISTS booking_db;
USE booking_db;

-- Drop existing tables for clean setup
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS bookings_slots;
DROP TABLE IF EXISTS availability;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- Create roles table
CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
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
);

-- Create properties table
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
);

-- Create availability table
CREATE TABLE availability (
    id VARCHAR(36) PRIMARY KEY,
    property_id VARCHAR(36) NOT NULL,
    date DATE NOT NULL,
    slots JSON NOT NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    UNIQUE KEY unique_property_date (property_id, date)
);

-- Create bookings table
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
);

-- Create notifications table
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert roles
INSERT INTO roles (id, name, code) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Customer', 'CUSTOMER'),
    ('22222222-2222-2222-2222-222222222222', 'Sales', 'SALE'),
    ('33333333-3333-3333-3333-333333333333', 'Admin', 'ADMIN');

-- Insert demo users (password: password123)
-- Hash is bcrypt of 'password123'
INSERT INTO users (id, email, password_hash, full_name, phone, role_id) VALUES
    ('aaaa1111-1111-1111-1111-111111111111', 'customer.minh@gmail.com', '$2a$10$rQZ8K.X.7ZqXxXxXxXxXxuX.xXxXxXxXxXxXxXxXxXxXxXxXxXxX', 'Nguyễn Minh', '0912345678', '11111111-1111-1111-1111-111111111111'),
    ('aaaa2222-2222-2222-2222-222222222222', 'sale.nam@homebooking.vn', '$2a$10$rQZ8K.X.7ZqXxXxXxXxXxuX.xXxXxXxXxXxXxXxXxXxXxXxXxXxX', 'Trần Nam', '0987654321', '22222222-2222-2222-2222-222222222222'),
    ('aaaa3333-3333-3333-3333-333333333333', 'admin@homebooking.vn', '$2a$10$rQZ8K.X.7ZqXxXxXxXxXxuX.xXxXxXxXxXxXxXxXxXxXxXxXxXxX', 'Admin User', '0900000000', '33333333-3333-3333-3333-333333333333');

-- Insert demo properties
INSERT INTO properties (id, title, address, district, city, price, property_type, bedrooms, bathrooms, area_sqm, is_vip) VALUES
    ('bbbb1111-1111-1111-1111-111111111111', 'Căn hộ cao cấp Times City', 'Toà T, Times City, 458 Minh Khai', 'Hai Bà Trưng', 'Hà Nội', 3500000000, 'APARTMENT', 2, 2, 85, 1),
    ('bbbb2222-2222-2222-2222-222222222222', 'Nhà phố mặt phố Đội Cấn', '123 Đội Cấn, Ba Đình', 'Ba Đình', 'Hà Nội', 12000000000, 'TOWNHOUSE', 4, 3, 120, 1),
    ('bbbb3333-3333-3333-3333-333333333333', 'Biệt thự Vinhomes Riverside', 'Khu B, Vinhomes Riverside', 'Long Biên', 'Hà Nội', 25000000000, 'VILLA', 5, 4, 350, 1);
