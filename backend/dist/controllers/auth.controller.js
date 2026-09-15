"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_js_1 = require("../services/auth.service.js");
const authService = new auth_service_js_1.AuthService();
class AuthController {
    async register(req, res, next) {
        try {
            const result = await authService.register(req.body);
            res.status(201).json({
                success: true,
                message: "Đăng ký tài khoản thành công.",
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const result = await authService.login(req.body);
            res.status(200).json({
                success: true,
                message: "Đăng nhập thành công.",
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getMe(req, res, next) {
        try {
            const profile = await authService.getUserProfile(req.user.userId);
            res.status(200).json({
                success: true,
                data: profile
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
