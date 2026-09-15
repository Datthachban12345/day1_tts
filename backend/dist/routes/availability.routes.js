"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availabilityRoutes = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const availability_controller_js_1 = require("../controllers/availability.controller.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const role_middleware_js_1 = require("../middlewares/role.middleware.js");
const validate_middleware_js_1 = require("../middlewares/validate.middleware.js");
exports.availabilityRoutes = (0, express_1.Router)();
const availabilityController = new availability_controller_js_1.AvailabilityController();
const setAvailabilitySchema = zod_1.z.object({
    slots: zod_1.z.array(zod_1.z.object({
        dayOfWeek: zod_1.z.number().int().min(0).max(6),
        startTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Định dạng HH:mm:ss"),
        endTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Định dạng HH:mm:ss")
    }))
});
exports.availabilityRoutes.get("/my", auth_middleware_js_1.authenticate, (0, role_middleware_js_1.authorize)("SALE"), availabilityController.getMyAvailability);
exports.availabilityRoutes.post("/my", auth_middleware_js_1.authenticate, (0, role_middleware_js_1.authorize)("SALE"), (0, validate_middleware_js_1.validateBody)(setAvailabilitySchema), availabilityController.setMyAvailability);
exports.availabilityRoutes.get("/:saleId", availabilityController.getSaleAvailabilityPublic);
