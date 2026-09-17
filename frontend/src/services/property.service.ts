import { Property, PropertyType } from "../types/index.js";
import { apiRequest } from "./api.js";

interface PropertyApiRecord {
  id: string;
  title: string;
  description?: string;
  property_type: PropertyType;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  district: string;
  city: string;
  thumbnailUrl?: string;
  assigned_sale_id?: string;
  assignedSaleName?: string;
  media?: { mediaUrl: string }[];
}

function toProperty(record: PropertyApiRecord): Property {
  const images = (record.media || []).map((media) => media.mediaUrl).filter(Boolean);
  const image = record.thumbnailUrl || images[0] || "";
  return {
    id: record.id,
    title: record.title,
    propertyType: record.property_type,
    price: record.price,
    priceText: `${(record.price / 1_000_000_000).toFixed(2)} Tỷ`,
    unitPriceText: `${(record.price / record.area / 1_000_000).toFixed(1)} tr/m²`,
    area: record.area,
    bedrooms: record.bedrooms,
    bathrooms: record.bathrooms,
    address: record.address,
    district: record.district,
    city: record.city,
    description: record.description || "",
    images: [image, ...images.filter((url) => url !== image)],
    hasFreeSlotToday: false,
    assignedSale: {
      id: record.assigned_sale_id || "",
      name: record.assignedSaleName || "Sale phụ trách",
      phone: "",
      avatar: "",
      rating: 0,
      availableSlots: []
    }
  };
}

export async function getProperties(params: URLSearchParams): Promise<Property[]> {
  const result = await apiRequest<{ data: PropertyApiRecord[] }>(`/properties?${params}`);
  return result.data.map(toProperty);
}

export async function createProperty(data: {
  title: string;
  description?: string;
  property_type: PropertyType;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  district: string;
  city: string;
  mediaUrls?: string[];
}): Promise<void> {
  await apiRequest("/properties", { method: "POST", body: JSON.stringify(data) });
}