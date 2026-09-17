import React, { useState } from "react";
import { Booking } from "../types/index.js";

// ─── Availability Types ───────────────────────────────────────────────────────
type DayKey = "T2" | "T3" | "T4" | "T5" | "T6" | "T7" | "CN";
type SlotKey = "sang" | "trua" | "chieu" | "toi";

interface SlotGrid {
  [day: string]: { [slot: string]: boolean };
}

const DAYS: { key: DayKey; label: string; date: string }[] = [
  { key: "T2", label: "Thứ 2", date: "15/09" },
  { key: "T3", label: "Thứ 3", date: "16/09" },
  { key: "T4", label: "Thứ 4", date: "17/09" },
  { key: "T5", label: "Thứ 5", date: "18/09" },
  { key: "T6", label: "Thứ 6", date: "19/09" },
  { key: "T7", label: "Thứ 7", date: "20/09" },
  { key: "CN", label: "CN", date: "21/09" },
];

const SLOTS: { key: SlotKey; label: string; time: string; color: string; bg: string; activeBg: string }[] = [
  { key: "sang",  label: "🌅 Sáng",  time: "08:30–11:30", color: "text-sky-700",    bg: "bg-sky-50 border-sky-200",    activeBg: "bg-sky-500 border-sky-600 text-white" },
  { key: "trua",  label: "☀️ Trưa",  time: "11:30–13:30", color: "text-amber-700",  bg: "bg-amber-50 border-amber-200",  activeBg: "bg-amber-400 border-amber-500 text-white" },
  { key: "chieu", label: "🌤 Chiều", time: "14:00–17:30", color: "text-violet-700", bg: "bg-violet-50 border-violet-200", activeBg: "bg-violet-600 border-violet-700 text-white" },
  { key: "toi",   label: "🌆 Tối",   time: "17:30–20:00", color: "text-rose-700",   bg: "bg-rose-50 border-rose-200",   activeBg: "bg-rose-500 border-rose-600 text-white" },
];

const buildDefaultSlots = (): SlotGrid => {
  const grid: SlotGrid = {};
  for (const day of DAYS) {
    grid[day.key] = {
      sang:  day.key !== "CN",
      trua:  false,
      chieu: day.key !== "T7" && day.key !== "CN",
      toi:   false,
    };
  }
  return grid;
};

interface SalesDashboardTabProps {
  bookings: Booking[];
  onConfirmBooking: (bookingId: string) => void;
  onRejectBooking: (bookingId: string, reason: string) => void;
  onCompleteBooking: (bookingId: string) => void;
}

