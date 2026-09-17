"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityController = void 0;
const availability_service_js_1 = require("../services/availability.service.js");
const availabilityService = new availability_service_js_1.AvailabilityService();
class AvailabilityController {
    async getMyAvailability(req, res, next) {
        try {
            const slots = await availabilityService.getAvailabilityBySaleId(req.user.userId);
            res.status(200).json({
                success: true,
                data: slots
            });
        }
        catch (error) {
            next(error);
        }
    }
    async setMyAvailability(req, res, next) {
        try {
            const slots = await availabilityService.setAvailability(req.user.userId, req.body.slots);
            res.status(200).json({
                success: true,
                message: "Cập nhật ca rảnh thành công.",
                data: slots
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getSaleAvailabilityPublic(req, res, next) {
        try {
            const slots = await availabilityService.getAvailabilityBySaleId(req.params.saleId);
            res.status(200).json({
                success: true,
                data: slots
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AvailabilityController = AvailabilityController;
