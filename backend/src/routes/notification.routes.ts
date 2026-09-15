import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const notificationRoutes = Router();
const notificationController = new NotificationController();

notificationRoutes.get("/", authenticate, notificationController.getMyNotifications);
notificationRoutes.patch("/:id/read", authenticate, notificationController.markAsRead);
