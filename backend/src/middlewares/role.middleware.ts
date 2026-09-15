import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types/index.js";

export function authorize(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
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
