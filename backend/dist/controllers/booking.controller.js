"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_service_js_1 = require("../services/booking.service.js");
const bookingService = new booking_service_js_1.BookingService();
class BookingController {
    async createBooking(req, res, next) {
        try {
            const booking = await bookingService.createBooking({
                ...req.body,
                customerId: req.user.userId
            });
            res.status(201).json({
                success: true,
                message: "Đặt lịch xem nhà thành công.",
                data: booking
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getCustomerBookings(req, res, next) {
        try {
            const { status } = req.query;
            const bookings = await bookingService.getCustomerBookings(req.user.userId, status);
            res.status(200).json({
                success: true,
                data: bookings
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getSaleBookings(req, res, next) {
        try {
            const { status } = req.query;
            const bookings = await bookingService.getSaleBookings(req.user.userId, status);
            res.status(200).json({
                success: true,
                data: bookings
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAdminBookings(req, res, next) {
        try {
            const { status } = req.query;
            const bookings = await bookingService.getAdminBookings(status);
            res.status(200).json({
                success: true,
                data: bookings
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getBookingDetail(req, res, next) {
        try {
            const detail = await bookingService.getBookingDetail(req.params.id, req.user.userId, req.user.role);
            res.status(200).json({
                success: true,
                data: detail
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateBookingStatus(req, res, next) {
        try {
            const updated = await bookingService.updateBookingStatus(req.params.id, req.body.status, req.user.userId, req.user.role, req.body.reason);
            res.status(200).json({
                success: true,
                message: `Đã cập nhật trạng thái lịch hẹn sang ${req.body.status}.`,
                data: updated
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BookingController = BookingController;
