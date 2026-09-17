import { UserRole } from "../types/index.js";
import { apiRequest } from "./api.js";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const response = await apiRequest<{ data: AdminUser[] }>("/admin/users");
  return response.data;
}

export async function updateAdminUserStatus(id: string, isActive: boolean): Promise<void> {
  await apiRequest(`/admin/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive })
  });
}