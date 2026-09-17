import React, { useEffect, useState } from "react";
import { Booking } from "../types/index.js";
import { getMyAvailability, setMyAvailability } from "../services/availability.service.js";
import { StatusBadge, LoadingSpinner, EmptyState, InlineAlert } from "./UIStates.js";

// ─── Availability Types ────────────────────────────────────────────────────────
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
  { key: "CN", label: "CN",    date: "21/09" },
];

const SLOTS: { key: SlotKey; label: string; time: string; activeBg: string; inactiveBg: string }[] = [
  { key: "sang",  label: "🌅 Sáng",  time: "08:30–11:30", activeBg: "bg-sky-500 border-sky-600 text-white",       inactiveBg: "bg-sky-50 border-sky-200 text-sky-700" },
  { key: "trua",  label: "☀️ Trưa",  time: "11:30–13:30", activeBg: "bg-amber-400 border-amber-500 text-white",   inactiveBg: "bg-amber-50 border-amber-200 text-amber-700" },
  { key: "chieu", label: "🌤 Chiều", time: "14:00–17:30", activeBg: "bg-violet-600 border-violet-700 text-white", inactiveBg: "bg-violet-50 border-violet-200 text-violet-700" },
  { key: "toi",   label: "🌆 Tối",   time: "17:30–20:00", activeBg: "bg-rose-500 border-rose-600 text-white",     inactiveBg: "bg-rose-50 border-rose-200 text-rose-700" },
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
  onRejectBooking:  (bookingId: string, reason: string) => void;
  onCompleteBooking:(bookingId: string) => void;
}

type SubTab = "overview" | "pending" | "confirmed" | "schedule" | "availability";

