import React, { useState } from "react";
import { Property } from "../types/index.js";

interface BookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitBooking: (bookingData: {
    property: Property;
    bookingDate: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
    customerNote: string;
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  property,
  isOpen,
  onClose,
  onSubmitBooking
}) => {
  if (!isOpen || !property) return null;

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState(property.assignedSale.availableSlots[0] || "09:00 - 10:30");
  const [customerName, setCustomerName] = useState("Nguyễn Văn Khách");
  const [customerPhone, setCustomerPhone] = useState("0912 345 678");
  const [customerNote, setCustomerNote] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitBooking({
      property,
      bookingDate: selectedDate,
      timeSlot: selectedSlot,
      customerName,
      customerPhone,
      customerNote
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-100 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-red-100">
              📅 Đặt Lịch Xem Nhà Trực Tuyến
            </div>
            <h2 className="text-base sm:text-lg font-extrabold mt-0.5">
              Xác nhận thời gian tiếp đón tại bất động sản
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center text-lg font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-900">Đặt Lịch Xem Nhà Thành Công!</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Yêu cầu của bạn đã được gửi đến chuyên viên <strong>{property.assignedSale.name}</strong>. Trạng thái hiện tại là <span className="text-amber-600 font-bold">PENDING (Chờ xác nhận)</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {/* Property Summary Card */}
            <div className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 items-center">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1">
                  {property.title}
                </h4>
                <div className="text-red-600 font-black text-sm mt-0.5">
                  {property.priceText} <span className="text-gray-400 font-normal text-xs">• {property.area} m²</span>
                </div>
                <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                  📍 {property.address}, {property.district}
                </div>
              </div>
            </div>

            {/* Sales Agent Info */}
            <div className="flex items-center justify-between p-3 bg-red-50/60 rounded-xl border border-red-100">
              <div className="flex items-center gap-2.5">
                <img
                  src={property.assignedSale.avatar}
                  alt={property.assignedSale.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-red-300"
                />
                <div>
                  <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    {property.assignedSale.name}
                    <span className="bg-red-600 text-white text-[9px] px-1 rounded-sm">Sale Phụ Trách</span>
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Hotline: <strong>{property.assignedSale.phone}</strong>
                  </div>
                </div>
              </div>
              <div className="text-right text-xs font-semibold text-emerald-700">
                ⭐ {property.assignedSale.rating} (Đánh giá cao)
              </div>
            </div>

            {/* Date & Time Slot Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  1. CHỌN NGÀY XEM NHÀ *
                </label>
                <input
                  type="date"
                  min={today}
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold focus:border-red-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  2. CHỌN KHUNG GIỜ RẢNH CỦA SALE *
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold focus:border-red-500 focus:outline-hidden bg-white"
                >
                  {property.assignedSale.availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      🕒 {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  HỌ VÀ TÊN KHÁCH HÀNG *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium focus:border-red-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  SỐ ĐIỆN THOẠI LIÊN HỆ *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium focus:border-red-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                GHI CHÚ THÊM CHO SALES (NẾU CÓ)
              </label>
              <textarea
                rows={2}
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="VD: Tôi muốn xem hướng nắng buổi chiều, xem hệ thống thang máy và sổ đỏ..."
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs sm:text-sm font-medium focus:border-red-500 focus:outline-hidden"
              />
            </div>

            {/* Note about Transaction Rule */}
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-800 flex items-start gap-1.5">
              <span>ℹ️</span>
              <span>
                <strong>Quy tắc hệ thống:</strong> Yêu cầu được xử lý trong 1 Transaction an toàn. Chống trùng lịch 100%, ghi log vết kiểm toán và thông báo trực tiếp đến điện thoại của Sales.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy Bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <span>🚀</span> XÁC NHẬN ĐẶT LỊCH XEM NHÀ
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
