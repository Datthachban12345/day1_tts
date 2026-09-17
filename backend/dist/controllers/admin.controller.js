"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_repository_js_1 = require("../repositories/user.repository.js");
const auth_service_js_1 = require("../services/auth.service.js");
const userRepo = new user_repository_js_1.UserRepository();
const authService = new auth_service_js_1.AuthService(userRepo);
class AdminController {
    async getUsers(req, res, next) {
        try {
            const { role } = req.query;
            const users = await userRepo.findAll(role);
            res.status(200).json({
                success: true,
                data: users
            });
        }
        catch (error) {
            next(error);
        }
    }
    async createUser(req, res, next) {
        try {
            const result = await authService.register(req.body);
            res.status(201).json({
                success: true,
                message: "Tạo người dùng thành công.",
                data: result.user
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateUserStatus(req, res, next) {
        try {
            const { isActive } = req.body;
            const updated = await userRepo.updateActiveStatus(req.params.id, Boolean(isActive));
            res.status(200).json({
                success: true,
                message: updated ? "Cập nhật trạng thái người dùng thành công." : "Không có thay đổi."
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
