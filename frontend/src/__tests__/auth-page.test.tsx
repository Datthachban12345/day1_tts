import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthPage } from "../components/AuthPage.js";

describe("AuthPage International Standard Experience", () => {
  it("renders branding, headline, and login form by default", () => {
    const onAuth = vi.fn();
    render(<AuthPage initialMode="login" onAuthenticated={onAuth} />);

    expect(screen.getByText(/Tìm căn nhà mơ ước/i)).toBeDefined();
    expect(screen.getByText("Đăng Nhập Hệ Thống")).toBeDefined();
    expect(screen.getByText("👤 Khách Hàng (Demo)")).toBeDefined();
    expect(screen.getByText("👔 Chuyên Viên Sales")).toBeDefined();
    expect(screen.getByText("👑 Quản Trị Viên (Admin)")).toBeDefined();
  });

  it("switches between login and register modes smoothly", () => {
    const onAuth = vi.fn();
    render(<AuthPage initialMode="login" onAuthenticated={onAuth} />);

    const registerTab = screen.getByRole("button", { name: "Đăng Ký Mới" });
    fireEvent.click(registerTab);

    expect(screen.getByText("Đăng Ký Tài Khoản")).toBeDefined();
    expect(screen.getByPlaceholderText("Nguyễn Văn A")).toBeDefined();
    expect(screen.getByPlaceholderText("Nhập lại mật khẩu vừa tạo")).toBeDefined();
  });

  it("auto-fills demo accounts with 1-click", () => {
    const onAuth = vi.fn();
    render(<AuthPage initialMode="login" onAuthenticated={onAuth} />);

    const adminBtn = screen.getByText("👑 Quản Trị Viên (Admin)");
    fireEvent.click(adminBtn);

    const emailInput = screen.getByPlaceholderText("you@example.com") as HTMLInputElement;
    expect(emailInput.value).toBe("admin@homebooking.vn");
  });
});
