import React from "react";
import { Property } from "../types/index.js";

interface PropertyCardProps {
  property: Property;
  onOpenBookingModal: (property: Property) => void;
  onViewDetails: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onOpenBookingModal,
  onViewDetails
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image Gallery Thumbnail Container */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {property.isVip && (
            <span className="bg-linear-to-r from-red-600 to-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
              ⭐ VIP Kim Cương
            </span>
          )}
          {property.hasFreeSlotToday && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
              ⚡ Lịch trống hôm nay
            </span>
          )}
        </div>

        {/* Photo count indicator */}
        <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
          📷 {property.images.length} ảnh
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title */}
          <h3
            onClick={() => onViewDetails(property)}
            className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {property.title}
          </h3>

          {/* Pricing Row (Batdongsan style) */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-red-600 font-extrabold text-lg sm:text-xl tracking-tight">
              {property.priceText}
            </span>
            <span className="text-gray-400 text-xs font-medium">
              • {property.unitPriceText}
            </span>
          </div>

          {/* Specifications Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-2.5 py-2 border-y border-gray-100 font-medium">
            <span className="flex items-center gap-1">
              📐 <strong>{property.area} m²</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              🛏️ <strong>{property.bedrooms} PN</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              🚿 <strong>{property.bathrooms} WC</strong>
            </span>
            {property.direction && (
              <>
                <span>•</span>
                <span className="text-gray-500">🧭 {property.direction}</span>
              </>
            )}
          </div>

          {/* Location */}
          <div className="flex items-start gap-1 text-xs text-gray-500 mt-2">
            <span className="text-red-500">📍</span>
            <span className="line-clamp-1">{property.address}, {property.district}, {property.city}</span>
          </div>
        </div>

        {/* Assigned Agent Box */}
        <div className="bg-slate-50 rounded-lg p-2.5 flex items-center justify-between border border-slate-100 mt-3">
          <div className="flex items-center gap-2">
            <img
              src={property.assignedSale.avatar}
              alt={property.assignedSale.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
            />
            <div>
              <div className="text-xs font-bold text-gray-800 leading-none flex items-center gap-1">
                {property.assignedSale.name}
                <span className="text-amber-500 text-[10px]">★ {property.assignedSale.rating}</span>
              </div>
              <div className="text-[10px] text-gray-500">Chuyên viên phụ trách</div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
              Ca rảnh: {property.assignedSale.availableSlots.length} slot
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => onViewDetails(property)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2.5 rounded-lg transition-colors text-center"
          >
            Xem Chi Tiết
          </button>
          <button
            onClick={() => onOpenBookingModal(property)}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-lg shadow-sm transition-all text-center flex items-center justify-center gap-1"
          >
            <span>📅</span> Đặt Lịch Ngay
          </button>
        </div>
      </div>
    </div>
  );
};
