import React from "react";
import { UserRole } from "../types/index.js";

interface NavbarProps {
  currentRole: UserRole;
  activeTab: "home" | "my-bookings" | "sales-dashboard" | "admin-portal";
  onTabChange: (tab: "home" | "my-bookings" | "sales-dashboard" | "admin-portal") => void;
  onLogout: () => void;
  bookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  activeTab,
  onTabChange,
  onLogout,
  bookingCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      {/* Top bar with quick info and role switcher */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span>🔥 Hệ thống Đặt lịch Xem nhà Trực tuyến #1 Việt Nam</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">📞 Hotline: <strong className="text-red-400">1900 1888</strong> (8:00 - 21:00)</span>
          </div>

          {/* Current role */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Chế độ xem (Role):</span>
            <span className="bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 font-semibold text-white">
              {currentRole === "CUSTOMER" && "👤 Khách Hàng"}
              {currentRole === "SALE" && "👔 Nhân Viên Sales"}
              {currentRole === "ADMIN" && "👑 Quản Trị Viên"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => onTabChange("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:bg-red-700 transition-colors">
              B
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Batdongsan<span className="text-red-600">.booking</span>
                </span>
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  MVP
                </span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Kênh đặt lịch xem nhà trực tuyến hàng đầu
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            <button
              onClick={() => onTabChange("home")}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activeTab === "home"
                  ? "text-red-600 bg-red-50"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              🏠 Khám Phá Nhà Đất
            </button>
            {currentRole === "CUSTOMER" && (
              <button
              onClick={() => onTabChange("my-bookings")}
              className={`relative px-3.5 py-2 rounded-lg transition-colors ${
                activeTab === "my-bookings"
                  ? "text-red-600 bg-red-50"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              📅 Lịch Hẹn Của Tôi
              {bookingCount > 0 && (
                <span className="ml-1.5 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookingCount}
                </span>
              )}
              </button>
            )}
            {currentRole === "SALE" && (
              <button
                onClick={() => onTabChange("sales-dashboard")}
                className={`px-3.5 py-2 rounded-lg transition-colors ${
                  activeTab === "sales-dashboard"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                👔 Quản Lý Lịch Sales
              </button>
            )}
            {currentRole === "ADMIN" && (
              <button
                onClick={() => onTabChange("admin-portal")}
                className={`px-3.5 py-2 rounded-lg transition-colors ${
                  activeTab === "admin-portal"
                    ? "text-amber-600 bg-amber-50"
                    : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                }`}
              >
                👑 Quản Trị Hệ Thống
              </button>
            )}
          </nav>

          {/* User profile & CTA button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <img
                src={
                  currentRole === "CUSTOMER"
                    ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                    : currentRole === "SALE"
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80"
                }
                alt="Avatar"
                className="w-8 h-8 rounded-full ring-2 ring-red-500/20 object-cover"
              />
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-gray-800 leading-tight">
                  {currentRole === "CUSTOMER"
                    ? "Nguyễn Văn Khách"
                    : currentRole === "SALE"
                    ? "Trần Hải Đăng (Sale)"
                    : "Admin System"}
                </div>
                <div className="text-[10px] text-gray-500 font-medium">
                  {currentRole === "CUSTOMER"
                    ? "Khách hàng VIP"
                    : currentRole === "SALE"
                    ? "Chuyên viên tư vấn"
                    : "Toàn quyền quản trị"}
                </div>
              </div>
            </div>

            <button
              onClick={() => onTabChange("home")}
              className="hidden sm:inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition-all"
            >
              <span>+</span> Đăng Tin BĐS
            </button>
            <button
              onClick={onLogout}
              className="hidden sm:inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600 text-xs font-bold px-3.5 py-2 rounded-lg transition-all"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
