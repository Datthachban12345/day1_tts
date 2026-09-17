import React, { useState } from "react";
import { Property } from "../types/index.js";

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
  onBook: (property: Property) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  onBook,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const typeLabel: Record<string, string> = {
    APARTMENT:  "Căn hộ",
    HOUSE:      "Nhà riêng",
    VILLA:      "Biệt thự",
    TOWNHOUSE:  "Nhà phố",
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* ── Sticky breadcrumb bar ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center gap-2 text-xs font-medium text-gray-500">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-red-600 font-bold hover:text-red-700 transition-colors"
          >
            ← Quay lại danh sách
          </button>
          <span>/</span>
          <span className="text-gray-700 truncate max-w-xs">{property.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ── Image Gallery ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 rounded-2xl overflow-hidden">
          {/* Main image */}
          <div className="lg:col-span-2 relative h-72 sm:h-96 bg-gray-200 overflow-hidden">
            <img
              src={property.images[activeImageIdx] ?? property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Overlay badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {property.isVip && (
                <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm">
                  ⭐ VIP Kim Cương
                </span>
              )}
              {property.hasFreeSlotToday && (
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  ⚡ Lịch trống hôm nay
                </span>
              )}
              <span className="bg-white/90 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                {typeLabel[property.propertyType] ?? property.propertyType}
              </span>
            </div>

            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
              📷 {activeImageIdx + 1} / {property.images.length}
            </div>

            {/* Nav arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIdx((i) => Math.max(0, i - 1))}
                  disabled={activeImageIdx === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center disabled:opacity-30 transition-all"
                >
                  ‹
                </button>
                <button
                  onClick={() => setActiveImageIdx((i) => Math.min(property.images.length - 1, i + 1))}
                  disabled={activeImageIdx === property.images.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center disabled:opacity-30 transition-all"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Thumbnails column */}
          <div className="hidden lg:flex flex-col gap-2 max-h-96 overflow-y-auto pr-0.5">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative h-[88px] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  idx === activeImageIdx
                    ? "border-red-600 shadow-md"
                    : "border-transparent hover:border-red-300"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Mobile: thumbnail strip */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-1">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === activeImageIdx ? "border-red-600" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: property info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title + Price */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug">
                {property.title}
              </h1>

              <div className="flex flex-wrap items-baseline gap-3 pt-1 border-t border-gray-100">
                <span className="text-red-600 font-black text-2xl sm:text-3xl tracking-tight">
                  {property.priceText}
                </span>
                <span className="text-gray-500 text-sm font-medium">
                  • {property.unitPriceText}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-red-500 mt-0.5 shrink-0">📍</span>
                <span>{property.address}, {property.district}, {property.city}</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
              <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-wide">
                Thông số bất động sản
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: "📐", label: "Diện tích", value: `${property.area} m²` },
                  { icon: "🛏️", label: "Phòng ngủ", value: `${property.bedrooms} phòng` },
                  { icon: "🚿", label: "Phòng tắm", value: `${property.bathrooms} phòng` },
                  { icon: "🧭", label: "Hướng nhà", value: property.direction ?? "Đông Nam" },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-3 text-center gap-1"
                  >
                    <span className="text-xl">{spec.icon}</span>
                    <span className="text-[11px] text-gray-500 font-medium">{spec.label}</span>
                    <span className="text-sm font-bold text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
              <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-wide">
                Mô tả chi tiết
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="space-y-4">
            {/* Sales Staff Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
              <h3 className="text-sm font-extrabold text-gray-800">Chuyên viên phụ trách</h3>

              <div className="flex items-center gap-3">
                <img
                  src={property.assignedSale.avatar}
                  alt={property.assignedSale.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-red-500/30"
                />
                <div>
                  <div className="font-bold text-gray-900 text-sm">{property.assignedSale.name}</div>
                  <div className="text-amber-500 text-xs font-semibold flex items-center gap-1">
                    {"★".repeat(Math.round(property.assignedSale.rating))} {property.assignedSale.rating}/5
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Chuyên viên tư vấn BĐS</div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Hotline tư vấn:</span>
                  <a
                    href={`tel:${property.assignedSale.phone}`}
                    className="font-bold text-red-600 hover:underline"
                  >
                    {property.assignedSale.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Ca rảnh khả dụng:</span>
                  <span className="font-bold text-emerald-700">
                    {property.assignedSale.availableSlots.length} slot
                  </span>
                </div>
              </div>

              {/* Available slots */}
              {property.assignedSale.availableSlots.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Giờ trống hôm nay</p>
                  <div className="flex flex-wrap gap-1.5">
                    {property.assignedSale.availableSlots.map((slot) => (
                      <span
                        key={slot}
                        className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg"
                      >
                        🕒 {slot}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
              <button
                onClick={() => onBook(property)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
              >
                📅 Đặt Lịch Xem Nhà Ngay
              </button>
              <p className="text-[11px] text-center text-gray-500">
                ✓ Miễn phí • Xác nhận trong vòng 30 phút
              </p>
            </div>

            {/* Quick info */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                ℹ️ Lưu ý quan trọng
              </p>
              <ul className="text-[11px] text-amber-800 space-y-1 list-disc list-inside leading-relaxed">
                <li>Lịch hẹn được xác nhận 100% không trùng</li>
                <li>Nhận thông báo ngay khi Sales xác nhận</li>
                <li>Có thể hủy trước 2 giờ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky CTA ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-30">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex-1">
            <div className="text-red-600 font-black text-lg">{property.priceText}</div>
            <div className="text-xs text-gray-500">{property.unitPriceText}</div>
          </div>
          <button
            onClick={() => onBook(property)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl shadow-md text-sm transition-all"
          >
            📅 Đặt Lịch
          </button>
        </div>
      </div>
    </div>
  );
};
