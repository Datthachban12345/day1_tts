import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyCard } from "../components/PropertyCard.js";
import { Property } from "../types/index.js";

const mockProperty: Property = {
  id: "prop-1",
  title: "Căn Hộ Cao Cấp Vinhomes Skylake",
  propertyType: "APARTMENT",
  price: 5200000000,
  priceText: "5.2 Tỷ",
  unitPriceText: "68 tr/m²",
  area: 76.5,
  bedrooms: 2,
  bathrooms: 2,
  direction: "Đông Nam",
  address: "Phạm Hùng",
  district: "Cầu Giấy",
  city: "Hà Nội",
  description: "Căn hộ view hồ cực đẹp, nội thất đầy đủ",
  images: ["https://example.com/img1.jpg"],
  isVip: true,
  hasFreeSlotToday: true,
  assignedSale: {
    id: "sale-1",
    name: "Trần Hải Đăng",
    phone: "0912345678",
    avatar: "https://example.com/avatar.jpg",
    rating: 4.9,
    availableSlots: ["09:00 - 10:30", "14:00 - 15:30"]
  }
};

describe("PropertyCard Component", () => {
  it("renders property title, price, specifications, and badges", () => {
    const onOpenBooking = vi.fn();
    const onViewDetails = vi.fn();

    render(
      <PropertyCard
        property={mockProperty}
        onOpenBookingModal={onOpenBooking}
        onViewDetails={onViewDetails}
      />
    );

    expect(screen.getByText("Căn Hộ Cao Cấp Vinhomes Skylake")).toBeDefined();
    expect(screen.getByText("5.2 Tỷ")).toBeDefined();
    expect(screen.getByText("⭐ VIP Kim Cương")).toBeDefined();
    expect(screen.getByText("⚡ Lịch trống hôm nay")).toBeDefined();
    expect(screen.getByText(/Trần Hải Đăng/i)).toBeDefined();
  });

  it("triggers onViewDetails when clicking title or button", () => {
    const onOpenBooking = vi.fn();
    const onViewDetails = vi.fn();

    render(
      <PropertyCard
        property={mockProperty}
        onOpenBookingModal={onOpenBooking}
        onViewDetails={onViewDetails}
      />
    );

    fireEvent.click(screen.getByText("Xem Chi Tiết"));
    expect(onViewDetails).toHaveBeenCalledWith(mockProperty);
  });

  it("triggers onOpenBookingModal when clicking booking action button", () => {
    const onOpenBooking = vi.fn();
    const onViewDetails = vi.fn();

    render(
      <PropertyCard
        property={mockProperty}
        onOpenBookingModal={onOpenBooking}
        onViewDetails={onViewDetails}
      />
    );

    fireEvent.click(screen.getByText(/Đặt Lịch Ngay/i));
    expect(onOpenBooking).toHaveBeenCalledWith(mockProperty);
  });
});
