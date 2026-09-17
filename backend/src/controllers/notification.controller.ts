import { Request, Response, NextFunction } from "express";
import { NotificationService } from "../services/notification.service.js";

const notificationService = new NotificationService();

export class NotificationController {
  async getMyNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notifications = await notificationService.getNotifications(req.user!.userId);
      res.status(200).json({
        success: true,
        data: notifications
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await notificationService.markAsRead(req.params.id, req.user!.userId);
      res.status(200).json({
        success: true,
        message: "Đã đánh dấu thông báo là đã đọc."
      });
    } catch (error) {
      next(error);
    }
  }
}
