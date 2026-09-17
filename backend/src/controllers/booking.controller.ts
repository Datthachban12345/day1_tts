import { Request, Response, NextFunction } from "express";
import { BookingService } from "../services/booking.service.js";

const bookingService = new BookingService();

export class BookingController {
  async createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const booking = await bookingService.createBooking({
        ...req.body,
        customerId: req.user!.userId
      });
      res.status(201).json({
        success: true,
        message: "Đặt lịch xem nhà thành công.",
        data: booking
      });
    } catch (error) {
      next(error);
    }
  }

  async getCustomerBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.query;
      const bookings = await bookingService.getCustomerBookings(req.user!.userId, status as string);
      res.status(200).json({
        success: true,
        data: bookings
      });
    } catch (error) {
      next(error);
    }
  }

  async getSaleBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.query;
      const bookings = await bookingService.getSaleBookings(req.user!.userId, status as string);
      res.status(200).json({
        success: true,
        data: bookings
      });
    } catch (error) {
      next(error);
    }
  }

  async getAdminBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.query;
      const bookings = await bookingService.getAdminBookings(status as string);
      res.status(200).json({
        success: true,
        data: bookings
      });
    } catch (error) {
      next(error);
    }
  }

  async getBookingDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const detail = await bookingService.getBookingDetail(
        req.params.id,
        req.user!.userId,
        req.user!.role
      );
      res.status(200).json({
        success: true,
        data: detail
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBookingStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await bookingService.updateBookingStatus(
        req.params.id,
        req.body.status,
        req.user!.userId,
        req.user!.role,
        req.body.reason
      );
      res.status(200).json({
        success: true,
        message: `Đã cập nhật trạng thái lịch hẹn sang ${req.body.status}.`,
        data: updated
      });
    } catch (error) {
      next(error);
    }
  }
}
