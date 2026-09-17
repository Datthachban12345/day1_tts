import React, { useState } from "react";
import { Booking, BookingStatus } from "../types/index.js";
import { StatusBadge, LoadingSpinner, EmptyState, ErrorState, InlineAlert } from "./UIStates.js";

interface MyBookingsTabProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string, reason: string) => void;
  onGetBookingDetail: (bookingId: string) => Promise<Booking>;
  onExploreMore: () => void;
}

type FilterStatus = "ALL" | BookingStatus;

const FILTER_TABS: { value: FilterStatus; label: string }[] = [
  { value: "ALL",       label: "Tất cả" },
  { value: "PENDING",   label: "Chờ xác nhận" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "COMPLETED", label: "Hoàn tất" },
  { value: "CANCELLED", label: "Đã hủy" },
];

const timelineStatusColor: Record<BookingStatus, string> = {
  PENDING:   "bg-amber-500",
  CONFIRMED: "bg-emerald-500",
  COMPLETED: "bg-blue-600",
  CANCELLED: "bg-gray-400",
  REJECTED:  "bg-rose-500",
};

export const MyBookingsTab: React.FC<MyBookingsTabProps> = ({
  bookings,
  onCancelBooking,
  onGetBookingDetail,
  onExploreMore,
}) => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const countFor = (status: FilterStatus) =>
    status === "ALL" ? bookings.length : bookings.filter((b) => b.status === status).length;

  const filtered = bookings.filter((b) =>
    filterStatus === "ALL" ? true : b.status === filterStatus
  );

  const handleOpenDetail = async (booking: Booking) => {
    setDetailError(null);
    setIsLoadingDetail(true);
    try {
      const detail = await onGetBookingDetail(booking.id);
      setSelectedBooking(detail);
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : "Không thể tải chi tiết lịch hẹn.");
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelModalBooking) return;
    setIsCancelling(true);
    setCancelError(null);
    try {
      await onCancelBooking(cancelModalBooking.id, cancelReason || "Khách hàng có lịch bận đột xuất");
      setCancelModalBooking(null);
      setCancelReason("");
    } catch (err) {
      setCancelError(err instanceof Error ? err.message : "Không thể hủy lịch. Vui lòng thử lại.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            📋 Lịch Hẹn Của Tôi
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Theo dõi tiến trình · Nhận thông báo thời gian thực · Lịch sử kiểm toán
          </p>
        </div>
        <button
          onClick={onExploreMore}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          + Đặt Thêm Lịch Xem Nhà
        </button>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => {
          const count = countFor(tab.value);
          const isActive = filterStatus === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setFilterStatus(tab.value)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              <span
                className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {detailError && (
        <InlineAlert type="error" message={detailError} onDismiss={() => setDetailError(null)} />
      )}

      {/* ── Bookings List ── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs">
          <EmptyState
            icon="📭"
            title="Chưa có lịch hẹn nào"
            description="Bạn chưa có lịch xem nhà nào trong mục này. Hãy khám phá danh sách BĐS và đặt lịch ngay!"
            action={{ label: "Khám Phá Nhà Đất Ngay", onClick: onExploreMore }}
          />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Property image */}
                <img
                  src={b.propertyImage}
                  alt={b.propertyTitle}
                  className="w-full sm:w-24 h-32 sm:h-24 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                      #{b.bookingCode}
                    </span>
                    <StatusBadge status={b.status} />
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-1">
                    {b.propertyTitle}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <span className="text-gray-400">📍</span>
                      <span className="line-clamp-1">{b.propertyAddress}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-gray-400">📅</span>
                      <strong>{b.bookingDate}</strong>
                      <span className="text-gray-500">({b.timeSlot})</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-gray-400">👔</span>
                      <span>{b.saleName}</span>
                      {b.salePhone && (
                        <a href={`tel:${b.salePhone}`} className="text-red-600 font-bold hover:underline">
                          {b.salePhone}
                        </a>
                      )}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-gray-400">💰</span>
                      <span className="font-semibold text-red-600">{b.propertyPrice}</span>
                    </span>
                  </div>

                  {b.customerNote && (
                    <p className="text-xs text-gray-500 italic bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      Ghi chú: "{b.customerNote}"
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => void handleOpenDetail(b)}
                    disabled={isLoadingDetail}
                    className="flex-1 sm:flex-none px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    {isLoadingDetail ? <LoadingSpinner size="sm" /> : "📜 Chi tiết"}
                  </button>
                  {(b.status === "PENDING" || b.status === "CONFIRMED") && (
                    <button
                      onClick={() => setCancelModalBooking(b)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition-colors"
                    >
                      ✕ Hủy lịch
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Booking Detail Modal ── */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-extrabold text-base text-gray-900">Chi Tiết Lịch Hẹn</h3>
                <p className="text-xs text-gray-500 mt-0.5">#{selectedBooking.bookingCode}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Info summary */}
            <div className="px-5 py-4 space-y-3 border-b border-gray-100 shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={selectedBooking.status} />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {[
                  { label: "Bất động sản", value: selectedBooking.propertyTitle },
                  { label: "Ngày xem", value: `${selectedBooking.bookingDate} (${selectedBooking.timeSlot})` },
                  { label: "Chuyên viên", value: selectedBooking.saleName },
                  { label: "Điện thoại Sales", value: selectedBooking.salePhone },
                ].map((r) => (
                  <div key={r.label}>
                    <p className="text-gray-400 font-medium">{r.label}</p>
                    <p className="font-semibold text-gray-900 line-clamp-2">{r.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wide mb-4">
                📜 Lịch sử trạng thái
              </p>

              {selectedBooking.history.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Chưa có lịch sử.</p>
              ) : (
                <div className="relative space-y-0">
                  {selectedBooking.history.map((h, idx) => (
                    <div key={h.id} className="flex gap-4 pb-6 relative">
                      {/* Vertical line */}
                      {idx < selectedBooking.history.length - 1 && (
                        <div className="absolute left-[13px] top-7 bottom-0 w-0.5 bg-gray-200" />
                      )}
                      {/* Dot */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 z-10 mt-0.5 ${
                          timelineStatusColor[h.newStatus] ?? "bg-gray-400"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="text-sm font-bold text-gray-900">
                            Chuyển sang: <span className="text-red-600">{h.newStatus}</span>
                          </span>
                          <span className="text-[11px] text-gray-400">{h.timestamp}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Bởi: <strong>{h.actorName}</strong>
                          <span className="text-gray-400"> ({h.actorRole})</span>
                        </p>
                        {h.reason && (
                          <div className="mt-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 italic">
                            Lý do: {h.reason}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-5 py-4 border-t border-gray-100 shrink-0">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Cancel Confirmation Modal ── */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-lg shrink-0">
                ✕
              </div>
              <div>
                <h3 className="font-extrabold text-base text-gray-900">
                  Hủy lịch hẹn?
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Lịch tại <strong>{cancelModalBooking.propertyTitle}</strong> ngày{" "}
                  <strong>{cancelModalBooking.bookingDate}</strong> sẽ bị hủy.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                Lý do hủy lịch
              </label>
              <textarea
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="VD: Trùng lịch công tác, gia đình có việc bận..."
                className="w-full border border-gray-300 rounded-xl p-3 text-sm font-medium focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 resize-none transition-all"
              />
            </div>

            {cancelError && <InlineAlert type="error" message={cancelError} />}

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => { setCancelModalBooking(null); setCancelError(null); }}
                disabled={isCancelling}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Không, giữ lịch
              </button>
              <button
                onClick={() => void handleConfirmCancel()}
                disabled={isCancelling}
                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-70 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {isCancelling ? <LoadingSpinner size="sm" /> : "Xác nhận hủy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
