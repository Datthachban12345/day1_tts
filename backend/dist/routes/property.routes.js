"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyRoutes = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const property_controller_js_1 = require("../controllers/property.controller.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const role_middleware_js_1 = require("../middlewares/role.middleware.js");
const validate_middleware_js_1 = require("../middlewares/validate.middleware.js");
exports.propertyRoutes = (0, express_1.Router)();
const propertyController = new property_controller_js_1.PropertyController();
const createPropertySchema = zod_1.z.object({
    title: zod_1.z.string().min(5),
    description: zod_1.z.string().optional(),
    property_type: zod_1.z.enum(["APARTMENT", "HOUSE", "VILLA", "TOWNHOUSE"]),
    price: zod_1.z.number().positive(),
    area: zod_1.z.number().positive(),
    bedrooms: zod_1.z.number().int().optional(),
    bathrooms: zod_1.z.number().int().optional(),
    address: zod_1.z.string().min(5),
    district: zod_1.z.string().min(2),
    city: zod_1.z.string().min(2),
    assigned_sale_id: zod_1.z.string().uuid().optional(),
    mediaUrls: zod_1.z.array(zod_1.z.string().url()).optional()
});
exports.propertyRoutes.get("/", propertyController.getProperties);
exports.propertyRoutes.get("/:id", propertyController.getPropertyById);
exports.propertyRoutes.post("/", auth_middleware_js_1.authenticate, (0, role_middleware_js_1.authorize)("ADMIN"), (0, validate_middleware_js_1.validateBody)(createPropertySchema), propertyController.createProperty);
