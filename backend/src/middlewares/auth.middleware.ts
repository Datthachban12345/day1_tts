import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { AuthTokenPayload } from "../types/index.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

const authService = new AuthService();

export function authenticate(req: Request, res: Response, next: NextFunction): void {
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
  } catch (err) {
    res.status(401).json({
      success: false,
      error: "TOKEN_EXPIRED_OR_INVALID",
      message: "Token không hợp lệ hoặc đã hết hạn."
    });
  }
}
