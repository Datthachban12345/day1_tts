import { Request, Response, NextFunction } from "express";
import { AvailabilityService } from "../services/availability.service.js";

const availabilityService = new AvailabilityService();

export class AvailabilityController {
  async getMyAvailability(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slots = await availabilityService.getAvailabilityBySaleId(req.user!.userId);
      res.status(200).json({
        success: true,
        data: slots
      });
    } catch (error) {
      next(error);
    }
  }

  async setMyAvailability(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slots = await availabilityService.setAvailability(req.user!.userId, req.body.slots);
      res.status(200).json({
        success: true,
        message: "Cập nhật ca rảnh thành công.",
        data: slots
      });
    } catch (error) {
      next(error);
    }
  }

  async getSaleAvailabilityPublic(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slots = await availabilityService.getAvailabilityBySaleId(req.params.saleId);
      res.status(200).json({
        success: true,
        data: slots
      });
    } catch (error) {
      next(error);
    }
  }
}