export const SalesDashboardTab: React.FC<SalesDashboardTabProps> = ({
  bookings,
  onConfirmBooking,
  onRejectBooking,
  onCompleteBooking,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("overview");
  const [rejectModalBooking, setRejectModalBooking] = useState<Booking | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [slots, setSlots] = useState<SlotGrid>(buildDefaultSlots);
  const [savedMsg, setSavedMsg] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await getMyAvailability();
        const slotTimes = new Map(SLOTS.map((s) => [s.key, s.time.replace("–", "-").replaceAll(" ", "").split("-")]));
        const next = buildDefaultSlots();
        for (const slot of saved) {
          const dayKey = DAYS.find(
            (d) => d.key === (["", "T2", "T3", "T4", "T5", "T6", "T7", "CN"] as const)[slot.dayOfWeek]
          )?.key;
          const match = SLOTS.find((item) => {
            const [start, end] = slotTimes.get(item.key) || [];
            return start === slot.startTime.slice(0, 5).replace(":", "") && end === slot.endTime.slice(0, 5).replace(":", "");
          });
          if (dayKey && match) next[dayKey][match.key] = true;
        }
        setSlots(next);
      } catch (err) {
        setAvailabilityError(err instanceof Error ? err.message : "Không thể tải ca rảnh.");
      }
    };
    void load();
  }, []);

  const toggleSlot = (day: DayKey, slot: SlotKey) => {
    setSlots((prev) => ({ ...prev, [day]: { ...prev[day], [slot]: !prev[day][slot] } }));
  };

  const handleSaveAvailability = async () => {
    setAvailabilityError(null);
    setIsSavingAvailability(true);
    try {
      const dayNumbers: Record<DayKey, number> = { T2: 1, T3: 2, T4: 3, T5: 4, T6: 5, T7: 6, CN: 7 };
      const payload = Object.entries(slots).flatMap(([day, daySlots]) =>
        Object.entries(daySlots)
          .filter(([, enabled]) => enabled)
          .map(([slotKey]) => {
            const s = SLOTS.find((item) => item.key === slotKey)!;
            const [st, en] = s.time.split("–");
            return { dayOfWeek: dayNumbers[day as DayKey], startTime: `${st.trim()}:00`, endTime: `${en.trim()}:00` };
          })
      );
      await setMyAvailability(payload);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    } catch (err) {
      setAvailabilityError(err instanceof Error ? err.message : "Không thể lưu ca rảnh.");
    } finally {
      setIsSavingAvailability(false);
    }
  };

  const pendingBookings   = bookings.filter((b) => b.status === "PENDING");
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED");

  const todayStr = new Date().toISOString().split("T")[0];
  const todayBookings = confirmedBookings
    .filter((b) => b.bookingDate === todayStr)
    .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

  const applySearch = (list: Booking[]) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (b) =>
        b.bookingCode.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.propertyTitle.toLowerCase().includes(q)
    );
  };

  const handleConfirmReject = () => {
    if (!rejectModalBooking) return;
    onRejectBooking(rejectModalBooking.id, rejectReason || "Trùng lịch tiếp khách khác");
    setRejectModalBooking(null);
    setRejectReason("");
  };

  const totalOpenSlots = Object.values(slots).reduce(
    (sum, day) => sum + Object.values(day).filter(Boolean).length, 0
  );

  // ── Booking Detail Panel (shared for sales) ──────────────────────────────────
  const BookingDetailPanel = ({ booking }: { booking: Booking }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">Chi Tiết Lịch Hẹn</h3>
            <p className="text-xs text-gray-500 mt-0.5">#{booking.bookingCode}</p>
          </div>
          <button
            onClick={() => setDetailBooking(null)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <StatusBadge status={booking.status} />

          {/* Property + Customer info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3.5 space-y-1.5">
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide">Khách hàng</p>
              <p className="font-bold text-sm text-gray-900">{booking.customerName}</p>
              <a href={`tel:${booking.customerPhone}`} className="text-xs font-bold text-red-600 hover:underline">
                📞 {booking.customerPhone}
              </a>
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5 space-y-1.5">
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide">Lịch xem nhà</p>
              <p className="font-bold text-sm text-gray-900">{booking.bookingDate}</p>
              <p className="text-xs text-gray-600">🕒 {booking.timeSlot}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3.5 space-y-1.5">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide">Bất động sản</p>
            <p className="font-bold text-sm text-gray-900">{booking.propertyTitle}</p>
            <p className="text-xs text-gray-500">📍 {booking.propertyAddress}</p>
          </div>

          {booking.customerNote && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5">
              <p className="text-[10px] font-extrabold text-blue-500 uppercase tracking-wide mb-1">Ghi chú từ khách</p>
              <p className="text-sm text-blue-900 italic">"{booking.customerNote}"</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="px-5 py-4 border-t border-gray-100 flex gap-2 shrink-0">
          {booking.status === "PENDING" && (
            <>
              <button
                onClick={() => { setRejectModalBooking(booking); setDetailBooking(null); }}
                className="flex-1 px-4 py-2.5 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-bold rounded-xl transition-colors"
              >
                ✕ Từ chối
              </button>
              <button
                onClick={() => { onConfirmBooking(booking.id); setDetailBooking(null); }}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all"
              >
                ✓ Xác nhận
              </button>
            </>
          )}
          {booking.status === "CONFIRMED" && (
            <>
              <button
                onClick={() => setDetailBooking(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Đóng
              </button>
              <button
                onClick={() => { onCompleteBooking(booking.id); setDetailBooking(null); }}
                className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all"
              >
                ★ Đã xem xong
              </button>
            </>
          )}
          {booking.status !== "PENDING" && booking.status !== "CONFIRMED" && (
            <button
              onClick={() => setDetailBooking(null)}
              className="flex-1 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Đóng
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="sales-dashboard min-h-[calc(100vh-96px)] bg-[#f7f7f8] flex flex-col md:flex-row text-[#202124]">
      {/* ── Sidebar ── */}
      <aside className="w-full md:w-[220px] md:fixed md:left-0 md:top-[96px] md:h-[calc(100vh-96px)] bg-white border-r border-[#e4e4e7] flex flex-col justify-between p-3 shrink-0 z-20">
        <div className="space-y-5">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-lg bg-[#111113] flex items-center justify-center text-white font-black text-lg">⚡</div>
            <div>
              <div className="font-extrabold text-sm text-[#171719]">Sales Nexus</div>
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">REAL ESTATE HUB</div>
            </div>
          </div>

          <nav className="space-y-0.5 text-xs font-semibold text-slate-600">
            {([
              { key: "overview",      icon: "▦",  label: "Tổng Quan",         badge: null },
              { key: "pending",       icon: "⏳", label: "Chờ Duyệt",          badge: pendingBookings.length > 0 ? pendingBookings.length : null },
              { key: "confirmed",     icon: "📅", label: "Đã Xác Nhận",       badge: confirmedBookings.length > 0 ? confirmedBookings.length : null },
              { key: "schedule",      icon: "🗓️", label: "Lịch Hôm Nay",     badge: todayBookings.length > 0 ? todayBookings.length : null },
              { key: "availability",  icon: "⏰", label: "Ca Rảnh Của Tôi",  badge: null },
            ] as { key: SubTab; icon: string; label: string; badge: number | null }[]).map(({ key, icon, label, badge }) => (
              <button
                key={key}
                onClick={() => setActiveSubTab(key)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeSubTab === key
                    ? "bg-blue-50 text-blue-600 font-bold border-r-4 border-blue-600"
                    : "hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{icon}</span>
                  {label}
                </div>
                {badge !== null && (
                  <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all">
            <span>⚙️</span> Cài Đặt
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-[220px]">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Quản Lý Kinh Doanh</span>
            <span>›</span>
            <span className="font-bold text-slate-900">Sales Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <span className="absolute left-3 top-2.5 text-xs text-slate-400">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm booking, khách, BĐS..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none w-56 transition-all"
              />
            </div>
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

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">

          {/* ── KPI Cards (always visible) ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Chờ duyệt",   value: pendingBookings.length,   color: "text-amber-600",   icon: "⏳", onClick: () => setActiveSubTab("pending") },
              { label: "Đã xác nhận", value: confirmedBookings.length,  color: "text-emerald-600", icon: "✓",  onClick: () => setActiveSubTab("confirmed") },
              { label: "Hoàn tất",    value: completedBookings.length,  color: "text-blue-600",    icon: "★",  onClick: undefined },
              { label: "Lịch hôm nay",value: todayBookings.length,      color: "text-violet-600",  icon: "🗓️", onClick: () => setActiveSubTab("schedule") },
            ].map((c) => (
              <button
                key={c.label}
                onClick={c.onClick}
                disabled={!c.onClick}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-left hover:border-blue-300 hover:shadow-md transition-all disabled:cursor-default"
              >
                <div className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
                  <span>{c.icon}</span> {c.label}
                </div>
                <div className={`text-3xl font-black mt-1.5 ${c.color}`}>{c.value}</div>
              </button>
            ))}
          </div>

          {/* ── Overview ── */}
          {activeSubTab === "overview" && (
            <div className="space-y-4">
              {/* Today quick summary */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  🗓️ Lịch Hôm Nay ({new Date().toLocaleDateString("vi-VN")})
                </h3>
                {todayBookings.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">Hôm nay chưa có lịch tiếp đón.</p>
                ) : (
                  <div className="space-y-2">
                    {todayBookings.slice(0, 3).map((b) => (
                      <div key={b.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="text-sm font-black text-blue-600 w-14 shrink-0">{b.timeSlot.split(" - ")[0]}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 line-clamp-1">{b.customerName}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{b.propertyTitle}</p>
                        </div>
                        <button
                          onClick={() => setDetailBooking(b)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0"
                        >
                          Xem
                        </button>
                      </div>
                    ))}
                    {todayBookings.length > 3 && (
                      <button onClick={() => setActiveSubTab("schedule")} className="w-full text-xs font-bold text-blue-600 text-center py-2 hover:underline">
                        Xem tất cả {todayBookings.length} lịch hôm nay →
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Pending highlight */}
              {pendingBookings.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-black text-lg shrink-0">
                    {pendingBookings.length}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-amber-900">Có {pendingBookings.length} yêu cầu đang chờ bạn xử lý</p>
                    <p className="text-xs text-amber-700">Hãy phê duyệt sớm để khách không phải chờ.</p>
                  </div>
                  <button
                    onClick={() => setActiveSubTab("pending")}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                  >
                    Xử lý ngay
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Pending ── */}
          {activeSubTab === "pending" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                  Lịch Hẹn Cần Xử Lý ({applySearch(pendingBookings).length})
                </h3>
              </div>

              {applySearch(pendingBookings).length === 0 ? (
                <EmptyState icon="✓" title="Tuyệt vời! Không còn yêu cầu nào chờ duyệt." />
              ) : (
                <div className="space-y-3">
                  {applySearch(pendingBookings).map((b) => (
                    <div key={b.id} className="border-2 border-amber-200 bg-amber-50/40 rounded-xl p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                            #{b.bookingCode}
                          </span>
                          <strong className="text-sm text-slate-900">{b.customerName}</strong>
                          <span className="text-xs text-slate-500">{b.customerPhone}</span>
                        </div>
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">
                          📅 {b.bookingDate} · {b.timeSlot}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 line-clamp-1">🏢 {b.propertyTitle}</p>
                      {b.customerNote && (
                        <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-amber-100 italic">
                          "{b.customerNote}"
                        </p>
                      )}
                      <div className="flex justify-between items-center pt-1">
                        <button
                          onClick={() => setDetailBooking(b)}
                          className="text-xs font-bold text-slate-600 underline hover:text-slate-900"
                        >
                          Xem chi tiết
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setRejectModalBooking(b)}
                            className="px-3.5 py-1.5 bg-white border border-rose-200 text-rose-700 text-xs font-bold rounded-lg hover:bg-rose-50 transition-colors"
                          >
                            ✕ Từ chối
                          </button>
                          <button
                            onClick={() => onConfirmBooking(b.id)}
                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-all"
                          >
                            ✓ Xác nhận
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Confirmed ── */}
          {activeSubTab === "confirmed" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <h3 className="font-extrabold text-base text-slate-900">
                Lịch Đã Xác Nhận ({applySearch(confirmedBookings).length})
              </h3>

              {applySearch(confirmedBookings).length === 0 ? (
                <EmptyState icon="📅" title="Chưa có lịch hẹn nào đã xác nhận." />
              ) : (
                <div className="space-y-3">
                  {applySearch(confirmedBookings).map((b) => (
                    <div key={b.id} className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md">
                            #{b.bookingCode}
                          </span>
                          <strong className="text-sm text-slate-900">{b.customerName}</strong>
                        </div>
                        <p className="text-xs text-slate-700 font-semibold line-clamp-1">🏢 {b.propertyTitle}</p>
                        <p className="text-xs text-slate-500">📅 {b.bookingDate} · {b.timeSlot}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setDetailBooking(b)}
                          className="px-3.5 py-1.5 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => onCompleteBooking(b.id)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-all"
                        >
                          ★ Hoàn tất
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Schedule (Today's Schedule) ── */}
          {activeSubTab === "schedule" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900">
                  🗓️ Lịch Hôm Nay — {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  {todayBookings.length} lịch tiếp đón
                </span>
              </div>

              {todayBookings.length === 0 ? (
                <EmptyState
                  icon="🌤️"
                  title="Hôm nay chưa có lịch tiếp đón"
                  description="Các lịch đã xác nhận cho hôm nay sẽ hiển thị ở đây."
                />
              ) : (
                <div className="divide-y divide-slate-100">
                  {todayBookings.map((b) => (
                    <div key={b.id} className="flex items-center gap-4 py-4">
                      {/* Time */}
                      <div className="text-center shrink-0 w-14">
                        <div className="text-lg font-black text-blue-600">{b.timeSlot.split(" - ")[0]}</div>
                        <div className="text-[10px] text-slate-400 font-medium">–{b.timeSlot.split(" - ")[1]}</div>
                      </div>

                      {/* Divider dot */}
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-slate-900">{b.customerName}</p>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          🏢 {b.propertyTitle}
                        </p>
                        <p className="text-xs text-slate-400">{b.customerPhone}</p>
                      </div>

                      {/* Action */}
                      <div className="flex flex-col gap-1.5 shrink-0">
                        <button
                          onClick={() => setDetailBooking(b)}
                          className="px-3.5 py-1.5 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => onCompleteBooking(b.id)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          ★ Xong
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Availability ── */}
          {activeSubTab === "availability" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Ca Rảnh Của Tôi</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Đang mở {totalOpenSlots} ca · Khách sẽ đặt theo ca rảnh này
                  </p>
                </div>
                <button
                  onClick={() => void handleSaveAvailability()}
                  disabled={isSavingAvailability}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2"
                >
                  {isSavingAvailability ? <LoadingSpinner size="sm" /> : null}
                  {savedMsg ? "✓ Đã lưu!" : "Lưu Ca Rảnh"}
                </button>
              </div>

              {availabilityError && <InlineAlert type="error" message={availabilityError} />}
              {savedMsg && <InlineAlert type="success" message="✓ Lịch ca rảnh đã được lưu thành công!" />}

              {/* Grid */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-bold text-slate-400 pb-2 pr-3 w-24">Ca / Ngày</th>
                      {DAYS.map((d) => (
                        <th key={d.key} className="text-center text-xs font-bold text-slate-600 pb-2 px-1">
                          <div>{d.label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{d.date}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {SLOTS.map((slot) => (
                      <tr key={slot.key}>
                        <td className="pr-3 py-1.5 align-middle">
                          <div className="text-xs font-bold text-slate-700">{slot.label}</div>
                          <div className="text-[10px] text-slate-400">{slot.time}</div>
                        </td>
                        {DAYS.map((day) => {
                          const active = slots[day.key]?.[slot.key] ?? false;
                          return (
                            <td key={day.key} className="text-center px-1 py-1.5">
                              <button
                                onClick={() => toggleSlot(day.key as DayKey, slot.key as SlotKey)}
                                className={`w-full py-2 rounded-lg border-2 text-[11px] font-bold transition-all ${
                                  active ? slot.activeBg : slot.inactiveBg
                                }`}
                              >
                                {active ? "✓" : "—"}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Booking Detail Panel ── */}
      {detailBooking && <BookingDetailPanel booking={detailBooking} />}

      {/* ── Reject Modal ── */}
      {rejectModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-lg shrink-0">✕</div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Lý do từ chối?</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Yêu cầu <strong>#{rejectModalBooking.bookingCode}</strong> của <strong>{rejectModalBooking.customerName}</strong>
                </p>
              </div>
            </div>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="VD: Trùng lịch họp đột xuất, chủ nhà đi vắng..."
              className="w-full border border-slate-300 rounded-xl p-3 text-sm font-medium focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none transition-all"
            />
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setRejectModalBooking(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmReject}
                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
