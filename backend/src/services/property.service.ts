import { PropertyRepository } from "../repositories/property.repository.js";
import { PropertyFilterDTO } from "../types/index.js";

export class PropertyService {
  constructor(private propertyRepo: PropertyRepository = new PropertyRepository()) {}

  async searchProperties(filter: PropertyFilterDTO) {
    return this.propertyRepo.findAll(filter);
  }

  async getPropertyById(id: string) {
    const property = await this.propertyRepo.findById(id);
    if (!property) {
      throw new Error("PROPERTY_NOT_FOUND");
    }
    return property;
  }

  async createProperty(data: any, adminId: string) {
    const propertyId = await this.propertyRepo.create(
      {
        ...data,
        created_by: adminId
      },
      data.mediaUrls || []
    );
    return this.getPropertyById(propertyId);
  }
}
