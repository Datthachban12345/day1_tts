import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "../services/auth.service.js";

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);

export class AdminController {
  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { role } = req.query;
      const users = await userRepo.findAll(role as any);
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({
        success: true,
        message: "Tạo người dùng thành công.",
        data: result.user
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { isActive } = req.body;
      const updated = await userRepo.updateActiveStatus(Number(req.params.id), Boolean(isActive));
      res.status(200).json({
        success: true,
        message: updated ? "Cập nhật trạng thái người dùng thành công." : "Không có thay đổi."
      });
    } catch (error) {
      next(error);
    }
  }
}
