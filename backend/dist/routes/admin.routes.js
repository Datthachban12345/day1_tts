"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const admin_controller_js_1 = require("../controllers/admin.controller.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const role_middleware_js_1 = require("../middlewares/role.middleware.js");
const validate_middleware_js_1 = require("../middlewares/validate.middleware.js");
exports.adminRoutes = (0, express_1.Router)();
const adminController = new admin_controller_js_1.AdminController();
const createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    fullName: zod_1.z.string().min(2),
    phone: zod_1.z.string().min(8),
    role: zod_1.z.enum(["ADMIN", "SALE", "CUSTOMER"])
});
const updateStatusSchema = zod_1.z.object({
    isActive: zod_1.z.boolean()
});
exports.adminRoutes.use(auth_middleware_js_1.authenticate, (0, role_middleware_js_1.authorize)("ADMIN"));
exports.adminRoutes.get("/users", adminController.getUsers);
exports.adminRoutes.post("/users", (0, validate_middleware_js_1.validateBody)(createUserSchema), adminController.createUser);
exports.adminRoutes.patch("/users/:id/status", (0, validate_middleware_js_1.validateBody)(updateStatusSchema), adminController.updateUserStatus);
