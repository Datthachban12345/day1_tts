"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const property_service_js_1 = require("../services/property.service.js");
const propertyService = new property_service_js_1.PropertyService();
class PropertyController {
    async getProperties(req, res, next) {
        try {
            const { city, district, minPrice, maxPrice, minArea, bedrooms, propertyType, page, limit } = req.query;
            const result = await propertyService.searchProperties({
                city: city,
                district: district,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                minArea: minArea ? Number(minArea) : undefined,
                bedrooms: bedrooms ? Number(bedrooms) : undefined,
                propertyType: propertyType,
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 10
            });
            res.status(200).json({
                success: true,
                data: result.data,
                pagination: {
                    total: result.total,
                    page: Number(page) || 1,
                    limit: Number(limit) || 10,
                    totalPages: Math.ceil(result.total / (Number(limit) || 10))
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getPropertyById(req, res, next) {
        try {
            const property = await propertyService.getPropertyById(Number(req.params.id));
            res.status(200).json({
                success: true,
                data: property
            });
        }
        catch (error) {
            next(error);
        }
    }
    async createProperty(req, res, next) {
        try {
            const property = await propertyService.createProperty(req.body, req.user.userId);
            res.status(201).json({
                success: true,
                message: "Tạo bất động sản thành công.",
                data: property
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PropertyController = PropertyController;
