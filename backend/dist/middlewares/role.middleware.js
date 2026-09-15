"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: "UNAUTHORIZED",
                message: "Chưa xác thực danh tính."
            });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                error: "FORBIDDEN",
                message: `Bạn không có quyền thực hiện hành động này. Yêu cầu vai trò: [${roles.join(", ")}].`
            });
            return;
        }
        next();
    };
}
