import { Router } from "express";
import { z } from "zod";
import { AvailabilityController } from "../controllers/availability.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";

export const availabilityRoutes = Router();
const availabilityController = new AvailabilityController();

const setAvailabilitySchema = z.object({
  slots: z.array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Định dạng HH:mm:ss"),
      endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Định dạng HH:mm:ss")
    })
  )
});

availabilityRoutes.get("/my", authenticate, authorize("SALE"), availabilityController.getMyAvailability);
availabilityRoutes.post(
  "/my",
  authenticate,
  authorize("SALE"),
  validateBody(setAvailabilitySchema),
  availabilityController.setMyAvailability
);
availabilityRoutes.get("/:saleId", availabilityController.getSaleAvailabilityPublic);
