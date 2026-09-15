import { describe, it, expect, vi, beforeEach } from "vitest";
import { PropertyService } from "../property.service.js";

describe("PropertyService Unit Tests", () => {
  let propertyService: PropertyService;
  let mockPropertyRepo: any;

  beforeEach(() => {
    mockPropertyRepo = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn()
    };
    propertyService = new PropertyService(mockPropertyRepo);
  });

  it("should return paginated property search results", async () => {
    mockPropertyRepo.findAll.mockResolvedValue({
      data: [{ id: 1, title: "Can ho Cau Giay", price: 3500000000 }],
      total: 1
    });

    const result = await propertyService.searchProperties({
      city: "Hanoi",
      district: "Cau Giay",
      minPrice: 2000000000
    });

    expect(result.data.length).toBe(1);
    expect(result.total).toBe(1);
    expect(mockPropertyRepo.findAll).toHaveBeenCalledWith({
      city: "Hanoi",
      district: "Cau Giay",
      minPrice: 2000000000
    });
  });

  it("should throw PROPERTY_NOT_FOUND when property ID does not exist", async () => {
    mockPropertyRepo.findById.mockResolvedValue(null);

    await expect(propertyService.getPropertyById(999)).rejects.toThrow("PROPERTY_NOT_FOUND");
  });
});
