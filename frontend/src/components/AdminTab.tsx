import React, { useState } from "react";
import { Booking, Property } from "../types/index.js";
import { AdminUser } from "../services/admin.service.js";
import { StatusBadge, EmptyState, InlineAlert, LoadingSpinner } from "./UIStates.js";

interface AdminTabProps {
  properties: Property[];
  bookings: Booking[];
  users: AdminUser[];
  onToggleUserStatus: (user: AdminUser) => Promise<void>;
  onCreateProperty: (data: {
    title: string;
    property_type: "APARTMENT" | "HOUSE" | "VILLA" | "TOWNHOUSE";
    price: number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    address: string;
    district: string;
    city: string;
  }) => Promise<void>;
}

type Section = "overview" | "users" | "roles" | "properties" | "bookings";

const ROLE_COLORS: Record<string, string> = {
  CUSTOMER: "bg-blue-100 text-blue-800",
  SALE:     "bg-violet-100 text-violet-800",
  ADMIN:    "bg-amber-100 text-amber-800",
};

export const AdminTab: React.FC<AdminTabProps> = ({
  properties,
  bookings,
  users,
  onToggleUserStatus,
  onCreateProperty,
}) => {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [showCreateProperty, setShowCreateProperty] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [togglingUserId, setTogglingUserId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingFilter, setBookingFilter] = useState("ALL");
  const [userSearch, setUserSearch] = useState("");

  const [propertyForm, setPropertyForm] = useState({
    title: "",
    property_type: "APARTMENT" as const,
    price: "",
    area: "",
    bedrooms: "2",
    bathrooms: "1",
    address: "",
    district: "",
    city: "Hà Nội",
  });

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setCreateError(null);
    try {
      await onCreateProperty({
        ...propertyForm,
        price: Number(propertyForm.price),
        area: Number(propertyForm.area),
        bedrooms: Number(propertyForm.bedrooms),
        bathrooms: Number(propertyForm.bathrooms),
      });
      setShowCreateProperty(false);
      setPropertyForm({ title: "", property_type: "APARTMENT", price: "", area: "", bedrooms: "2", bathrooms: "1", address: "", district: "", city: "Hà Nội" });
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Không thể tạo bất động sản.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleUser = async (user: AdminUser) => {
    setTogglingUserId(user.id);
    try {
      await onToggleUserStatus(user);
    } finally {
      setTogglingUserId(null);
    }
  };

  const filteredBookings = bookings.filter((b) => bookingFilter === "ALL" || b.status === bookingFilter);
  const filteredUsers = users.filter((u) =>
    !userSearch || u.fullName.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const NAV_ITEMS: { key: Section; label: string; icon: string; count?: number }[] = [
    { key: "overview",   label: "Dashboard",   icon: "▦" },
    { key: "users",      label: "Users",        icon: "👥", count: users.length },
    { key: "roles",      label: "Roles",        icon: "🔑" },
    { key: "properties", label: "Properties",   icon: "🏢", count: properties.length },
    { key: "bookings",   label: "Bookings",     icon: "📋", count: bookings.length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* ── Header ── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2">
            👑 Administrator Portal
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold">Quản Trị Hệ Thống</h1>
          <p className="text-sm text-slate-300 mt-1">
            Quản lý tài khoản · Bất động sản · Lịch hẹn · Audit trail
          </p>
        </div>
        <button
          onClick={() => { setActiveSection("properties"); setShowCreateProperty(true); }}
          className="bg-amber-500 hover:bg-amber-400 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
        >
          + Thêm Bất Động Sản
        </button>
      </div>

      {/* ── Nav ── */}
      <nav className="flex flex-wrap gap-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
              activeSection === item.key
                ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-amber-400 hover:text-amber-700"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
            {item.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                activeSection === item.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
              }`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* ── Overview ── */}
      {activeSection === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Tổng BĐS",      value: properties.length,                                                                   color: "text-slate-900",   icon: "🏢" },
              { label: "Tổng lịch hẹn", value: bookings.length,                                                                     color: "text-red-600",     icon: "📋" },
              { label: "Đã xác nhận",   value: bookings.filter((b) => b.status === "CONFIRMED" || b.status === "COMPLETED").length, color: "text-emerald-600", icon: "✓" },
              { label: "Người dùng",    value: users.length,                                                                         color: "text-blue-600",    icon: "👥" },
            ].map((c) => (
              <div key={c.label} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
                <div className="text-gray-400 text-xs font-bold flex items-center gap-1.5">{c.icon} {c.label}</div>
                <div className={`text-3xl font-black mt-2 ${c.color}`}>{c.value}</div>
              </div>
            ))}
          </div>

          {/* Booking status breakdown */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h3 className="text-sm font-extrabold text-gray-800">Phân bổ trạng thái lịch hẹn</h3>
            <div className="space-y-2">
              {(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "REJECTED"] as const).map((status) => {
                const count = bookings.filter((b) => b.status === status).length;
                const pct = bookings.length > 0 ? Math.round((count / bookings.length) * 100) : 0;
                const barColor: Record<string, string> = {
                  PENDING: "bg-amber-400", CONFIRMED: "bg-blue-500", COMPLETED: "bg-emerald-500",
                  CANCELLED: "bg-gray-400", REJECTED: "bg-rose-500",
                };
                return (
                  <div key={status} className="flex items-center gap-3 text-xs">
                    <span className="w-24 font-semibold text-gray-600 shrink-0">{status}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`${barColor[status]} h-full rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-10 text-right font-bold text-gray-800">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Users ── */}
      {activeSection === "users" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-extrabold text-gray-900">Quản Lý Người Dùng</h2>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Tìm theo tên, email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-amber-400 w-52 transition-all"
              />
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <EmptyState icon="👥" title="Không tìm thấy người dùng nào." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {["Người dùng", "Email", "Role", "Trạng thái", "Thao tác"].map((h) => (
                      <th key={h} className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-black text-slate-600 shrink-0">
                            {user.fullName.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-900">{user.fullName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-600">{user.email}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ROLE_COLORS[user.role] ?? "bg-gray-100 text-gray-700"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${user.isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
                          {user.isActive ? "● Active" : "○ Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => void handleToggleUser(user)}
                          disabled={togglingUserId === user.id}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all disabled:opacity-60 ${
                            user.isActive
                              ? "border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100"
                              : "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                          }`}
                        >
                          {togglingUserId === user.id ? <LoadingSpinner size="sm" /> : null}
                          {user.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Roles ── */}
      {activeSection === "roles" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { role: "CUSTOMER", icon: "👤", desc: "Khách hàng tìm kiếm và đặt lịch xem BĐS.", color: "border-blue-200 bg-blue-50", badge: "bg-blue-600" },
            { role: "SALE",     icon: "👔", desc: "Chuyên viên tư vấn xác nhận/từ chối lịch hẹn.", color: "border-violet-200 bg-violet-50", badge: "bg-violet-600" },
            { role: "ADMIN",    icon: "👑", desc: "Quản trị viên toàn quyền trên hệ thống.", color: "border-amber-200 bg-amber-50", badge: "bg-amber-600" },
          ].map(({ role, icon, desc, color, badge }) => (
            <div key={role} className={`rounded-2xl border p-5 space-y-3 ${color}`}>
              <div className={`w-10 h-10 rounded-xl ${badge} flex items-center justify-center text-white text-lg`}>
                {icon}
              </div>
              <div>
                <div className="font-extrabold text-lg text-gray-900">{role}</div>
                <p className="text-xs text-gray-600 mt-1">{desc}</p>
              </div>
              <div className="text-[11px] text-gray-500 bg-white/70 rounded-lg px-2.5 py-1.5 border border-white">
                🔒 Bảo vệ bởi RBAC · Không thể xóa
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Properties ── */}
      {activeSection === "properties" && (
        <div className="space-y-4">
          {/* Create form */}
          {showCreateProperty && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-gray-900">Thêm Bất Động Sản Mới</h3>
                <button onClick={() => setShowCreateProperty(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
              </div>

              {createError && <InlineAlert type="error" message={createError} />}

              <form onSubmit={(e) => void handleCreateProperty(e)} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input required placeholder="Tên bất động sản *" value={propertyForm.title}
                  onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                  className="sm:col-span-2 rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-all" />
                <select value={propertyForm.property_type}
                  onChange={(e) => setPropertyForm({ ...propertyForm, property_type: e.target.value as typeof propertyForm.property_type })}
                  className="rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-amber-500 transition-all">
                  <option value="APARTMENT">Căn hộ</option>
                  <option value="HOUSE">Nhà riêng</option>
                  <option value="VILLA">Biệt thự</option>
                  <option value="TOWNHOUSE">Nhà phố</option>
                </select>
                <input required type="number" min="1" placeholder="Giá (VNĐ) *" value={propertyForm.price}
                  onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                  className="rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-all" />
                <input required type="number" min="1" placeholder="Diện tích (m²) *" value={propertyForm.area}
                  onChange={(e) => setPropertyForm({ ...propertyForm, area: e.target.value })}
                  className="rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-all" />
                <input required placeholder="Địa chỉ *" value={propertyForm.address}
                  onChange={(e) => setPropertyForm({ ...propertyForm, address: e.target.value })}
                  className="rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-all" />
                <input required placeholder="Quận / Huyện *" value={propertyForm.district}
                  onChange={(e) => setPropertyForm({ ...propertyForm, district: e.target.value })}
                  className="rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-all" />
                <div className="sm:col-span-2 flex gap-2 pt-1">
                  <button type="submit" disabled={isCreating}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-70 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center gap-2">
                    {isCreating ? <LoadingSpinner size="sm" /> : null}
                    Tạo Bất Động Sản
                  </button>
                  <button type="button" onClick={() => setShowCreateProperty(false)}
                    className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-extrabold text-gray-900">Danh Sách Bất Động Sản ({properties.length})</h2>
              <button
                onClick={() => setShowCreateProperty(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                + Thêm mới
              </button>
            </div>

            {properties.length === 0 ? (
              <EmptyState icon="🏢" title="Chưa có bất động sản nào." action={{ label: "Thêm ngay", onClick: () => setShowCreateProperty(true) }} />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {["Bất động sản", "Loại", "Giá", "Khu vực", "Sale phụ trách", "Trạng thái"].map((h) => (
                        <th key={h} className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {properties.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                            <div>
                              <p className="font-semibold text-gray-900 line-clamp-1 text-xs">{p.title}</p>
                              <p className="text-[11px] text-gray-500">{p.area} m²</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-gray-600 font-medium">{p.propertyType}</td>
                        <td className="px-4 py-3.5 font-bold text-red-600 text-sm">{p.priceText}</td>
                        <td className="px-4 py-3.5 text-xs text-gray-600">{p.district}, {p.city}</td>
                        <td className="px-4 py-3.5 text-xs font-semibold text-gray-800">{p.assignedSale.name}</td>
                        <td className="px-4 py-3.5">
                          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                            ● Available
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Bookings ── */}
      {activeSection === "bookings" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-extrabold text-gray-900">Quản Lý Lịch Hẹn ({filteredBookings.length})</h2>
            <div className="flex flex-wrap gap-2">
              {(["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setBookingFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    bookingFilter === s
                      ? "bg-amber-600 text-white border-amber-600"
                      : "border-gray-200 text-gray-600 hover:border-amber-400 bg-white"
                  }`}
                >
                  {s === "ALL" ? "Tất cả" : s}
                </button>
              ))}
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <EmptyState icon="📋" title="Không có lịch hẹn nào." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {["Mã booking", "Khách hàng", "Bất động sản", "Sales", "Ngày / Giờ", "Trạng thái"].map((h) => (
                      <th key={h} className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className="hover:bg-amber-50/60 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-gray-800">#{b.bookingCode}</td>
                      <td className="px-4 py-3.5">
                        <p className="font-semibold text-gray-900 text-xs">{b.customerName}</p>
                        <p className="text-[11px] text-gray-500">{b.customerPhone}</p>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-gray-700 font-medium line-clamp-1 max-w-[160px]">{b.propertyTitle}</td>
                      <td className="px-4 py-3.5 text-xs text-gray-600">{b.saleName}</td>
                      <td className="px-4 py-3.5 text-xs text-gray-700">
                        <p className="font-semibold">{b.bookingDate}</p>
                        <p className="text-gray-500">{b.timeSlot}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={b.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Booking Detail Modal (read-only for admin) ── */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-gray-900">Chi Tiết Lịch Hẹn</h3>
                <p className="text-xs text-gray-500">#{selectedBooking.bookingCode}</p>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold transition-colors">✕</button>
            </div>
            <StatusBadge status={selectedBooking.status} />
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: "Khách hàng", value: selectedBooking.customerName },
                { label: "SĐT khách",  value: selectedBooking.customerPhone },
                { label: "BĐS",        value: selectedBooking.propertyTitle },
                { label: "Sales",      value: selectedBooking.saleName },
                { label: "Ngày xem",   value: selectedBooking.bookingDate },
                { label: "Khung giờ",  value: selectedBooking.timeSlot },
              ].map((r) => (
                <div key={r.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-400 font-medium text-[10px] uppercase">{r.label}</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{r.value}</p>
                </div>
              ))}
            </div>
            {selectedBooking.customerNote && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs italic text-blue-900">
                Ghi chú: "{selectedBooking.customerNote}"
              </div>
            )}
            <button onClick={() => setSelectedBooking(null)} className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors">
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 space-y-4">
            <h3 className="font-extrabold text-base text-gray-900">Xác nhận xóa?</h3>
            <p className="text-sm text-gray-600">Hành động này không thể hoàn tác.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50">Hủy</button>
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-2.5 bg-rose-600 text-white text-sm font-bold rounded-xl hover:bg-rose-700">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
