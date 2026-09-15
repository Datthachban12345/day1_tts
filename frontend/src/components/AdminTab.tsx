import React from "react";
import { Booking, Property } from "../types/index.js";

interface AdminTabProps {
  properties: Property[];
  bookings: Booking[];
}

export const AdminTab: React.FC<AdminTabProps> = ({ properties, bookings }) => {
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

        <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all">
          + Thêm Bất Động Sản Mới
        </button>
      </div>

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

      {/* Properties Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden space-y-4 p-5">
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
      </div>
    </div>
  );
};
