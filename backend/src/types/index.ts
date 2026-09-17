export type UserRole = "ADMIN" | "SALE" | "CUSTOMER";

export type BookingStatus = "PENDING" | "CONFIRMED" | "REJECTED" | "CANCELLED" | "COMPLETED";

export type PropertyType = "APARTMENT" | "HOUSE" | "VILLA" | "TOWNHOUSE";

export type PropertyStatus = "AVAILABLE" | "SOLD" | "RENTED" | "INACTIVE";

export interface User {
  id: string;
  role_id: string;
  role_name?: UserRole;
  email: string;
  password_hash: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface Property {
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
  status: PropertyStatus;
  created_by?: string;
  assigned_sale_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface PropertyMedia {
  id: string;
  property_id: string;
  url: string;
  media_type: "IMAGE" | "VIDEO";
  is_primary: boolean;
  created_at: Date;
}

export interface SaleAvailability {
  id: string;
  sale_id: string;
  day_of_week: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  start_time: string; // HH:mm:ss
  end_time: string;   // HH:mm:ss
  is_active: boolean;
}

export interface Booking {
  id: string;
  customer_id: string;
  sale_id: string;
  property_id: string;
  booking_date: string; // YYYY-MM-DD
  start_time: string;   // HH:mm:ss
  end_time: string;     // HH:mm:ss
  status: BookingStatus;
  customer_note?: string;
  created_at: Date;
  updated_at: Date;

  // Joined fields
  customer_name?: string;
  customer_phone?: string;
  sale_name?: string;
  property_title?: string;
}

export interface BookingStatusHistory {
  id: string;
  booking_id: string;
  old_status: BookingStatus | null;
  new_status: BookingStatus;
  actor_id: string;
  actor_name?: string;
  actor_role?: UserRole;
  reason?: string;
  created_at: Date;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: Date;
}

export interface AuthTokenPayload {
  userId: string;
  role: UserRole;
  email: string;
}

export interface PropertyFilterDTO {
  search?: string;
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  bedrooms?: number;
  propertyType?: PropertyType;
  page?: number;
  limit?: number;
}
