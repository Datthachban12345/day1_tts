"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_service_js_1 = require("../services/notification.service.js");
const notificationService = new notification_service_js_1.NotificationService();
class NotificationController {
    async getMyNotifications(req, res, next) {
        try {
            const notifications = await notificationService.getNotifications(req.user.userId);
            res.status(200).json({
                success: true,
                data: notifications
            });
        }
        catch (error) {
            next(error);
        }
    }
    async markAsRead(req, res, next) {
        try {
            await notificationService.markAsRead(req.params.id, req.user.userId);
            res.status(200).json({
                success: true,
                message: "Đã đánh dấu thông báo là đã đọc."
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.NotificationController = NotificationController;
