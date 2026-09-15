"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const admin_routes_js_1 = require("./admin.routes.js");
const auth_routes_js_1 = require("./auth.routes.js");
const availability_routes_js_1 = require("./availability.routes.js");
const booking_routes_js_1 = require("./booking.routes.js");
const notification_routes_js_1 = require("./notification.routes.js");
const property_routes_js_1 = require("./property.routes.js");
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.use("/auth", auth_routes_js_1.authRoutes);
exports.apiRouter.use("/properties", property_routes_js_1.propertyRoutes);
exports.apiRouter.use("/sales/availability", availability_routes_js_1.availabilityRoutes);
exports.apiRouter.use("/bookings", booking_routes_js_1.bookingRoutes);
exports.apiRouter.use("/notifications", notification_routes_js_1.notificationRoutes);
exports.apiRouter.use("/admin", admin_routes_js_1.adminRoutes);
exports.apiRouter.get("/health", (req, res) => {
    res.json({
        status: "UP",
        timestamp: new Date().toISOString(),
        service: "Home Viewing Booking API"
    });
});
