import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyDetailPage } from "../components/PropertyDetailPage.js";
import { Property } from "../types/index.js";

const mockProperty: Property = {
  id: "prop-detail-1",
  title: "Biệt Thự Đơn Lập Starlake Tây Hồ",
  propertyType: "VILLA",
  price: 45000000000,
  priceText: "45 Tỷ",
  unitPriceText: "150 tr/m²",
  area: 300,
  bedrooms: 5,
  bathrooms: 4,
  direction: "Đông Nam",
  address: "KĐT Starlake",
  district: "Tây Hồ",
  city: "Hà Nội",
  description: "Biệt thự siêu VIP đẳng cấp quốc tế, sân vườn rộng",
  images: [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg"
  ],
  isVip: true,
  hasFreeSlotToday: true,
  assignedSale: {
    id: "sale-starlake",
    name: "Hoàng Thu Trang",
    phone: "0988111222",
    avatar: "https://example.com/avatar2.jpg",
    rating: 5.0,
    availableSlots: ["08:30 - 10:00", "15:30 - 17:00"]
  }
};

describe("PropertyDetailPage Component", () => {
  it("renders gallery, specifications, description, and assigned sales card", () => {
    const onBack = vi.fn();
    const onBook = vi.fn();

    render(
      <PropertyDetailPage
        property={mockProperty}
        onBack={onBack}
        onBook={onBook}
      />
    );

    expect(screen.getAllByText("Biệt Thự Đơn Lập Starlake Tây Hồ").length).toBeGreaterThan(0);
    expect(screen.getAllByText("45 Tỷ").length).toBeGreaterThan(0);
    expect(screen.getByText("300 m²")).toBeDefined();
    expect(screen.getByText("5 phòng")).toBeDefined();
    expect(screen.getByText("Hoàng Thu Trang")).toBeDefined();
    expect(screen.getByText("0988111222")).toBeDefined();
    expect(screen.getByText("Biệt thự siêu VIP đẳng cấp quốc tế, sân vườn rộng")).toBeDefined();
  });

  it("handles back navigation and book call to action", () => {
    const onBack = vi.fn();
    const onBook = vi.fn();

    render(
      <PropertyDetailPage
        property={mockProperty}
        onBack={onBack}
        onBook={onBook}
      />
    );

    fireEvent.click(screen.getByText(/Quay lại danh sách/i));
    expect(onBack).toHaveBeenCalled();

    const bookButtons = screen.getAllByText(/Đặt Lịch/i);
    fireEvent.click(bookButtons[0]);
    expect(onBook).toHaveBeenCalledWith(mockProperty);
  });
});