export const SalesDashboardTab: React.FC<SalesDashboardTabProps> = ({
  bookings,
  onConfirmBooking,
  onRejectBooking,
  onCompleteBooking
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "pending" | "confirmed" | "availability">("overview");
  const [rejectModalId, setRejectModalId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [slots, setSlots] = useState<SlotGrid>(buildDefaultSlots);
  const [savedMsg, setSavedMsg] = useState(false);

  const toggleSlot = (day: DayKey, slot: SlotKey) => {
    setSlots((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: !prev[day][slot] },
    }));
  };

  const handleSaveAvailability = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  const totalOpenSlots = Object.values(slots).reduce(
    (sum, day) => sum + Object.values(day).filter(Boolean).length, 0
  );
  const totalHours = Math.round(totalOpenSlots * 2.5);

  const pendingBookings = bookings.filter((b) => b.status === "PENDING");
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED");

  const handleConfirmReject = () => {
    if (rejectModalId) {
      onRejectBooking(rejectModalId, rejectReason || "Trùng lịch tiếp khách VIP khác");
      setRejectModalId(null);
      setRejectReason("");
    }
  };

  return (
    <div className="sales-dashboard min-h-[calc(100vh-96px)] overflow-x-hidden bg-[#f7f7f8] flex flex-col md:flex-row text-[#202124]">
      {/* 1. LEFT SIDEBAR (Enterprise Style) */}
      <aside className="w-full md:w-[232px] md:fixed md:left-0 md:top-[96px] md:h-[calc(100vh-96px)] bg-white border-r border-[#e4e4e7] flex flex-col justify-between p-3 shrink-0 z-20">
        <div className="space-y-6">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-lg bg-[#111113] flex items-center justify-center text-white font-black text-lg">
              ⚡
            </div>
            <div>
                <div className="font-extrabold text-sm text-[#171719] tracking-tight">
                Sales Nexus
              </div>
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                REAL ESTATE HUB
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveSubTab("overview")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeSubTab === "overview"
                  ? "bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-600 shadow-2xs"
                  : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
                <span className="text-base">▦</span> Tổng Quan (Dashboard)
            </button>

            <button
              onClick={() => setActiveSubTab("pending")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeSubTab === "pending"
                  ? "bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-600 shadow-2xs"
                  : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">⏳</span> Lịch Chờ Duyệt
              </div>
              {pendingBookings.length > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {pendingBookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveSubTab("confirmed")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeSubTab === "confirmed"
                  ? "bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-600 shadow-2xs"
                  : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">📅</span> Lịch Đã Chốt
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {confirmedBookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab("availability")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeSubTab === "availability"
                  ? "bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-600 shadow-2xs"
                  : "hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-base">⏰</span> Ca Rảnh (Availability)
            </button>

            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all"
            >
              <span className="text-base">👥</span> Danh Bạ Khách Hàng
            </button>

            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all"
            >
              <span className="text-base">📈</span> Hiệu Suất (Reports)
            </button>
          </nav>
        </div>

        {/* Bottom Settings */}
        <div className="pt-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all">
            <span>⚙️</span> Cài Đặt Hệ Thống
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar with Breadcrumbs & Search */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Quản Lý Kinh Doanh</span>
            <span>›</span>
            <span>Chuyên Viên Tư Vấn</span>
            <span>›</span>
            <span className="font-bold text-slate-900">Trần Hải Đăng (Sale Lead)</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-slate-400">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm mã booking, tên khách, BĐS..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:border-blue-500 focus:outline-hidden w-48 sm:w-64 transition-all"
              />
            </div>

            {/* Notification & Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <button className="relative w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-sm">
                🔔
                {pendingBookings.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </button>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <main className="sales-content min-w-0 w-full md:ml-[232px] md:w-[calc(100%-232px)] p-4 sm:p-6 lg:p-7 space-y-6 overflow-y-auto">
          {/* A. Hero Banner Card (Exact style as reference image) */}
          <div className="bg-white rounded-xl p-5 border border-[#e4e4e7] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Badge Square Avatar */}
              <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-700 font-extrabold text-xl flex items-center justify-center shrink-0 shadow-inner">
                SL
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black text-slate-900">
                    Phân Khu Phụ Trách: Vinhomes Skylake & Cầu Giấy
                  </h1>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                  <span># SALE-101</span>
                  <span>•</span>
                  <span>👤 Trưởng nhóm: <strong>Trần Hải Đăng</strong></span>
                  <span>•</span>
                  <span>📅 Lịch tuần: 15/09/2026 - 21/09/2026</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSubTab("availability")}
                className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 transition-colors"
              >
                ⚙️ Cài Đặt Ca Rảnh
              </button>
            </div>
          </div>

          {/* B. Sub Tabs Navigation (Exact style as reference image) */}
          <div className="flex items-center gap-6 border-b border-slate-200 text-xs sm:text-sm font-bold text-slate-500">
            <button
              onClick={() => setActiveSubTab("overview")}
              className={`pb-3 transition-colors ${
                activeSubTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:text-slate-900"
              }`}
            >
              Tổng Quan (Overview)
            </button>
            <button
              onClick={() => setActiveSubTab("pending")}
              className={`pb-3 flex items-center gap-1.5 transition-colors ${
                activeSubTab === "pending"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:text-slate-900"
              }`}
            >
              Yêu Cầu Chờ Duyệt
              {pendingBookings.length > 0 && (
                <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full">
                  {pendingBookings.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveSubTab("confirmed")}
              className={`pb-3 transition-colors ${
                activeSubTab === "confirmed"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:text-slate-900"
              }`}
            >
              Lịch Đã Xác Nhận ({confirmedBookings.length})
            </button>
            <button
              onClick={() => setActiveSubTab("availability")}
              className={`pb-3 transition-colors ${
                activeSubTab === "availability"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "hover:text-slate-900"
              }`}
            >
              Ca Rảnh Của Tôi (My Capacity)
            </button>
          </div>

          {/* C. 4 KPI Metric Cards (Clean Enterprise Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>TỶ LỆ CHỐT LỊCH (ALLOCATION)</span>
                <span className="text-blue-600 text-sm">📊</span>
              </div>
              <div className="text-3xl font-black text-slate-900 mt-2">68%</div>
              <div className="text-[11px] text-slate-400 mt-1">Cao hơn tuần trước +12%</div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>GIỜ DẪN KHÁCH (TRACKED HOURS)</span>
                <span className="text-indigo-600 text-sm">⏱️</span>
              </div>
              <div className="text-3xl font-black text-slate-900 mt-2">36h</div>
              <div className="text-[11px] text-slate-400 mt-1">Tổng cộng trong tháng: 124h</div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>TRẠNG THÁI TRỰC CA (STATUS)</span>
                <span className="text-emerald-600 text-sm">📈</span>
              </div>
              <div className="text-2xl font-black text-emerald-600 mt-2">Sẵn Sàng</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">✓ On Track (Khung giờ rảnh)</div>
            </div>

            {/* Card 4 (With Progress Bar) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>TIẾN ĐỘ KPI THÁNG (GOAL)</span>
                <span className="text-blue-600 text-sm">🎯</span>
              </div>
              <div className="mt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">75%</span>
                  <span className="text-xs font-bold text-slate-500">15/20 Lượt</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 mt-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: "75%" }} />
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Còn 5 lượt đạt chỉ tiêu</div>
            </div>
          </div>

          {/* D. 2-COLUMN MAIN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns (Main Action Area) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Box 1: Project Overview & Agent Involvement */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Thông Tin Hoạt Động & Quy Trình Tiếp Đón
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Chuyên trách tiếp đón và tư vấn trực tiếp cho khách hàng quan tâm đến các dự án cao cấp khu vực <strong>Cầu Giấy và Nam Từ Liêm</strong>. Quy trình bao gồm: Tiếp nhận yêu cầu $\rightarrow$ Đối soát ca rảnh $\rightarrow$ Xác nhận lịch hẹn $\rightarrow$ Tiếp đón tại sảnh và dẫn khách xem nhà thực tế.
                </p>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Vai Trò Đảm Nhiệm</span>
                    <strong className="text-slate-900 font-bold mt-0.5 block">Chuyên Viên Tư Vấn Cấp Cao</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Phân Bổ Ca Rảnh</span>
                    <strong className="text-blue-600 font-bold mt-0.5 block">60% (24h / tuần)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Tổng Lượt Dẫn Khách</span>
                    <strong className="text-slate-900 font-bold mt-0.5 block">124 Lượt Xem</strong>
                  </div>
                </div>
              </div>

              {/* Box 2: Pending Bookings Action Box */}
              {(activeSubTab === "overview" || activeSubTab === "pending") && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                      Lịch Hẹn Cần Bạn Xử Lý Ngay ({pendingBookings.length})
                    </h3>
                    <span className="text-xs font-semibold text-slate-400">Yêu cầu thời gian thực</span>
                  </div>

                  {pendingBookings.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500">
                      ✓ Tuyệt vời! Hiện không có yêu cầu đặt lịch nào đang chờ phê duyệt.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingBookings.map((b) => (
                        <div
                          key={b.id}
                          className="bg-amber-50/40 border-2 border-amber-200 rounded-xl p-4 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-sm">
                                #{b.bookingCode}
                              </span>
                              <strong className="text-xs font-bold text-slate-900">{b.customerName}</strong>
                              <span className="text-xs text-slate-500">({b.customerPhone})</span>
                            </div>
                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                              📅 {b.bookingDate} ({b.timeSlot})
                            </span>
                          </div>

                          <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                            🏢 {b.propertyTitle}
                          </div>

                          {b.customerNote && (
                            <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-amber-100 italic">
                              "{b.customerNote}"
                            </div>
                          )}

                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              onClick={() => setRejectModalId(b.id)}
                              className="px-3.5 py-1.5 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold rounded-lg transition-colors"
                            >
                              ✕ Từ Chối
                            </button>
                            <button
                              onClick={() => onConfirmBooking(b.id)}
                              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-all"
                            >
                              ✓ Xác Nhận Tiếp Đón
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Box 3: Timeline / Schedule Gantt View (Exact style as reference image) */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Sơ Đồ Ca Rảnh & Tiến Trình Tiếp Đón (Schedule Timeline)
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">Hôm nay: Thứ 3 (15/09)</span>
                </div>

                {/* Timeline Grid Header */}
                <div className="grid grid-cols-4 text-xs font-bold text-slate-400 border-b border-slate-100 pb-2">
                  <div>Ca Sáng (08:30-11:30)</div>
                  <div>Trưa (11:30-13:30)</div>
                  <div>Ca Chiều (14:00-17:30)</div>
                  <div>Ca Tối (17:30-20:00)</div>
                </div>

                {/* Timeline Bars */}
                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Vinhomes Skylake S2</span>
                      <span className="text-blue-600 font-bold">08:30 - 10:00 (Đã chốt lịch)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden flex">
                      <div className="w-1/4 bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                        Nguyễn Văn Khách
                      </div>
                      <div className="w-1/4 bg-slate-200/60" />
                      <div className="w-1/4 bg-emerald-400/30 text-emerald-800 text-[10px] font-semibold flex items-center justify-center">
                        Ca rảnh trống
                      </div>
                      <div className="w-1/4 bg-slate-200/60" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Nhà Phố Thái Hà</span>
                      <span className="text-amber-600 font-bold">14:30 - 16:00 (Chờ duyệt)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden flex">
                      <div className="w-1/4 bg-slate-200/60" />
                      <div className="w-1/4 bg-slate-200/60" />
                      <div className="w-1/4 bg-amber-400 text-amber-900 text-[10px] font-bold flex items-center justify-center">
                        Chờ xác nhận
                      </div>
                      <div className="w-1/4 bg-slate-200/60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Widgets, Team & Customers List - Exact style as reference image) */}
            <div className="space-y-6">
              {/* Widget 1: System Integration Status */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <span>📡</span> Đồng Bộ Kênh Tiếp Đón
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    ● Linked
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Mã Nhân Viên:</span>
                    <strong className="text-slate-900">SALE-101</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Kênh Thông Báo:</span>
                    <strong className="text-slate-900">SMS & In-App Push</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Khu Vực Ưu Tiên:</span>
                    <strong className="text-blue-600">Cầu Giấy, Nam Từ Liêm</strong>
                  </div>
                </div>
              </div>

              {/* Widget 2: Customers & Team List (Exact style as reference image) */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Khách Hàng Tiếp Đón Gần Đây
                  </h4>
                  <span className="text-xs font-semibold text-slate-400">4 Khách</span>
                </div>

                <div className="space-y-3">
                  {/* Row 1 */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&q=80"
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                          Nguyễn Văn Khách
                          <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1 rounded-xs">VIP</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Xem Skylake • 18/09</div>
                      </div>
                    </div>
                    <a href="tel:0912345678" className="text-xs text-blue-600 font-bold hover:underline">
                      📞 Gọi
                    </a>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80"
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Hoàng Thu Trang
                        </div>
                        <div className="text-[11px] text-slate-500">Xem Thái Hà • 20/09</div>
                      </div>
                    </div>
                    <a href="tel:0988111222" className="text-xs text-blue-600 font-bold hover:underline">
                      📞 Gọi
                    </a>
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80"
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Đỗ Mạnh Cường
                        </div>
                        <div className="text-[11px] text-slate-500">Xem Starlake • 22/09</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                      Hoàn tất
                    </span>
                  </div>
                </div>

                <button className="w-full py-2 text-center text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition-colors">
                  Xem tất cả danh bạ khách hàng →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Reject Modal */}
      {rejectModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-slate-200">
            <h3 className="font-extrabold text-base text-slate-900">
              Lý do từ chối yêu cầu tiếp đón?
            </h3>
            <textarea
              rows={2}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="VD: Trùng lịch họp đột xuất, chủ nhà đi vắng..."
              className="w-full border border-slate-300 rounded-lg p-2.5 text-xs font-medium focus:border-blue-500 focus:outline-hidden"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectModalId(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg"
              >
                Xác Nhận Từ Chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
