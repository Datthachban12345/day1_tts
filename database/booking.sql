-- =============================================================================
-- SYSTEM: HOME VIEWING BOOKING SYSTEM (MVP) - MYSQL VERSION
-- DATABASE ENGINE: MySQL 8.0+ / MariaDB
-- =============================================================================

CREATE DATABASE IF NOT EXISTS home_booking DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE home_booking;

-- Disable Foreign Key Checks for smooth dropping/creation
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS booking_status_history;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS sale_availability;
DROP TABLE IF EXISTS property_media;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS sale_profiles;
DROP TABLE IF EXISTS customer_profiles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
-- 1. CREATE TABLES
-- =============================================================================

-- Table: roles
CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lưu danh sách quyền hệ thống: ADMIN, SALE, CUSTOMER';

-- Table: users
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    role_id VARCHAR(36) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    avatar_url VARCHAR(512),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lưu thông tin tài khoản người dùng';

-- Table: customer_profiles
CREATE TABLE customer_profiles (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    address VARCHAR(255),
    preferred_district VARCHAR(100),
    budget_min DECIMAL(15, 2) DEFAULT 0 CHECK (budget_min >= 0),
    budget_max DECIMAL(15, 2) DEFAULT 0 CHECK (budget_max >= 0),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_customer_profiles_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_customer_budget_range CHECK (budget_max >= budget_min)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông tin chi tiết mở rộng của Customer';

-- Table: sale_profiles
CREATE TABLE sale_profiles (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    employee_code VARCHAR(50) UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    assigned_area VARCHAR(255),
    rating_avg DECIMAL(3, 2) DEFAULT 5.00 CHECK (rating_avg >= 0 AND rating_avg <= 5.00),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_sale_profiles_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông tin chi tiết mở rộng của Sale';

-- Table: properties
CREATE TABLE properties (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    property_type VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Hà Nội',
    price DECIMAL(15, 2) NOT NULL CHECK (price >= 0),
    area DECIMAL(8, 2) NOT NULL CHECK (area > 0),
    bedrooms INT NOT NULL DEFAULT 0 CHECK (bedrooms >= 0),
    bathrooms INT NOT NULL DEFAULT 0 CHECK (bathrooms >= 0),
    status ENUM('AVAILABLE', 'RENTED', 'SOLD', 'UNAVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
    created_by VARCHAR(36),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_properties_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông tin căn nhà/bất động sản';

-- Table: property_media
CREATE TABLE property_media (
    id VARCHAR(36) PRIMARY KEY,
    property_id VARCHAR(36) NOT NULL,
    media_type VARCHAR(20) NOT NULL DEFAULT 'IMAGE',
    url VARCHAR(512) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_property_media_properties FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Hình ảnh hoặc media của bất động sản';

-- Table: sale_availability
CREATE TABLE sale_availability (
    id VARCHAR(36) PRIMARY KEY,
    sale_id VARCHAR(36) NOT NULL,
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sale_availability_users FOREIGN KEY (sale_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_sale_availability_time CHECK (end_time > start_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Khung giờ Sale có thể tiếp nhận lịch xem nhà';

-- Table: bookings
CREATE TABLE bookings (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    property_id VARCHAR(36) NOT NULL,
    sale_id VARCHAR(36) NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    customer_note TEXT,
    sale_note TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_bookings_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_bookings_property FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE RESTRICT,
    CONSTRAINT fk_bookings_sale FOREIGN KEY (sale_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_booking_time CHECK (end_time > start_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng trung tâm lưu lịch hẹn xem nhà';

-- Table: booking_status_history
CREATE TABLE booking_status_history (
    id VARCHAR(36) PRIMARY KEY,
    booking_id VARCHAR(36) NOT NULL,
    previous_status ENUM('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED'),
    new_status ENUM('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED') NOT NULL,
    changed_by VARCHAR(36),
    reason TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bsh_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    CONSTRAINT fk_bsh_changed_by FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lịch sử chuyển đổi trạng thái booking';

-- Table: notifications
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('BOOKING_CREATED', 'BOOKING_CONFIRMED', 'BOOKING_REJECTED', 'BOOKING_CANCELLED', 'BOOKING_COMPLETED', 'SYSTEM') NOT NULL DEFAULT 'SYSTEM',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    reference_id VARCHAR(36),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notifications_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông báo dành cho người dùng';

-- =============================================================================
-- 2. INDEXES
-- =============================================================================

CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_email ON users(email);

CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_city_district ON properties(city, district);
CREATE INDEX idx_properties_price ON properties(price);

CREATE INDEX idx_property_media_property_id ON property_media(property_id);

CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_sale_id ON bookings(sale_id);
CREATE INDEX idx_bookings_property_id ON bookings(property_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_date_status ON bookings(booking_date, status);

CREATE INDEX idx_booking_status_history_booking_id ON booking_status_history(booking_id);
CREATE INDEX idx_sale_availability_sale_id ON sale_availability(sale_id);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

-- =============================================================================
-- 3. SEED DATA
-- =============================================================================

-- Insert Roles
INSERT INTO roles (id, code, name, description) VALUES
('10000000-0000-0000-0000-000000000001', 'ADMIN', 'Administrator', 'Quản trị viên hệ thống'),
('10000000-0000-0000-0000-000000000002', 'SALE', 'Sale Staff', 'Nhân viên tư vấn xem nhà'),
('10000000-0000-0000-0000-000000000003', 'CUSTOMER', 'Customer', 'Khách hàng tìm nhà xem');

-- Insert Users
INSERT INTO users (id, role_id, email, password_hash, full_name, is_active) VALUES
('a0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'admin@homebooking.vn', '$2a$12$eImiTXuWVxfM37uY4JANjO5M3q9J.W8W', 'Lê Tiến Đạt (Admin)', TRUE),
('s0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'sale.nam@homebooking.vn', '$2a$12$eImiTXuWVxfM37uY4JANjO5M3q9J.W8W', 'Nguyễn Văn Nam', TRUE),
('s0000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'sale.huong@homebooking.vn', '$2a$12$eImiTXuWVxfM37uY4JANjO5M3q9J.W8W', 'Trần Thị Hương', TRUE),
('c0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000003', 'customer.minh@gmail.com', '$2a$12$eImiTXuWVxfM37uY4JANjO5M3q9J.W8W', 'Phạm Quang Minh', TRUE),
('c0000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', 'customer.lan@gmail.com', '$2a$12$eImiTXuWVxfM37uY4JANjO5M3q9J.W8W', 'Hoàng Ngọc Lan', TRUE);

-- Insert Profiles
INSERT INTO sale_profiles (id, user_id, employee_code, phone_number, assigned_area, rating_avg) VALUES
(UUID(), 's0000000-0000-0000-0000-000000000001', 'SALE001', '0912345678', 'Cầu Giấy, Nam Từ Liêm', 4.90),
(UUID(), 's0000000-0000-0000-0000-000000000002', 'SALE002', '0987654321', 'Thanh Xuân, Đống Đa', 4.80);

INSERT INTO customer_profiles (id, user_id, phone_number, address, preferred_district, budget_min, budget_max) VALUES
(UUID(), 'c0000000-0000-0000-0000-000000000001', '0901112223', 'Số 12 Chùa Bộc, Đống Đa, Hà Nội', 'Cầu Giấy', 3000000000, 5000000000),
(UUID(), 'c0000000-0000-0000-0000-000000000002', '0904445556', 'Số 45 Nguyễn Trãi, Thanh Xuân, Hà Nội', 'Thanh Xuân', 2000000000, 3500000000);

-- Insert Properties
INSERT INTO properties (id, title, description, property_type, address, district, city, price, area, bedrooms, bathrooms, status, created_by) VALUES
('p0000000-0000-0000-0000-000000000001', 'Căn hộ 2PN Vinhomes D\'Capitale Trần Duy Hưng', 'Căn hộ tầng trung, ban công Đông Nam thoáng mát, đầy đủ nội thất cao cấp.', 'Apartment', '119 Trần Duy Hưng', 'Cầu Giấy', 'Hà Nội', 4200000000, 72.50, 2, 2, 'AVAILABLE', 'a0000000-0000-0000-0000-000000000001'),
('p0000000-0000-0000-0000-000000000002', 'Nhà riêng 4 tầng ngõ ô tô tránh Hoàng Ngân', 'Nhà mới xây 4 tầng, mặt tiền 4.5m, dân trí cao, gần trường học và chợ.', 'House', 'Ngõ 124 Hoàng Ngân', 'Cầu Giấy', 'Hà Nội', 6800000000, 55.00, 4, 3, 'AVAILABLE', 'a0000000-0000-0000-0000-000000000001'),
('p0000000-0000-0000-0000-000000000003', 'Chung cư Royal City 3PN full nội thất', 'Căn hộ góc 3 phòng ngủ thoáng, đầy đủ tiện ích bể bơi, gym, trung tâm thương mại.', 'Apartment', '72A Nguyễn Trãi', 'Thanh Xuân', 'Hà Nội', 5500000000, 110.00, 3, 2, 'AVAILABLE', 'a0000000-0000-0000-0000-000000000001');

-- Insert Property Media
INSERT INTO property_media (id, property_id, media_type, url, is_primary, display_order) VALUES
(UUID(), 'p0000000-0000-0000-0000-000000000001', 'IMAGE', 'https://cdn.homebooking.vn/properties/p1/living_room.jpg', TRUE, 1),
(UUID(), 'p0000000-0000-0000-0000-000000000001', 'IMAGE', 'https://cdn.homebooking.vn/properties/p1/bedroom.jpg', FALSE, 2),
(UUID(), 'p0000000-0000-0000-0000-000000000002', 'IMAGE', 'https://cdn.homebooking.vn/properties/p2/front_house.jpg', TRUE, 1),
(UUID(), 'p0000000-0000-0000-0000-000000000003', 'IMAGE', 'https://cdn.homebooking.vn/properties/p3/view.jpg', TRUE, 1);

-- Insert Sale Availability
INSERT INTO sale_availability (id, sale_id, day_of_week, start_time, end_time) VALUES
(UUID(), 's0000000-0000-0000-0000-000000000001', 1, '08:00:00', '12:00:00'),
(UUID(), 's0000000-0000-0000-0000-000000000001', 1, '13:30:00', '17:30:00'),
(UUID(), 's0000000-0000-0000-0000-000000000001', 6, '08:30:00', '17:00:00'),
(UUID(), 's0000000-0000-0000-0000-000000000002', 2, '09:00:00', '18:00:00');

-- Insert Bookings
INSERT INTO bookings (id, customer_id, property_id, sale_id, booking_date, start_time, end_time, status, customer_note, sale_note) VALUES
('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000001', '2026-09-15', '09:00:00', '10:00:00', 'PENDING', 'Tôi muốn xem nhà vào buổi sáng.', NULL),
('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000003', 's0000000-0000-0000-0000-000000000002', '2026-09-16', '14:00:00', '15:00:00', 'CONFIRMED', 'Hẹn gặp tại sảnh R2 Royal City.', 'Đã xác nhận với chủ nhà mở cửa.'),
('b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000002', 's0000000-0000-0000-0000-000000000001', '2026-09-10', '10:00:00', '11:00:00', 'COMPLETED', 'Xem kỹ thiết kế căn nhà.', 'Khách đã xem xong, rất ưng ý.');

-- Insert Booking History
INSERT INTO booking_status_history (id, booking_id, previous_status, new_status, changed_by, reason) VALUES
(UUID(), 'b0000000-0000-0000-0000-000000000001', NULL, 'PENDING', 'c0000000-0000-0000-0000-000000000001', 'Khách hàng khởi tạo lịch đặt'),
(UUID(), 'b0000000-0000-0000-0000-000000000002', 'PENDING', 'CONFIRMED', 's0000000-0000-0000-0000-000000000002', 'Sale đã gọi điện xác nhận lịch xem');

-- Insert Notifications
INSERT INTO notifications (id, user_id, title, message, type, reference_id) VALUES
(UUID(), 's0000000-0000-0000-0000-000000000001', 'Lịch đặt xem nhà mới', 'Khách hàng Phạm Quang Minh vừa đặt lịch xem căn Vinhomes D\'Capitale.', 'BOOKING_CREATED', 'b0000000-0000-0000-0000-000000000001'),
(UUID(), 'c0000000-0000-0000-0000-000000000002', 'Lịch xem nhà đã được xác nhận', 'Lịch xem nhà Royal City ngày 2026-09-16 đã được Sale xác nhận.', 'BOOKING_CONFIRMED', 'b0000000-0000-0000-0000-000000000002');

-- =============================================================================
-- 4. VALIDATION QUERIES
-- =============================================================================

-- Truy vấn danh sách Bookings chi tiết
SELECT 
    b.id AS booking_id,
    c.full_name AS customer_name,
    cp.phone_number AS customer_phone,
    p.title AS property_title,
    s.full_name AS sale_name,
    b.booking_date,
    b.start_time,
    b.end_time,
    b.status
FROM bookings b
JOIN users c ON b.customer_id = c.id
LEFT JOIN customer_profiles cp ON c.id = cp.user_id
JOIN properties p ON b.property_id = p.id
JOIN users s ON b.sale_id = s.id
ORDER BY b.booking_date DESC;