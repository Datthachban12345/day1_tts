"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const auth_service_js_1 = require("../services/auth.service.js");
const authService = new auth_service_js_1.AuthService();
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            error: "UNAUTHORIZED",
            message: "Yêu cầu cung cấp JWT Bearer Token hợp lệ."
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = authService.verifyToken(token);
        req.user = payload;
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            error: "TOKEN_EXPIRED_OR_INVALID",
            message: "Token không hợp lệ hoặc đã hết hạn."
        });
    }
}
