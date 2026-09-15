"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const notification_repository_js_1 = require("../repositories/notification.repository.js");
class NotificationService {
    notificationRepo;
    constructor(notificationRepo = new notification_repository_js_1.NotificationRepository()) {
        this.notificationRepo = notificationRepo;
    }
    async getNotifications(userId) {
        return this.notificationRepo.findByUserId(userId);
    }
    async markAsRead(id, userId) {
        return this.notificationRepo.markAsRead(id, userId);
    }
}
exports.NotificationService = NotificationService;
