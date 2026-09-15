import { Router } from "express";
import { z } from "zod";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";

export const authRoutes = Router();
const authController = new AuthController();

const registerSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  fullName: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
  phone: z.string().min(8, "Số điện thoại không hợp lệ")
});

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống")
});

authRoutes.post("/register", validateBody(registerSchema), authController.register);
authRoutes.post("/login", validateBody(loginSchema), authController.login);
authRoutes.get("/me", authenticate, authController.getMe);
