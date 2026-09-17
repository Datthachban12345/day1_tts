import React, { useState } from "react";
import { Booking, BookingStatus } from "../types/index.js";

interface MyBookingsTabProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string, reason: string) => void;
  onGetBookingDetail: (bookingId: string) => Promise<Booking>;
  onExploreMore: () => void;
}

export const MyBookingsTab: React.FC<MyBookingsTabProps> = ({
  bookings,
  onCancelBooking,
  onGetBookingDetail,
  onExploreMore
}) => {
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedBookingForHistory, setSelectedBookingForHistory] = useState<Booking | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === "ALL") return true;
    return b.status === filterStatus;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            ⏳ Đang chờ Sales xác nhận
          </span>
        );
      case "CONFIRMED":
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            ✓ Đã xác nhận lịch hẹn
          </span>
        );
      case "COMPLETED":
        return (
          <span className="bg-blue-100 text-blue-800 border border-blue-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            ★ Đã xem nhà hoàn tất
          </span>
        );
      case "CANCELLED":
        return (
          <span className="bg-gray-100 text-gray-700 border border-gray-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            ✕ Đã hủy lịch
          </span>
        );
      case "REJECTED":
        return (
          <span className="bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            ✕ Sales từ chối tiếp đón
          </span>
        );
    }
  };

  const handleConfirmCancel = () => {
    if (cancelModalBooking) {
      onCancelBooking(cancelModalBooking.id, cancelReason || "Khách hàng có lịch bận đột xuất");
      setCancelModalBooking(null);
      setCancelReason("");
    }
  };

  const handleOpenDetails = async (booking: Booking) => {
    setDetailError(null);
    setIsLoadingDetails(true);
    try {
      setSelectedBookingForHistory(await onGetBookingDetail(booking.id));
    } catch (error) {
      setDetailError(error instanceof Error ? error.message : "Không thể tải chi tiết booking.");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            📅 Quản Lý Lịch Hẹn Xem Nhà
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Theo dõi tiến trình tiếp đón, nhận thông báo thời gian thực và quản lý lịch sử đặt chỗ.
          </p>
        </div>

        <button
          onClick={onExploreMore}
          className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          + Đặt Thêm Lịch Xem Nhà
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-semibold">
        {[
          { label: "Tất cả lịch hẹn", value: "ALL" },
          { label: "Chờ xác nhận (PENDING)", value: "PENDING" },
          { label: "Đã xác nhận (CONFIRMED)", value: "CONFIRMED" },
          { label: "Đã hoàn thành (COMPLETED)", value: "COMPLETED" },
          { label: "Đã hủy (CANCELLED)", value: "CANCELLED" }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterStatus(tab.value)}
            className={`px-3.5 py-2 rounded-lg border transition-all ${
              filterStatus === tab.value
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-4">
          <div className="text-4xl">📭</div>
          <h3 className="text-base font-bold text-gray-800">Chưa có lịch hẹn nào phù hợp</h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            Bạn chưa có lịch xem nhà nào trong mục này. Hãy duyệt danh sách nhà đất và chọn thời gian phù hợp ngay!
          </p>
          <button
            onClick={onExploreMore}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all"
          >
            Khám Phá Nhà Đất Ngay
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center"
            >
              {/* Property Details */}
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={b.propertyImage}
                  alt={b.propertyTitle}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                />
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-sm">
                      #{b.bookingCode}
                    </span>
                    {getStatusBadge(b.status)}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-1">
                    {b.propertyTitle}
                  </h3>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <span>📍</span> {b.propertyAddress}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Giá BĐS: <strong className="text-red-600 font-bold">{b.propertyPrice}</strong>
                  </div>
                </div>
              </div>

              {/* Time Slot & Sales Staff Info */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 w-full lg:w-72 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Thời gian xem:</span>
                  <strong className="text-slate-900 font-bold">
                    📅 {b.bookingDate} ({b.timeSlot})
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Sale phụ trách:</span>
                  <span className="font-bold text-gray-800">{b.saleName}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500 font-medium">Hotline Sale:</span>
                  <strong className="text-red-600">{b.salePhone}</strong>
                </div>
                {b.customerNote && (
                  <div className="pt-1.5 border-t border-slate-200 text-[11px] text-gray-600 italic">
                    Ghi chú: "{b.customerNote}"
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex lg:flex-col gap-2 w-full lg:w-auto">
                <button
                  onClick={() => void handleOpenDetails(b)}
                  disabled={isLoadingDetails}
                  className="flex-1 lg:flex-none px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition-colors text-center"
                >
                  {isLoadingDetails ? "Đang tải..." : `📜 Chi Tiết Booking (${b.history.length})`}
                </button>

                {(b.status === "PENDING" || b.status === "CONFIRMED") && (
                  <button
                    onClick={() => setCancelModalBooking(b)}
                    className="flex-1 lg:flex-none px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-lg transition-colors text-center"
                  >
                    ✕ Hủy Lịch Hẹn
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History Modal (Audit Log Timeline) */}
      {detailError && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
          {detailError}
        </div>
      )}
      {selectedBookingForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-gray-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                📜 Lịch Sử Biến Động Lịch Hẹn #{selectedBookingForHistory.bookingCode}
              </h3>
              <button
                onClick={() => setSelectedBookingForHistory(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {selectedBookingForHistory.history.map((h, idx) => (
                <div key={h.id} className="relative pl-6 border-l-2 border-red-500 space-y-1">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-red-600 ring-4 ring-white" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800">
                      Chuyển sang: <span className="text-red-600">{h.newStatus}</span>
                    </span>
                    <span className="text-gray-400">{h.timestamp}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Thực hiện bởi: <strong>{h.actorName}</strong> ({h.actorRole})
                  </div>
                  {h.reason && (
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md italic border border-gray-100">
                      Lý do: {h.reason}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedBookingForHistory(null)}
              className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-gray-100">
            <h3 className="font-extrabold text-base text-gray-900">
              Xác nhận hủy lịch hẹn #{cancelModalBooking.bookingCode}?
            </h3>
            <p className="text-xs text-gray-600">
              Lịch hẹn tại <strong>{cancelModalBooking.propertyTitle}</strong> vào ngày <strong>{cancelModalBooking.bookingDate}</strong> sẽ bị hủy.
            </p>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Lý do hủy lịch:
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="VD: Trùng lịch công tác, gia đình có việc bận..."
                className="w-full border border-gray-300 rounded-lg p-2 text-xs font-medium focus:border-red-500 focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCancelModalBooking(null)}
                className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Không, giữ lịch
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-xs"
              >
                Xác nhận Hủy Lịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
