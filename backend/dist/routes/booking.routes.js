"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const booking_controller_js_1 = require("../controllers/booking.controller.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const role_middleware_js_1 = require("../middlewares/role.middleware.js");
const validate_middleware_js_1 = require("../middlewares/validate.middleware.js");
exports.bookingRoutes = (0, express_1.Router)();
const bookingController = new booking_controller_js_1.BookingController();
const createBookingSchema = zod_1.z.object({
    propertyId: zod_1.z.number().int().positive(),
    saleId: zod_1.z.number().int().positive().optional(),
    bookingDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Định dạng YYYY-MM-DD"),
    startTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Định dạng HH:mm:ss"),
    endTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Định dạng HH:mm:ss"),
    customerNote: zod_1.z.string().max(500).optional()
});
const updateStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["CONFIRMED", "REJECTED", "CANCELLED", "COMPLETED"]),
    reason: zod_1.z.string().max(255).optional()
});
exports.bookingRoutes.get("/customer", auth_middleware_js_1.authenticate, (0, role_middleware_js_1.authorize)("CUSTOMER"), bookingController.getCustomerBookings);
exports.bookingRoutes.get("/sale", auth_middleware_js_1.authenticate, (0, role_middleware_js_1.authorize)("SALE"), bookingController.getSaleBookings);
exports.bookingRoutes.get("/admin", auth_middleware_js_1.authenticate, (0, role_middleware_js_1.authorize)("ADMIN"), bookingController.getAdminBookings);
exports.bookingRoutes.get("/:id", auth_middleware_js_1.authenticate, bookingController.getBookingDetail);
exports.bookingRoutes.post("/", auth_middleware_js_1.authenticate, (0, role_middleware_js_1.authorize)("CUSTOMER"), (0, validate_middleware_js_1.validateBody)(createBookingSchema), bookingController.createBooking);
exports.bookingRoutes.patch("/:id/status", auth_middleware_js_1.authenticate, (0, validate_middleware_js_1.validateBody)(updateStatusSchema), bookingController.updateBookingStatus);
