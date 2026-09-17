import { apiRequest } from "./api.js";

export interface AvailabilitySlot {
  id: string;
  saleId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export async function getSaleAvailability(saleId: string): Promise<AvailabilitySlot[]> {
  const response = await apiRequest<{ data: AvailabilitySlot[] }>(`/sales/availability/${saleId}`);
  return response.data;
}

export async function getMyAvailability(): Promise<AvailabilitySlot[]> {
  const response = await apiRequest<{ data: AvailabilitySlot[] }>("/sales/availability/my");
  return response.data;
}

export async function setMyAvailability(slots: { dayOfWeek: number; startTime: string; endTime: string }[]): Promise<void> {
  await apiRequest("/sales/availability/my", {
    method: "POST",
    body: JSON.stringify({ slots })
  });
}