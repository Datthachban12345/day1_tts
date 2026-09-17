import { Router } from "express";
import { z } from "zod";
import { PropertyController } from "../controllers/property.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";

export const propertyRoutes = Router();
const propertyController = new PropertyController();

const createPropertySchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
  property_type: z.enum(["APARTMENT", "HOUSE", "VILLA", "TOWNHOUSE"]),
  price: z.number().positive(),
  area: z.number().positive(),
  bedrooms: z.number().int().optional(),
  bathrooms: z.number().int().optional(),
  address: z.string().min(5),
  district: z.string().min(2),
  city: z.string().min(2),
  assigned_sale_id: z.string().uuid().optional(),
  mediaUrls: z.array(z.string().url()).optional()
});

propertyRoutes.get("/", propertyController.getProperties);
propertyRoutes.get("/:id", propertyController.getPropertyById);
propertyRoutes.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validateBody(createPropertySchema),
  propertyController.createProperty
);
