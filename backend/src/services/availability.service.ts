import { AvailabilityRepository } from "../repositories/availability.repository.js";

export class AvailabilityService {
  constructor(private availabilityRepo: AvailabilityRepository = new AvailabilityRepository()) {}

  async getAvailabilityBySaleId(saleId: string) {
    return this.availabilityRepo.findBySaleId(saleId);
  }

  async setAvailability(
    saleId: string,
    slots: { dayOfWeek: number; startTime: string; endTime: string }[]
  ) {
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
