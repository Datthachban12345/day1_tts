import { Booking, BookingStatus } from "../types/index.js";
import { apiRequest } from "./api.js";

export interface CreateBookingRequest {
  propertyId: string;
  saleId?: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  customerNote?: string;
}

function mapBooking(record: any): Booking {
  const startTime = record.start_time || "";
  const endTime = record.end_time || "";
  return {
    id: record.id,
    bookingCode: record.id,
    propertyId: record.property_id,
    propertyTitle: record.property_title || "",
    propertyAddress: record.property_address || "",
    propertyImage: record.property_image || "",
    propertyPrice: record.property_price ? `${record.property_price}` : "",
    customerId: record.customer_id,
    customerName: record.customer_name || "",
    customerPhone: record.customer_phone || "",
    saleId: record.sale_id,
    saleName: record.sale_name || "",
    salePhone: record.sale_phone || "",
    bookingDate: record.booking_date,
    timeSlot: `${startTime.slice(0, 5)} - ${endTime.slice(0, 5)}`,
    status: record.status as BookingStatus,
    customerNote: record.customer_note,
    createdAt: record.created_at,
    history: (record.statusHistory || []).map((item: any) => ({
      id: item.id,
      oldStatus: item.old_status,
      newStatus: item.new_status,
      actorRole: item.actor_role,
      actorName: item.actor_name || "",
      reason: item.reason,
      timestamp: item.created_at
    }))
  };
}

export async function getCustomerBookings(): Promise<Booking[]> {
  const result = await apiRequest<{ data: Booking[] }>("/bookings/customer");
  return result.data.map(mapBooking);
}

export async function createBooking(data: CreateBookingRequest): Promise<Booking> {
  const result = await apiRequest<{ data: Booking }>("/bookings", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return mapBooking(result.data);
}

export async function updateBookingStatus(id: string, status: string, reason?: string): Promise<Booking> {
  const result = await apiRequest<{ data: Booking }>(`/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, reason })
  });
  return mapBooking(result.data);
}

export async function getSaleBookings(): Promise<Booking[]> {
  const result = await apiRequest<{ data: any[] }>("/bookings/sale");
  return result.data.map(mapBooking);
}

export async function getAdminBookings(): Promise<Booking[]> {
  const result = await apiRequest<{ data: any[] }>("/bookings/admin");
  return result.data.map(mapBooking);
}

export async function getBookingDetail(id: string): Promise<Booking> {
  const result = await apiRequest<{ data: any }>(`/bookings/${id}`);
  return mapBooking(result.data);
}