import React from "react";

interface HeroSearchProps {
  searchTerm: string;
  onSearchTermChange: (val: string) => void;
  selectedCity: string;
  onCityChange: (val: string) => void;
  selectedDistrict: string;
  onDistrictChange: (val: string) => void;
  selectedType: string;
  onTypeChange: (val: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (val: string) => void;
  selectedBedrooms: string;
  onBedroomsChange: (val: string) => void;
  onResetFilters: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchTerm,
  onSearchTermChange,
  selectedDistrict,
  onDistrictChange,
  selectedType,
  onTypeChange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedBedrooms,
  onBedroomsChange,
  onResetFilters
}) => {
  return (
    <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
            <span>✨</span> Tìm Nhà Ưng Ý - Đặt Lịch Xem Trực Tuyến Tức Thì
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Khám Phá <span className="text-red-500">10,000+</span> Bất Động Sản & Đặt Lịch Xem Nhà
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Kết nối trực tiếp với chuyên viên tư vấn. Không lo trùng lịch, xác nhận tức thì, hỗ trợ xem nhà 24/7.
          </p>
        </div>

        {/* Search Engine Card */}
        <div className="bg-white text-gray-800 rounded-2xl p-4 sm:p-5 shadow-2xl border border-gray-100 text-left">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4 text-xs sm:text-sm font-bold">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-sm">
              🏢 Nhà Đất Bán & Cho Thuê
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              ⚡ Có Lịch Xem Trống Hôm Nay
            </button>
            <button
              onClick={onResetFilters}
              className="ml-auto text-xs text-gray-400 hover:text-red-600 transition-colors"
            >
              🔄 Đặt lại bộ lọc
            </button>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Keyword / Address input */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold text-gray-500 mb-1">
                TỪ KHÓA / DỰ ÁN / ĐỊA ĐIỂM
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchTermChange(e.target.value)}
                  placeholder="Nhập tên dự án, đường, quận..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-red-500 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {/* District dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1">
                QUẬN / HUYỆN (HÀ NỘI)
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => onDistrictChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-red-500 focus:outline-hidden"
              >
                <option value="ALL">Tất cả quận huyện</option>
                <option value="Nam Từ Liêm">Nam Từ Liêm</option>
                <option value="Cầu Giấy">Cầu Giấy</option>
                <option value="Đống Đa">Đống Đa</option>
                <option value="Bắc Từ Liêm">Bắc Từ Liêm</option>
                <option value="Hoàng Mai">Hoàng Mai</option>
                <option value="Tây Hồ">Tây Hồ</option>
                <option value="Thanh Xuân">Thanh Xuân</option>
              </select>
            </div>

            {/* Property type dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1">
                LOẠI BẤT ĐỘNG SẢN
              </label>
              <select
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-red-500 focus:outline-hidden"
              >
                <option value="ALL">Tất cả loại BĐS</option>
                <option value="APARTMENT">Căn hộ chung cư</option>
                <option value="HOUSE">Nhà riêng / Nhà phố</option>
                <option value="VILLA">Biệt thự liền kề</option>
                <option value="TOWNHOUSE">Shophouse thương mại</option>
              </select>
            </div>

            {/* Price range dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1">
                MỨC GIÁ
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => onPriceRangeChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-red-500 focus:outline-hidden"
              >
                <option value="ALL">Tất cả mức giá</option>
                <option value="UNDER_5B">Dưới 5 Tỷ</option>
                <option value="5B_10B">5 Tỷ - 10 Tỷ</option>
                <option value="10B_20B">10 Tỷ - 20 Tỷ</option>
                <option value="OVER_20B">Trên 20 Tỷ</option>
              </select>
            </div>
          </div>

          {/* Quick tags bar */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-100 text-xs">
            <span className="font-semibold text-gray-500">Gợi ý nhanh:</span>
            <button
              onClick={() => {
                onDistrictChange("Cầu Giấy");
                onTypeChange("APARTMENT");
              }}
              className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
            >
              Chung cư Cầu Giấy
            </button>
            <button
              onClick={() => {
                onDistrictChange("Nam Từ Liêm");
                onTypeChange("APARTMENT");
              }}
              className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
            >
              Vinhomes Skylake
            </button>
            <button
              onClick={() => {
                onDistrictChange("Đống Đa");
                onTypeChange("HOUSE");
              }}
              className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
            >
              Nhà phố Đống Đa
            </button>
            <button
              onClick={() => {
                onTypeChange("VILLA");
              }}
              className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
            >
              Biệt thự Starlake
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
