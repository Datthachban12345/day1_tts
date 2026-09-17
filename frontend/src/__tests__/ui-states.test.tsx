import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  StatusBadge,
  EmptyState,
  FieldError,
  InlineAlert,
  StepIndicator,
} from "../components/UIStates.js";

describe("UIStates Component Suite", () => {
  it("renders status badges correctly with label and styling", () => {
    const { unmount } = render(<StatusBadge status="PENDING" />);
    expect(screen.getByText(/Chờ xác nhận/i)).toBeDefined();
    unmount();

    render(<StatusBadge status="CONFIRMED" />);
    expect(screen.getByText(/Đã xác nhận/i)).toBeDefined();
  });

  it("renders EmptyState with icon, title, and description", () => {
    render(
      <EmptyState
        icon="🔍"
        title="Không tìm thấy kết quả"
        description="Vui lòng thử bộ lọc khác"
      />
    );
    expect(screen.getByText("Không tìm thấy kết quả")).toBeDefined();
    expect(screen.getByText("Vui lòng thử bộ lọc khác")).toBeDefined();
    expect(screen.getByText("🔍")).toBeDefined();
  });

  it("renders FieldError only when error message exists", () => {
    const { container, unmount } = render(<FieldError message={null} />);
    expect(container.firstChild).toBeNull();
    unmount();

    render(<FieldError message="Trường này là bắt buộc" />);
    expect(screen.getByText("Trường này là bắt buộc")).toBeDefined();
  });

  it("renders InlineAlert with correct alert role", () => {
    render(<InlineAlert type="error" message="Lỗi hệ thống" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeDefined();
    expect(screen.getByText("Lỗi hệ thống")).toBeDefined();
  });

  it("renders StepIndicator with all step labels", () => {
    const steps = ["Chọn Ngày", "Chọn Giờ", "Xác Nhận"];
    render(<StepIndicator steps={steps} currentStep={1} />);
    expect(screen.getByText("Chọn Ngày")).toBeDefined();
    expect(screen.getByText("Chọn Giờ")).toBeDefined();
    expect(screen.getByText("Xác Nhận")).toBeDefined();
  });
});
