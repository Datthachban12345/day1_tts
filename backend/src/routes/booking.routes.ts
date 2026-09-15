import { Router } from "express";
import { z } from "zod";
import { BookingController } from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";

export const bookingRoutes = Router();
const bookingController = new BookingController();

const createBookingSchema = z.object({
  propertyId: z.number().int().positive(),
  saleId: z.number().int().positive().optional(),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Định dạng YYYY-MM-DD"),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Định dạng HH:mm:ss"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Định dạng HH:mm:ss"),
  customerNote: z.string().max(500).optional()
});

const updateStatusSchema = z.object({
  status: z.enum(["CONFIRMED", "REJECTED", "CANCELLED", "COMPLETED"]),
  reason: z.string().max(255).optional()
});

bookingRoutes.get(
  "/customer",
  authenticate,
  authorize("CUSTOMER"),
  bookingController.getCustomerBookings
);
bookingRoutes.get(
  "/sale",
  authenticate,
  authorize("SALE"),
  bookingController.getSaleBookings
);
bookingRoutes.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  bookingController.getAdminBookings
);
bookingRoutes.get("/:id", authenticate, bookingController.getBookingDetail);
bookingRoutes.post(
  "/",
  authenticate,
  authorize("CUSTOMER"),
  validateBody(createBookingSchema),
  bookingController.createBooking
);
bookingRoutes.patch(
  "/:id/status",
  authenticate,
  validateBody(updateStatusSchema),
  bookingController.updateBookingStatus
);
