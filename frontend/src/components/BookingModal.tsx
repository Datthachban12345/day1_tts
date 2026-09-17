import React, { useEffect, useState } from "react";
import { Property } from "../types/index.js";
import { getSaleAvailability, AvailabilitySlot } from "../services/availability.service.js";
import { StepIndicator, LoadingSpinner, FieldError, InlineAlert } from "./UIStates.js";

interface BookingModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onGoToMyBookings?: () => void;
  onSubmitBooking: (bookingData: {
    property: Property;
    bookingDate: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
    customerNote: string;
  }) => Promise<{ bookingCode?: string } | void>;
}

const STEPS = ["Chọn Ngày", "Chọn Giờ", "Xác Nhận"];

const today = new Date().toISOString().split("T")[0];

export const BookingModal: React.FC<BookingModalProps> = ({
  property,
  isOpen,
  onClose,
  onGoToMyBookings,
  onSubmitBooking,
}) => {
  const [step, setStep] = useState(0);

  // Step 1
  const [selectedDate, setSelectedDate] = useState(today);
  const [dateError, setDateError] = useState<string | null>(null);

  // Step 2
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [slotValidationError, setSlotValidationError] = useState<string | null>(null);

  // Step 3
  const [customerNote, setCustomerNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Success
  const [successBookingCode, setSuccessBookingCode] = useState<string | null>(null);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setSelectedDate(today);
      setDateError(null);
      setSelectedSlot("");
      setAvailableSlots([]);
      setSlotError(null);
      setSlotValidationError(null);
      setCustomerNote("");
      setSubmitError(null);
      setSuccessBookingCode(null);
    }
  }, [isOpen, property?.id]);

  // Load slots when date changes (step 1 → 2 transition)
  const loadSlots = async (date: string) => {
    if (!property?.assignedSale.id) return;
    setIsLoadingSlots(true);
    setSlotError(null);
    setSelectedSlot("");
    try {
      const slots = await getSaleAvailability(property.assignedSale.id);
      const d = new Date(`${date}T00:00:00`);
      const dow = d.getDay() === 0 ? 7 : d.getDay();
      const matched = slots.filter((s) => s.dayOfWeek === dow);
      setAvailableSlots(matched);
    } catch (err) {
      setSlotError(err instanceof Error ? err.message : "Không thể tải ca rảnh.");
      setAvailableSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleNextFromStep1 = () => {
    if (!selectedDate) {
      setDateError("Vui lòng chọn ngày xem nhà.");
      return;
    }
    setDateError(null);
    void loadSlots(selectedDate);
    setStep(1);
  };

  const handleNextFromStep2 = () => {
    if (!selectedSlot) {
      setSlotValidationError("Vui lòng chọn một khung giờ.");
      return;
    }
    setSlotValidationError(null);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!property || !selectedSlot) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await onSubmitBooking({
        property,
        bookingDate: selectedDate,
        timeSlot: selectedSlot,
        customerName: "",
        customerPhone: "",
        customerNote,
      });
      const code = (result as { bookingCode?: string })?.bookingCode;
      setSuccessBookingCode(code ?? "");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Không thể tạo booking. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !property) return null;

  const slotLabel = (s: AvailabilitySlot) =>
    `${s.startTime.slice(0, 5)} - ${s.endTime.slice(0, 5)}`;

  // Format display date
  const displayDate = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-xl sm:rounded-2xl rounded-t-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[95vh] flex flex-col">

        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-red-200">
              📅 Đặt lịch xem nhà
            </p>
            <h2 className="text-base font-extrabold mt-0.5 line-clamp-1">{property.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white font-bold transition-colors shrink-0 ml-3"
          >
            ✕
          </button>
        </div>

        {/* ── Success Screen ── */}
        {successBookingCode !== null ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl shadow-inner">
              ✓
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-gray-900">Đặt Lịch Thành Công!</h3>
              <p className="text-sm text-gray-500">
                Yêu cầu đã được gửi đến <strong>{property.assignedSale.name}</strong>
              </p>
            </div>

            {/* Booking summary */}
            <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 text-left text-sm">
              {successBookingCode && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Mã booking:</span>
                  <span className="font-mono font-bold text-gray-900">#{successBookingCode}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Ngày xem:</span>
                <span className="font-semibold text-gray-900">{displayDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Khung giờ:</span>
                <span className="font-semibold text-gray-900">🕒 {selectedSlot}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-500 font-medium">Trạng thái:</span>
                <span className="font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full text-xs">
                  ⏳ PENDING — Chờ xác nhận
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full pt-1">
              {onGoToMyBookings && (
                <button
                  onClick={() => { onClose(); onGoToMyBookings(); }}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition-all"
                >
                  📋 Xem Lịch Hẹn Của Tôi
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ── Step Progress ── */}
            <div className="px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
              <StepIndicator steps={STEPS} currentStep={step} />
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto">

              {/* Property mini-card */}
              <div className="mx-5 mt-5 flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 items-center shrink-0">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{property.title}</h4>
                  <div className="text-red-600 font-black text-sm mt-0.5">{property.priceText}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <span>📍</span>
                    <span className="line-clamp-1">{property.district}, {property.city}</span>
                  </div>
                </div>
              </div>

              {/* ─── STEP 1: Choose Date ─── */}
              {step === 0 && (
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Chọn ngày xem nhà *
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setDateError(null);
                      }}
                      className={`w-full border rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                        dateError ? "border-red-400 bg-red-50" : "border-gray-300"
                      }`}
                    />
                    <FieldError message={dateError} />
                  </div>

                  {/* Sales info */}
                  <div className="flex items-center gap-3 p-3.5 bg-red-50 rounded-xl border border-red-100">
                    <img
                      src={property.assignedSale.avatar}
                      alt={property.assignedSale.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-red-300 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                        {property.assignedSale.name}
                        <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold">Sale</span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        Hotline: <strong className="text-red-600">{property.assignedSale.phone}</strong>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-amber-600 shrink-0">
                      ★ {property.assignedSale.rating}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-800 flex items-start gap-2">
                    <span className="shrink-0">ℹ️</span>
                    <span>Bước tiếp theo bạn sẽ chọn khung giờ rảnh của chuyên viên trong ngày đã chọn.</span>
                  </div>
                </div>
              )}

              {/* ─── STEP 2: Choose Time Slot ─── */}
              {step === 1 && (
                <div className="p-5 space-y-4">
                  <div className="text-sm font-semibold text-gray-700 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
                    📅 {displayDate}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
                      Chọn khung giờ *
                    </label>

                    {isLoadingSlots ? (
                      <div className="flex flex-col items-center justify-center py-10 gap-3">
                        <LoadingSpinner size="md" />
                        <p className="text-xs text-gray-500">Đang tải ca rảnh...</p>
                      </div>
                    ) : slotError ? (
                      <div className="text-center py-8 space-y-3">
                        <p className="text-sm text-red-600 font-semibold">{slotError}</p>
                        <button
                          onClick={() => void loadSlots(selectedDate)}
                          className="text-xs font-bold text-red-600 underline"
                        >
                          Thử tải lại
                        </button>
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-center py-10 space-y-2 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-3xl">😕</span>
                        <p className="text-sm font-semibold text-gray-700">
                          Không có ca rảnh trong ngày này
                        </p>
                        <p className="text-xs text-gray-500">Vui lòng quay lại và chọn ngày khác.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {availableSlots.map((s) => {
                          const label = slotLabel(s);
                          const isSelected = selectedSlot === label;
                          return (
                            <button
                              key={s.id}
                              onClick={() => {
                                setSelectedSlot(label);
                                setSlotValidationError(null);
                              }}
                              className={`py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all ${
                                isSelected
                                  ? "border-red-600 bg-red-600 text-white shadow-md"
                                  : "border-gray-200 bg-white text-gray-700 hover:border-red-400 hover:bg-red-50"
                              }`}
                            >
                              🕒 {label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    <FieldError message={slotValidationError} />
                  </div>
                </div>
              )}

              {/* ─── STEP 3: Review & Confirm ─── */}
              {step === 2 && (
                <div className="p-5 space-y-4">
                  <h3 className="text-sm font-extrabold text-gray-800">Xác nhận thông tin đặt lịch</h3>

                  {/* Summary */}
                  <div className="bg-gray-50 rounded-xl border border-gray-200 divide-y divide-gray-200">
                    {[
                      { icon: "🏠", label: "Bất động sản", value: property.title },
                      { icon: "📅", label: "Ngày xem nhà", value: displayDate },
                      { icon: "🕒", label: "Khung giờ", value: selectedSlot },
                      { icon: "👔", label: "Chuyên viên", value: `${property.assignedSale.name} (${property.assignedSale.phone})` },
                    ].map((row) => (
                      <div key={row.label} className="flex gap-3 px-4 py-3 items-start">
                        <span className="text-base shrink-0 mt-0.5">{row.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-gray-500 font-medium">{row.label}</p>
                          <p className="text-sm font-semibold text-gray-900 line-clamp-2">{row.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Ghi chú cho Sales (tuỳ chọn)
                    </label>
                    <textarea
                      rows={3}
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      placeholder="VD: Tôi muốn xem hướng nắng buổi chiều, kiểm tra sổ đỏ..."
                      className="w-full border border-gray-300 rounded-xl p-3 text-sm font-medium focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 resize-none transition-all"
                    />
                  </div>

                  {submitError && <InlineAlert type="error" message={submitError} />}

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-start gap-2">
                    <span className="shrink-0">⚡</span>
                    <span><strong>Hệ thống đảm bảo:</strong> Chống trùng lịch 100% · Ghi log kiểm toán · Thông báo ngay đến Sales</span>
                  </div>
                </div>
              )}
            </div>

            {/* ── Footer buttons ── */}
            <div className="px-5 py-4 border-t border-gray-100 flex gap-2 shrink-0">
              {step > 0 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  ← Quay lại
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
              )}

              {step === 0 && (
                <button
                  onClick={handleNextFromStep1}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2.5 rounded-xl shadow-sm transition-all"
                >
                  Tiếp theo → Chọn giờ
                </button>
              )}

              {step === 1 && (
                <button
                  onClick={handleNextFromStep2}
                  disabled={isLoadingSlots}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-bold py-2.5 rounded-xl shadow-sm transition-all"
                >
                  Tiếp theo → Xác nhận
                </button>
              )}

              {step === 2 && (
                <button
                  onClick={() => void handleSubmit()}
                  disabled={isSubmitting}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-70 text-white text-sm font-bold py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" /> Đang gửi...
                    </>
                  ) : (
                    "🚀 Xác Nhận Đặt Lịch"
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
