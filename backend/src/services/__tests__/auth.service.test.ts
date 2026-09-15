import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "../auth.service.js";

describe("AuthService Unit Tests", () => {
  let authService: AuthService;
  let mockUserRepo: any;

  beforeEach(() => {
    mockUserRepo = {
      findByEmail: vi.fn(),
      findById: vi.fn(),
      getRoleIdByName: vi.fn(),
      create: vi.fn()
    };
    authService = new AuthService(mockUserRepo);
  });

  it("should throw EMAIL_EXISTS if email is already registered", async () => {
    mockUserRepo.findByEmail.mockResolvedValue({ id: 1, email: "test@example.com" });

    await expect(
      authService.register({
        email: "test@example.com",
        password: "password123",
        fullName: "Test User",
        phone: "0912345678"
      })
    ).rejects.toThrow("EMAIL_EXISTS");
  });

  it("should register successfully and return JWT token", async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);
    mockUserRepo.getRoleIdByName.mockResolvedValue(3);
    mockUserRepo.create.mockResolvedValue(10);
    mockUserRepo.findById.mockResolvedValue({
      id: 10,
      email: "newuser@example.com",
      fullName: "New User",
      phone: "0912345678",
      role: "CUSTOMER",
      isActive: true,
      createdAt: new Date().toISOString()
    });

    const result = await authService.register({
      email: "newuser@example.com",
      password: "password123",
      fullName: "New User",
      phone: "0912345678"
    });

    expect(result).toBeDefined();
    expect(result.accessToken).toBeDefined();
    expect(result.user.email).toBe("newuser@example.com");
  });
});
