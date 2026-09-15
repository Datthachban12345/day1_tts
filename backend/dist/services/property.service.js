"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const property_repository_js_1 = require("../repositories/property.repository.js");
class PropertyService {
    propertyRepo;
    constructor(propertyRepo = new property_repository_js_1.PropertyRepository()) {
        this.propertyRepo = propertyRepo;
    }
    async searchProperties(filter) {
        return this.propertyRepo.findAll(filter);
    }
    async getPropertyById(id) {
        const property = await this.propertyRepo.findById(id);
        if (!property) {
            throw new Error("PROPERTY_NOT_FOUND");
        }
        return property;
    }
    async createProperty(data, adminId) {
        const propertyId = await this.propertyRepo.create({
            ...data,
            created_by: adminId
        }, data.mediaUrls || []);
        return this.getPropertyById(propertyId);
    }
}
exports.PropertyService = PropertyService;
