import { UserRole } from "../types/index.js";
import { apiRequest } from "./api.js";

interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    role: UserRole;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await apiRequest<{ data: AuthResponse }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  localStorage.setItem("homeviewing.accessToken", response.data.accessToken);
  return response.data;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await apiRequest<{ data: AuthResponse }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data)
  });
  return response.data;
}

export function logout(): void {
  localStorage.removeItem("homeviewing.accessToken");
}

export async function getCurrentUser(): Promise<AuthResponse["user"]> {
  const response = await apiRequest<{ data: AuthResponse["user"] }>("/auth/me");
  return response.data;
}