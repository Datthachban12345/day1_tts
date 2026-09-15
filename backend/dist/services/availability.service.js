"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const availability_repository_js_1 = require("../repositories/availability.repository.js");
class AvailabilityService {
    availabilityRepo;
    constructor(availabilityRepo = new availability_repository_js_1.AvailabilityRepository()) {
        this.availabilityRepo = availabilityRepo;
    }
    async getAvailabilityBySaleId(saleId) {
        return this.availabilityRepo.findBySaleId(saleId);
    }
    async setAvailability(saleId, slots) {
        for (const slot of slots) {
            if (slot.dayOfWeek < 0 || slot.dayOfWeek > 6) {
                throw new Error("INVALID_DAY_OF_WEEK");
            }
            if (slot.startTime >= slot.endTime) {
                throw new Error("INVALID_TIME_RANGE");
            }
        }
        await this.availabilityRepo.setAvailability(saleId, slots);
        return this.availabilityRepo.findBySaleId(saleId);
    }
}
exports.AvailabilityService = AvailabilityService;
