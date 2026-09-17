import React, { useState } from "react";
import { Booking, Property } from "../types/index.js";
import { AdminUser } from "../services/admin.service.js";

interface AdminTabProps {
  properties: Property[];
  bookings: Booking[];
  users: AdminUser[];
  onToggleUserStatus: (user: AdminUser) => Promise<void>;
  onCreateProperty: (data: { title: string; property_type: "APARTMENT" | "HOUSE" | "VILLA" | "TOWNHOUSE"; price: number; area: number; bedrooms: number; bathrooms: number; address: string; district: string; city: string }) => Promise<void>;
}

export const AdminTab: React.FC<AdminTabProps> = ({ properties, bookings, users, onToggleUserStatus, onCreateProperty }) => {
  const [activeSection, setActiveSection] = useState<"overview" | "users" | "roles" | "properties" | "bookings">("overview");
  const [showCreateProperty, setShowCreateProperty] = useState(false);
  const [propertyForm, setPropertyForm] = useState({ title: "", property_type: "APARTMENT" as const, price: "", area: "", bedrooms: "2", bathrooms: "1", address: "", district: "", city: "Hà Nội" });
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            👑 Cổng Quản Trị Hệ Thống (Administrator Portal)
          </div>
          <h1 className="text-2xl font-extrabold">Báo Cáo Hoạt Động & Giám Sát Toàn Sàn</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Quản lý tài khoản, danh mục bất động sản và toàn bộ lịch sử kiểm toán (Audit Trail).
          </p>
        </div>

        <button onClick={() => { setActiveSection("properties"); setShowCreateProperty(true); }} className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all">
          + Thêm Bất Động Sản Mới
        </button>
      </div>

      <nav className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 text-xs font-bold">
        {[
          ["overview", "Dashboard"], ["users", "Users"], ["roles", "Roles"], ["properties", "Properties"], ["bookings", "Bookings"]
        ].map(([value, label]) => (
          <button key={value} onClick={() => setActiveSection(value as typeof activeSection)} className={`rounded-lg px-3 py-2 ${activeSection === value ? "bg-amber-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
            {label}
          </button>
        ))}
      </nav>

      {activeSection === "overview" && <>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-gray-500 text-xs font-bold">TỔNG BẤT ĐỘNG SẢN</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{properties.length}</div>
          <div className="text-[11px] text-emerald-600 mt-1">✓ Đang hiển thị trực tuyến</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-gray-500 text-xs font-bold">TỔNG LƯỢT ĐẶT LỊCH</div>
          <div className="text-2xl font-black text-red-600 mt-1">{bookings.length}</div>
          <div className="text-[11px] text-gray-500 mt-1">Tất cả trạng thái</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-gray-500 text-xs font-bold">LỊCH ĐÃ XÁC NHẬN</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {bookings.filter((b) => b.status === "CONFIRMED" || b.status === "COMPLETED").length}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">Tỷ lệ thành công cao</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-gray-500 text-xs font-bold">CHUYÊN VIÊN SALES</div>
          <div className="text-2xl font-black text-blue-600 mt-1">3</div>
          <div className="text-[11px] text-blue-600 mt-1">Đang trực ca rảnh</div>
        </div>
      </div>
      </>}

      {activeSection === "users" && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
          <h2 className="mb-4 text-base font-extrabold">User Management</h2>
          <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="border-b bg-slate-50 text-gray-500"><tr><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Status</th><th className="p-3">Action</th></tr></thead><tbody className="divide-y divide-gray-100">{users.map((user) => <tr key={user.id}><td className="p-3"><strong>{user.fullName}</strong><div className="text-gray-500">{user.email}</div></td><td className="p-3">{user.role}</td><td className="p-3">{user.isActive ? "ACTIVE" : "INACTIVE"}</td><td className="p-3"><button onClick={() => void onToggleUserStatus(user)} className="rounded-lg border border-gray-200 px-3 py-1.5 font-bold hover:border-amber-500">{user.isActive ? "Deactivate" : "Activate"}</button></td></tr>)}</tbody></table></div>
        </section>
      )}

      {activeSection === "roles" && (
        <section className="grid gap-3 sm:grid-cols-3">{["CUSTOMER", "SALE", "ADMIN"].map((role) => <div key={role} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs"><div className="text-xs font-bold text-gray-500">SYSTEM ROLE</div><div className="mt-2 text-lg font-black">{role}</div><p className="mt-1 text-xs text-gray-500">Role được bảo vệ bởi backend RBAC.</p></div>)}</section>
      )}

      {activeSection === "bookings" && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs"><h2 className="mb-4 text-base font-extrabold">Booking Management</h2><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="border-b bg-slate-50 text-gray-500"><tr><th className="p-3">Booking</th><th className="p-3">Property</th><th className="p-3">Date</th><th className="p-3">Status</th></tr></thead><tbody className="divide-y divide-gray-100">{bookings.map((booking) => <tr key={booking.id}><td className="p-3 font-mono">{booking.bookingCode}</td><td className="p-3">{booking.propertyTitle}</td><td className="p-3">{booking.bookingDate} {booking.timeSlot}</td><td className="p-3 font-bold">{booking.status}</td></tr>)}</tbody></table></div></section>
      )}

      {/* Properties Table */}
      {activeSection === "properties" &&
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden space-y-4 p-5">
        {showCreateProperty && <form onSubmit={async (event) => { event.preventDefault(); await onCreateProperty({ ...propertyForm, price: Number(propertyForm.price), area: Number(propertyForm.area), bedrooms: Number(propertyForm.bedrooms), bathrooms: Number(propertyForm.bathrooms) }); setShowCreateProperty(false); setPropertyForm({ title: "", property_type: "APARTMENT", price: "", area: "", bedrooms: "2", bathrooms: "1", address: "", district: "", city: "Hà Nội" }); }} className="grid gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:grid-cols-2">
          <input required placeholder="Tên bất động sản" value={propertyForm.title} onChange={(event) => setPropertyForm({ ...propertyForm, title: event.target.value })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs" />
          <select value={propertyForm.property_type} onChange={(event) => setPropertyForm({ ...propertyForm, property_type: event.target.value as typeof propertyForm.property_type })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs"><option value="APARTMENT">APARTMENT</option><option value="HOUSE">HOUSE</option><option value="VILLA">VILLA</option><option value="TOWNHOUSE">TOWNHOUSE</option></select>
          <input required type="number" min="1" placeholder="Giá" value={propertyForm.price} onChange={(event) => setPropertyForm({ ...propertyForm, price: event.target.value })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs" />
          <input required type="number" min="1" placeholder="Diện tích" value={propertyForm.area} onChange={(event) => setPropertyForm({ ...propertyForm, area: event.target.value })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs" />
          <input required placeholder="Địa chỉ" value={propertyForm.address} onChange={(event) => setPropertyForm({ ...propertyForm, address: event.target.value })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs" />
          <input required placeholder="Quận/Huyện" value={propertyForm.district} onChange={(event) => setPropertyForm({ ...propertyForm, district: event.target.value })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs" />
          <div className="flex gap-2 sm:col-span-2"><button type="submit" className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white">Tạo bất động sản</button><button type="button" onClick={() => setShowCreateProperty(false)} className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold">Hủy</button></div>
        </form>}
        <h3 className="font-extrabold text-base text-gray-900">
          🏢 Danh Sách Bất Động Sản Trong Hệ Thống
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-gray-200 text-gray-500 uppercase font-bold">
              <tr>
                <th className="p-3">BĐS</th>
                <th className="p-3">Loại</th>
                <th className="p-3">Mức Giá</th>
                <th className="p-3">Khu Vực</th>
                <th className="p-3">Sale Phụ Trách</th>
                <th className="p-3">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3 font-bold text-gray-900 flex items-center gap-2">
                    <img src={p.images[0]} alt="" className="w-10 h-10 rounded-md object-cover" />
                    <span className="line-clamp-1">{p.title}</span>
                  </td>
                  <td className="p-3 text-gray-600 font-medium">{p.propertyType}</td>
                  <td className="p-3 font-bold text-red-600">{p.priceText}</td>
                  <td className="p-3 text-gray-600">{p.district}, {p.city}</td>
                  <td className="p-3 font-semibold text-gray-800">{p.assignedSale.name}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-sm">
                      AVAILABLE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  );
};
