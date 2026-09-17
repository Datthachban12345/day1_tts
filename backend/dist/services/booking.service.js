"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const database_js_1 = require("../config/database.js");
const availability_repository_js_1 = require("../repositories/availability.repository.js");
const booking_repository_js_1 = require("../repositories/booking.repository.js");
const notification_repository_js_1 = require("../repositories/notification.repository.js");
const property_repository_js_1 = require("../repositories/property.repository.js");
class BookingService {
    bookingRepo;
    availabilityRepo;
    propertyRepo;
    notificationRepo;
    constructor(bookingRepo = new booking_repository_js_1.BookingRepository(), availabilityRepo = new availability_repository_js_1.AvailabilityRepository(), propertyRepo = new property_repository_js_1.PropertyRepository(), notificationRepo = new notification_repository_js_1.NotificationRepository()) {
        this.bookingRepo = bookingRepo;
        this.availabilityRepo = availabilityRepo;
        this.propertyRepo = propertyRepo;
        this.notificationRepo = notificationRepo;
    }
    /**
     * Validate if the requested status transition is allowed
     */
    validateStateTransition(currentStatus, newStatus, actorRole) {
        if (currentStatus === "PENDING") {
            if (actorRole === "SALE" && (newStatus === "CONFIRMED" || newStatus === "REJECTED")) {
                return true;
            }
            if (actorRole === "CUSTOMER" && newStatus === "CANCELLED") {
                return true;
            }
            if (actorRole === "ADMIN") {
                return true;
            }
        }
        else if (currentStatus === "CONFIRMED") {
            if (actorRole === "SALE" && newStatus === "COMPLETED") {
                return true;
            }
            if (actorRole === "CUSTOMER" && newStatus === "CANCELLED") {
                return true;
            }
            if (actorRole === "ADMIN") {
                return true;
            }
        }
        return false;
    }
    /**
     * Core Booking Creation with Transaction & Validations
     */
    async createBooking(data) {
        // 1. Validate property exists
        const property = await this.propertyRepo.findById(data.propertyId);
        if (!property) {
            throw new Error("PROPERTY_NOT_FOUND");
        }
        const assignedSaleId = data.saleId || property.assigned_sale_id;
        if (!assignedSaleId) {
            throw new Error("NO_ASSIGNED_SALE");
        }
        // 2. Validate booking time range
        if (data.startTime >= data.endTime) {
            throw new Error("INVALID_TIME_RANGE");
        }
        // 3. Validate day of week & check Sales Availability
        const bookingDateObj = new Date(data.bookingDate);
        if (isNaN(bookingDateObj.getTime())) {
            throw new Error("INVALID_BOOKING_DATE");
        }
        const dayOfWeek = bookingDateObj.getDay() === 0 ? 7 : bookingDateObj.getDay();
        const isSlotAvailable = await this.availabilityRepo.checkSlotAvailable(assignedSaleId, dayOfWeek, data.startTime, data.endTime);
        if (!isSlotAvailable) {
            throw new Error("SLOT_NOT_AVAILABLE");
        }
        // 4. Check for double-booking conflict
        const conflicts = await this.bookingRepo.findConflicts(assignedSaleId, data.bookingDate, data.startTime, data.endTime);
        if (conflicts.length > 0) {
            throw new Error("BOOKING_CONFLICT");
        }
        // 5. Execute creation within ACID Transaction
        const bookingId = await (0, database_js_1.withTransaction)(async (conn) => {
            // Create booking & history
            const id = await this.bookingRepo.createBookingInTransaction({
                customerId: data.customerId,
                saleId: assignedSaleId,
                propertyId: data.propertyId,
                bookingDate: data.bookingDate,
                startTime: data.startTime,
                endTime: data.endTime,
                customerNote: data.customerNote
            }, conn);
            // Create notification for Sales Staff
            await this.notificationRepo.create({
                userId: assignedSaleId,
                title: "Yêu cầu đặt lịch mới",
                message: `Khách hàng đã đặt lịch xem nhà "${property.title}" vào ngày ${data.bookingDate} (${data.startTime} - ${data.endTime}).`
            }, conn);
            return id;
        });
        const newBooking = await this.bookingRepo.findById(bookingId);
        if (!newBooking) {
            throw new Error("BOOKING_RETRIEVAL_FAILED");
        }
        return newBooking;
    }
    async getCustomerBookings(customerId, status) {
        return this.bookingRepo.findByCustomer(customerId, status);
    }
    async getSaleBookings(saleId, status) {
        return this.bookingRepo.findBySale(saleId, status);
    }
    async getAdminBookings(status) {
        return this.bookingRepo.findAll(status);
    }
    /**
     * Get booking details and audit trail status history
     */
    async getBookingDetail(bookingId, userId, role) {
        const booking = await this.bookingRepo.findById(bookingId);
        if (!booking) {
            throw new Error("BOOKING_NOT_FOUND");
        }
        // RBAC check
        if (role === "CUSTOMER" && booking.customer_id !== userId) {
            throw new Error("FORBIDDEN");
        }
        if (role === "SALE" && booking.sale_id !== userId) {
            throw new Error("FORBIDDEN");
        }
        const statusHistory = await this.bookingRepo.getStatusHistory(bookingId);
        return {
            ...booking,
            statusHistory
        };
    }
    /**
     * Update status with State Machine Transition check
     */
    async updateBookingStatus(bookingId, newStatus, actorId, actorRole, reason) {
        const booking = await this.bookingRepo.findById(bookingId);
        if (!booking) {
            throw new Error("BOOKING_NOT_FOUND");
        }
        // Role ownership check
        if (actorRole === "CUSTOMER" && booking.customer_id !== actorId) {
            throw new Error("FORBIDDEN");
        }
        if (actorRole === "SALE" && booking.sale_id !== actorId) {
            throw new Error("FORBIDDEN");
        }
        // State machine check
        const isValidTransition = this.validateStateTransition(booking.status, newStatus, actorRole);
        if (!isValidTransition) {
            throw new Error("INVALID_STATUS_TRANSITION");
        }
        await (0, database_js_1.withTransaction)(async (conn) => {
            await this.bookingRepo.updateStatusInTransaction(bookingId, booking.status, newStatus, actorId, reason, conn);
            // Notify relevant party
            const notifyTargetUserId = actorRole === "CUSTOMER" ? booking.sale_id : booking.customer_id;
            const title = `Cập nhật trạng thái lịch hẹn #${bookingId}`;
            const message = `Lịch hẹn xem nhà đã được chuyển sang trạng thái "${newStatus}" bởi ${actorRole}.${reason ? ` Lý do: ${reason}` : ""}`;
            await this.notificationRepo.create({
                userId: notifyTargetUserId,
                title,
                message
            }, conn);
        });
        return this.bookingRepo.findById(bookingId);
    }
}
exports.BookingService = BookingService;
