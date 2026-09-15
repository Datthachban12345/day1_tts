import { Router } from "express";
import { adminRoutes } from "./admin.routes.js";
import { authRoutes } from "./auth.routes.js";
import { availabilityRoutes } from "./availability.routes.js";
import { bookingRoutes } from "./booking.routes.js";
import { notificationRoutes } from "./notification.routes.js";
import { propertyRoutes } from "./property.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/properties", propertyRoutes);
apiRouter.use("/sales/availability", availabilityRoutes);
apiRouter.use("/bookings", bookingRoutes);
apiRouter.use("/notifications", notificationRoutes);
apiRouter.use("/admin", adminRoutes);

apiRouter.get("/health", (req, res) => {
  res.json({
    status: "UP",
    timestamp: new Date().toISOString(),
    service: "Home Viewing Booking API"
  });
});
