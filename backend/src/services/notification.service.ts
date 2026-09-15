import { NotificationRepository } from "../repositories/notification.repository.js";

export class NotificationService {
  constructor(private notificationRepo: NotificationRepository = new NotificationRepository()) {}

  async getNotifications(userId: number) {
    return this.notificationRepo.findByUserId(userId);
  }

  async markAsRead(id: number, userId: number) {
    return this.notificationRepo.markAsRead(id, userId);
  }
}
