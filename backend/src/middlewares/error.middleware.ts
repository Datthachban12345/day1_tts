import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(`[ERROR] ${req.method} ${req.url}:`, err.message);

  const errorMap: Record<string, { status: number; message: string }> = {
    EMAIL_EXISTS: { status: 409, message: "Email này đã được sử dụng." },
    INVALID_CREDENTIALS: { status: 401, message: "Email hoặc mật khẩu không chính xác." },
    ACCOUNT_LOCKED: { status: 403, message: "Tài khoản của bạn đã bị khóa." },
    USER_NOT_FOUND: { status: 404, message: "Không tìm thấy người dùng." },
    PROPERTY_NOT_FOUND: { status: 404, message: "Không tìm thấy bất động sản." },
    BOOKING_NOT_FOUND: { status: 404, message: "Không tìm thấy lịch hẹn." },
    SLOT_NOT_AVAILABLE: { status: 400, message: "Nhân viên không có ca rảnh trong khung giờ này." },
    BOOKING_CONFLICT: { status: 409, message: "Khung giờ này đã có người đặt, vui lòng chọn khung giờ khác." },
    INVALID_STATUS_TRANSITION: { status: 400, message: "Bước chuyển trạng thái không hợp lệ." },
    INVALID_TIME_RANGE: { status: 400, message: "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc." },
    FORBIDDEN: { status: 403, message: "Bạn không có quyền thực hiện thao tác trên tài nguyên này." }
  };

  const mapped = errorMap[err.message];
  if (mapped) {
    res.status(mapped.status).json({
      success: false,
      error: err.message,
      message: mapped.message
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: "INTERNAL_SERVER_ERROR",
    message: "Đã xảy ra lỗi hệ thống, vui lòng thử lại sau."
  });
}
