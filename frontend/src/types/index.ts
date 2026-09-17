export type UserRole = "CUSTOMER" | "SALE" | "ADMIN";

export type BookingStatus = "PENDING" | "CONFIRMED" | "REJECTED" | "CANCELLED" | "COMPLETED";

export type PropertyType = "APARTMENT" | "HOUSE" | "VILLA" | "TOWNHOUSE";

export interface Property {
  id: string;
  title: string;
  propertyType: PropertyType;
  price: number; // in VNĐ
  priceText: string; // e.g. "4.2 Tỷ"
  unitPriceText: string; // e.g. "56 tr/m²"
  area: number; // m²
  bedrooms: number;
  bathrooms: number;
  direction?: string;
  address: string;
  district: string;
  city: string;
  description: string;
  images: string[];
  isVip?: boolean;
  hasFreeSlotToday?: boolean;
  assignedSale: {
    id: string;
    name: string;
    phone: string;
    avatar: string;
    rating: number;
    availableSlots: string[]; // ["08:30 - 10:00", "10:00 - 11:30", "14:00 - 15:30", "15:30 - 17:00"]
  };
}

export interface BookingStatusHistory {
  id: string;
  oldStatus: BookingStatus | null;
  newStatus: BookingStatus;
  actorRole: UserRole;
  actorName: string;
  reason?: string;
  timestamp: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyImage: string;
  propertyPrice: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  saleId: string;
  saleName: string;
  salePhone: string;
  bookingDate: string; // YYYY-MM-DD
  timeSlot: string; // "09:00 - 10:30"
  status: BookingStatus;
  customerNote?: string;
  createdAt: string;
  history: BookingStatusHistory[];
}
