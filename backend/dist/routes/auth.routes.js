"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const validate_middleware_js_1 = require("../middlewares/validate.middleware.js");
exports.authRoutes = (0, express_1.Router)();
const authController = new auth_controller_js_1.AuthController();
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email không hợp lệ"),
    password: zod_1.z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    fullName: zod_1.z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
    phone: zod_1.z.string().min(8, "Số điện thoại không hợp lệ")
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email không hợp lệ"),
    password: zod_1.z.string().min(1, "Mật khẩu không được để trống")
});
exports.authRoutes.post("/register", (0, validate_middleware_js_1.validateBody)(registerSchema), authController.register);
exports.authRoutes.post("/login", (0, validate_middleware_js_1.validateBody)(loginSchema), authController.login);
exports.authRoutes.get("/me", auth_middleware_js_1.authenticate, authController.getMe);
