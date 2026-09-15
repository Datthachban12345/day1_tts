export type UserRole = "ADMIN" | "SALE" | "CUSTOMER";

export type BookingStatus = "PENDING" | "CONFIRMED" | "REJECTED" | "CANCELLED" | "COMPLETED";

export type PropertyType = "APARTMENT" | "HOUSE" | "VILLA" | "TOWNHOUSE";

export type PropertyStatus = "AVAILABLE" | "SOLD" | "RENTED" | "INACTIVE";

export interface User {
  id: number;
  role_id: number;
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
  id: number;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface Property {
  id: number;
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
  created_by?: number;
  assigned_sale_id?: number;
  created_at: Date;
  updated_at: Date;
}

export interface PropertyMedia {
  id: number;
  property_id: number;
  media_url: string;
  media_type: "IMAGE" | "VIDEO";
  is_primary: boolean;
  created_at: Date;
}

export interface SaleAvailability {
  id: number;
  sale_id: number;
  day_of_week: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  start_time: string; // HH:mm:ss
  end_time: string;   // HH:mm:ss
  is_active: boolean;
}

export interface Booking {
  id: number;
  customer_id: number;
  sale_id: number;
  property_id: number;
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
  id: number;
  booking_id: number;
  old_status: BookingStatus | null;
  new_status: BookingStatus;
  actor_id: number;
  actor_name?: string;
  actor_role?: UserRole;
  reason?: string;
  created_at: Date;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: Date;
}

export interface AuthTokenPayload {
  userId: number;
  role: UserRole;
  email: string;
}

export interface PropertyFilterDTO {
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
