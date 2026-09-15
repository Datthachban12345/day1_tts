import { Router } from "express";
import { z } from "zod";
import { AdminController } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";

export const adminRoutes = Router();
const adminController = new AdminController();

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  phone: z.string().min(8),
  role: z.enum(["ADMIN", "SALE", "CUSTOMER"])
});

const updateStatusSchema = z.object({
  isActive: z.boolean()
});

adminRoutes.use(authenticate, authorize("ADMIN"));
adminRoutes.get("/users", adminController.getUsers);
adminRoutes.post("/users", validateBody(createUserSchema), adminController.createUser);
adminRoutes.patch("/users/:id/status", validateBody(updateStatusSchema), adminController.updateUserStatus);
