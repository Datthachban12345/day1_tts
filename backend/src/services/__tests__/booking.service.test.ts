import { describe, it, expect, vi, beforeEach } from "vitest";
import { BookingService } from "../booking.service.js";

// Mock Database transaction helper
vi.mock("../../config/database.js", () => ({
  pool: {},
  withTransaction: vi.fn(async (cb) => cb({} as any))
}));

describe("BookingService Unit Tests", () => {
  let bookingService: BookingService;
  let mockBookingRepo: any;
  let mockAvailabilityRepo: any;
  let mockPropertyRepo: any;
  let mockNotificationRepo: any;

  beforeEach(() => {
    mockBookingRepo = {
      findById: vi.fn(),
      findConflicts: vi.fn(),
      findByCustomer: vi.fn(),
      findBySale: vi.fn(),
      findAll: vi.fn(),
      createBookingInTransaction: vi.fn(),
      updateStatusInTransaction: vi.fn(),
      getStatusHistory: vi.fn()
    };

    mockAvailabilityRepo = {
      checkSlotAvailable: vi.fn()
    };

    mockPropertyRepo = {
      findById: vi.fn()
    };

    mockNotificationRepo = {
      create: vi.fn()
    };

    bookingService = new BookingService(
      mockBookingRepo,
      mockAvailabilityRepo,
      mockPropertyRepo,
      mockNotificationRepo
    );
  });

  describe("State Transition Validation", () => {
    it("should allow SALE to transition from PENDING to CONFIRMED or REJECTED", () => {
      expect(bookingService.validateStateTransition("PENDING", "CONFIRMED", "SALE")).toBe(true);
      expect(bookingService.validateStateTransition("PENDING", "REJECTED", "SALE")).toBe(true);
      expect(bookingService.validateStateTransition("PENDING", "COMPLETED", "SALE")).toBe(false);
    });

    it("should allow CUSTOMER to cancel a PENDING or CONFIRMED booking", () => {
      expect(bookingService.validateStateTransition("PENDING", "CANCELLED", "CUSTOMER")).toBe(true);
      expect(bookingService.validateStateTransition("CONFIRMED", "CANCELLED", "CUSTOMER")).toBe(true);
      expect(bookingService.validateStateTransition("CONFIRMED", "COMPLETED", "CUSTOMER")).toBe(false);
    });

    it("should allow SALE to complete a CONFIRMED booking", () => {
      expect(bookingService.validateStateTransition("CONFIRMED", "COMPLETED", "SALE")).toBe(true);
    });

    it("should not allow cancelling a COMPLETED or REJECTED booking", () => {
      expect(bookingService.validateStateTransition("COMPLETED", "CANCELLED", "CUSTOMER")).toBe(false);
      expect(bookingService.validateStateTransition("REJECTED", "CANCELLED", "CUSTOMER")).toBe(false);
    });
  });

  describe("createBooking", () => {
    it("should successfully create a booking when slot is available and no conflict exists", async () => {
      mockPropertyRepo.findById.mockResolvedValue({
        id: 1,
        title: "Vinhomes Metropolis 2BR",
        assigned_sale_id: 10
      });
      mockAvailabilityRepo.checkSlotAvailable.mockResolvedValue(true);
      mockBookingRepo.findConflicts.mockResolvedValue([]);
      mockBookingRepo.createBookingInTransaction.mockResolvedValue(101);
      mockBookingRepo.findById.mockResolvedValue({
        id: 101,
        customer_id: 5,
        sale_id: 10,
        property_id: 1,
        status: "PENDING",
        booking_date: "2026-10-01",
        start_time: "09:00:00",
        end_time: "10:00:00"
      });

      const result = await bookingService.createBooking({
        customerId: 5,
        propertyId: 1,
        bookingDate: "2026-10-01",
        startTime: "09:00:00",
        endTime: "10:00:00",
        customerNote: "Cần xem kỹ ban công"
      });

      expect(result).toBeDefined();
      expect(result.id).toBe(101);
      expect(result.status).toBe("PENDING");
      expect(mockBookingRepo.createBookingInTransaction).toHaveBeenCalled();
      expect(mockNotificationRepo.create).toHaveBeenCalled();
    });

    it("should throw SLOT_NOT_AVAILABLE when Sales is not available at that time", async () => {
      mockPropertyRepo.findById.mockResolvedValue({
        id: 1,
        title: "Vinhomes Metropolis 2BR",
        assigned_sale_id: 10
      });
      mockAvailabilityRepo.checkSlotAvailable.mockResolvedValue(false);

      await expect(
        bookingService.createBooking({
          customerId: 5,
          propertyId: 1,
          bookingDate: "2026-10-01",
          startTime: "09:00:00",
          endTime: "10:00:00"
        })
      ).rejects.toThrow("SLOT_NOT_AVAILABLE");
    });

    it("should throw BOOKING_CONFLICT when a overlapping booking already exists", async () => {
      mockPropertyRepo.findById.mockResolvedValue({
        id: 1,
        title: "Vinhomes Metropolis 2BR",
        assigned_sale_id: 10
      });
      mockAvailabilityRepo.checkSlotAvailable.mockResolvedValue(true);
      mockBookingRepo.findConflicts.mockResolvedValue([{ id: 99, status: "CONFIRMED" }]);

      await expect(
        bookingService.createBooking({
          customerId: 5,
          propertyId: 1,
          bookingDate: "2026-10-01",
          startTime: "09:00:00",
          endTime: "10:00:00"
        })
      ).rejects.toThrow("BOOKING_CONFLICT");
    });
  });

  describe("updateBookingStatus", () => {
    it("should update status and send notification on valid transition", async () => {
      mockBookingRepo.findById.mockResolvedValue({
        id: 101,
        customer_id: 5,
        sale_id: 10,
        status: "PENDING"
      });
      mockBookingRepo.findById.mockResolvedValueOnce({
        id: 101,
        customer_id: 5,
        sale_id: 10,
        status: "PENDING"
      }).mockResolvedValueOnce({
        id: 101,
        customer_id: 5,
        sale_id: 10,
        status: "CONFIRMED"
      });

      const updated = await bookingService.updateBookingStatus(
        101,
        "CONFIRMED",
        10,
        "SALE"
      );

      expect(updated).toBeDefined();
      expect(mockBookingRepo.updateStatusInTransaction).toHaveBeenCalled();
      expect(mockNotificationRepo.create).toHaveBeenCalled();
    });

    it("should reject status update if user does not own the booking", async () => {
      mockBookingRepo.findById.mockResolvedValue({
        id: 101,
        customer_id: 5,
        sale_id: 10,
        status: "PENDING"
      });

      await expect(
        bookingService.updateBookingStatus(101, "CONFIRMED", 999, "SALE")
      ).rejects.toThrow("FORBIDDEN");
    });
  });
});
