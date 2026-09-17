import React, { useEffect, useState, useMemo } from "react";
import { Navbar } from "./components/Navbar.js";
import { HeroSearch } from "./components/HeroSearch.js";
import { PropertyCard } from "./components/PropertyCard.js";
import { BookingModal } from "./components/BookingModal.js";
import { MyBookingsTab } from "./components/MyBookingsTab.js";
import { SalesDashboardTab } from "./components/SalesDashboardTab.js";
import { AdminTab } from "./components/AdminTab.js";
import { AuthPage } from "./components/AuthPage.js";
import { Footer } from "./components/Footer.js";
import { Property, Booking, UserRole } from "./types/index.js";
import { createProperty, getProperties } from "./services/property.service.js";
import { createBooking, getAdminBookings, getBookingDetail, getCustomerBookings, getSaleBookings, updateBookingStatus } from "./services/booking.service.js";
import { getCurrentUser, logout } from "./services/auth.service.js";
import { AdminUser, getAdminUsers, updateAdminUserStatus } from "./services/admin.service.js";

const getRoleFromPath = (): UserRole => {
  if (window.location.pathname === "/sale") return "SALE";
  if (window.location.pathname === "/admin") return "ADMIN";
  return "CUSTOMER";
};

const getTabForRole = (role: UserRole): "home" | "my-bookings" | "sales-dashboard" | "admin-portal" => {
  if (role === "SALE") return "sales-dashboard";
  if (role === "ADMIN") return "admin-portal";
  return "home";
};

const getPathForRole = (role: UserRole) => role === "SALE" ? "/sale" : role === "ADMIN" ? "/admin" : "/customer";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const isAuthPage = currentPath === "/login" || currentPath === "/register";
  const [currentRole, setCurrentRole] = useState<UserRole>(getRoleFromPath);
  const [activeTab, setActiveTab] = useState<"home" | "my-bookings" | "sales-dashboard" | "admin-portal">(() =>
    getTabForRole(getRoleFromPath())
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("Hà Nội");
  const [selectedDistrict, setSelectedDistrict] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedPriceRange, setSelectedPriceRange] = useState("ALL");
  const [selectedBedrooms, setSelectedBedrooms] = useState("ALL");
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("homeviewing.accessToken") && !isAuthPage) {
      window.history.replaceState({}, "", "/login");
      setCurrentPath("/login");
    }

    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
      const role = getRoleFromPath();
      setCurrentRole(role);
      setActiveTab(getTabForRole(role));
    };

    const handleAuthExpired = () => {
      window.history.replaceState({}, "", "/login");
      setCurrentPath("/login");
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("homeviewing.auth-expired", handleAuthExpired);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("homeviewing.auth-expired", handleAuthExpired);
    };
  }, []);

  useEffect(() => {
    if (isAuthPage || !localStorage.getItem("homeviewing.accessToken")) return;
    void getCurrentUser().then((user) => {
      const nextPath = getPathForRole(user.role);
      setCurrentRole(user.role);
      setActiveTab(getTabForRole(user.role));
      if (currentPath !== nextPath) {
        window.history.replaceState({}, "", nextPath);
        setCurrentPath(nextPath);
      }
    }).catch(() => {
      logout();
      window.history.replaceState({}, "", "/login");
      setCurrentPath("/login");
    });
  }, [isAuthPage]);

  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthPage || !localStorage.getItem("homeviewing.accessToken")) return;

    const loadData = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const params = new URLSearchParams({ city: selectedCity, page: "1", limit: "50" });
        if (searchTerm) params.set("search", searchTerm);
        if (selectedDistrict !== "ALL") params.set("district", selectedDistrict);
        if (selectedType !== "ALL") params.set("propertyType", selectedType);
        if (selectedBedrooms !== "ALL") params.set("bedrooms", selectedBedrooms);
        if (selectedPriceRange === "UNDER_5B") params.set("maxPrice", "5000000000");
        if (selectedPriceRange === "5B_10B") {
          params.set("minPrice", "5000000000");
          params.set("maxPrice", "10000000000");
        }
        if (selectedPriceRange === "10B_20B") {
          params.set("minPrice", "10000000000");
          params.set("maxPrice", "20000000000");
        }
        if (selectedPriceRange === "OVER_20B") params.set("minPrice", "20000000000");
        const [loadedProperties, loadedBookings] = await Promise.all([
          getProperties(params),
          currentRole === "SALE" ? getSaleBookings() : currentRole === "ADMIN" ? getAdminBookings() : getCustomerBookings()
        ]);
        setProperties(loadedProperties);
        setBookings(loadedBookings);
        if (currentRole === "ADMIN") setUsers(await getAdminUsers());
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Không thể tải dữ liệu từ API.");
      } finally {
        setIsLoading(false);
      }
    };
    void loadData();
  }, [currentRole, isAuthPage, selectedCity, searchTerm, selectedDistrict, selectedType, selectedBedrooms, selectedPriceRange]);

  // Modal States
  const [bookingModalProperty, setBookingModalProperty] = useState<Property | null>(null);
  const [detailModalProperty, setDetailModalProperty] = useState<Property | null>(null);

  // Filtered Properties Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Keyword filter
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchAddress = p.address.toLowerCase().includes(query);
        const matchDistrict = p.district.toLowerCase().includes(query);
        if (!matchTitle && !matchAddress && !matchDistrict) return false;
      }

      // District filter
      if (selectedDistrict !== "ALL" && p.district !== selectedDistrict) {
        return false;
      }

      // Property type filter
      if (selectedType !== "ALL" && p.propertyType !== selectedType) {
        return false;
      }

      // Price range filter
      if (selectedPriceRange !== "ALL") {
        if (selectedPriceRange === "UNDER_5B" && p.price >= 5000000000) return false;
        if (selectedPriceRange === "5B_10B" && (p.price < 5000000000 || p.price > 10000000000)) return false;
        if (selectedPriceRange === "10B_20B" && (p.price < 10000000000 || p.price > 20000000000)) return false;
        if (selectedPriceRange === "OVER_20B" && p.price <= 20000000000) return false;
      }

      return true;
    });
  }, [properties, searchTerm, selectedDistrict, selectedType, selectedPriceRange]);

  const visibleBookings = useMemo(() => {
    return bookings;
  }, [bookings, currentRole]);

  const recommendedProperties = properties.filter(
    (property) => property.isVip || property.hasFreeSlotToday
  );

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedDistrict("ALL");
    setSelectedType("ALL");
    setSelectedPriceRange("ALL");
    setSelectedBedrooms("ALL");
  };

  const handleCreateBooking = async (data: {
    property: Property;
    bookingDate: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
    customerNote: string;
  }) => {
    const [startTime, endTime] = data.timeSlot.split(" - ");
    const booking = await createBooking({
      propertyId: data.property.id,
      saleId: data.property.assignedSale.id || undefined,
      bookingDate: data.bookingDate,
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      customerNote: data.customerNote
    });
    setBookings((current) => [booking, ...current]);
  };

  const handleCancelBooking = async (bookingId: string, reason: string) => {
    const booking = await updateBookingStatus(bookingId, "CANCELLED", reason);
    setBookings((current) => current.map((item) => item.id === booking.id ? booking : item));
  };

  const handleConfirmBooking = async (bookingId: string) => {
    const booking = await updateBookingStatus(bookingId, "CONFIRMED");
    setBookings((current) => current.map((item) => item.id === booking.id ? booking : item));
  };

  const handleRejectBooking = async (bookingId: string, reason: string) => {
    const booking = await updateBookingStatus(bookingId, "REJECTED", reason);
    setBookings((current) => current.map((item) => item.id === booking.id ? booking : item));
  };

  const handleCompleteBooking = async (bookingId: string) => {
    const booking = await updateBookingStatus(bookingId, "COMPLETED");
    setBookings((current) => current.map((item) => item.id === booking.id ? booking : item));
  };

  const handleUserStatusChange = async (user: AdminUser) => {
    await updateAdminUserStatus(user.id, !user.isActive);
    setUsers((current) => current.map((item) => item.id === user.id ? { ...item, isActive: !item.isActive } : item));
  };

  const handleCreateProperty = async (data: Parameters<typeof createProperty>[0]) => {
    await createProperty(data);
    const params = new URLSearchParams({ city: selectedCity, page: "1", limit: "50" });
    setProperties(await getProperties(params));
  };

  const handleAuthenticated = (role: UserRole) => {
    const nextPath = getPathForRole(role);
    window.history.pushState({}, "", nextPath);
    setCurrentPath(nextPath);
    setCurrentRole(role);
    setActiveTab(getTabForRole(role));
  };

  if (isAuthPage) {
    return (
      <AuthPage
        initialMode={currentPath === "/register" ? "register" : "login"}
        onAuthenticated={handleAuthenticated}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Navbar */}
      <Navbar
        currentRole={currentRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={() => {
          logout();
          window.history.replaceState({}, "", "/login");
          setCurrentPath("/login");
        }}
        bookingCount={visibleBookings.length}
      />

      {isLoading && <div className="border-b border-blue-100 bg-blue-50 px-4 py-2 text-center text-xs font-semibold text-blue-700">Đang tải dữ liệu...</div>}
      {loadError && <div role="alert" className="border-b border-red-100 bg-red-50 px-4 py-2 text-center text-xs font-semibold text-red-700">{loadError}</div>}

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === "home" && (
          <div className="space-y-8 pb-16">
            {/* Hero Search Bar */}
            <HeroSearch
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              selectedDistrict={selectedDistrict}
              onDistrictChange={setSelectedDistrict}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedPriceRange={selectedPriceRange}
              onPriceRangeChange={setSelectedPriceRange}
              selectedBedrooms={selectedBedrooms}
              onBedroomsChange={setSelectedBedrooms}
              onResetFilters={handleResetFilters}
            />

            {/* Personalized recommendations use the same grid and cards as featured listings. */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                    ✨ Bất Động Sản Nổi Bật
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Gợi ý những bất động sản nổi bật và đang có lịch xem.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllRecommendations((current) => !current)}
                  className="px-3.5 py-2 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 text-xs font-bold rounded-lg transition-colors"
                >
                  {showAllRecommendations ? "Thu gọn" : "Xem thêm"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showAllRecommendations ? recommendedProperties : recommendedProperties.slice(0, 3)).map(
                  (property) => (
                    <PropertyCard
                      key={`recommended-${property.id}`}
                      property={property}
                      onOpenBookingModal={(selected) => setBookingModalProperty(selected)}
                      onViewDetails={(selected) => setDetailModalProperty(selected)}
                    />
                  )
                )}
              </div>
            </section>

            {/* Property Listing Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {/* Section Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                    🔥 Danh Sách Bất Động Sản Dành Cho Bạn
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Hiển thị <strong>{filteredProperties.length}</strong> bất động sản có sẵn lịch tiếp đón tại Hà Nội
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-gray-500">Sắp xếp:</span>
                  <select className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-hidden">
                    <option>Tin VIP & Mới nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                    <option>Diện tích lớn nhất</option>
                  </select>
                </div>
              </div>

              {/* Grid */}
              {filteredProperties.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3">
                  <div className="text-4xl">🔍</div>
                  <h3 className="font-bold text-gray-800 text-base">Không tìm thấy bất động sản phù hợp</h3>
                  <p className="text-xs text-gray-500">Vui lòng thử điều chỉnh lại từ khóa hoặc khoảng giá lọc.</p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onOpenBookingModal={(p) => setBookingModalProperty(p)}
                      onViewDetails={(p) => setDetailModalProperty(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "my-bookings" && currentRole === "CUSTOMER" && (
          <MyBookingsTab
            bookings={visibleBookings}
            onCancelBooking={handleCancelBooking}
            onGetBookingDetail={getBookingDetail}
            onExploreMore={() => setActiveTab("home")}
          />
        )}

        {activeTab === "sales-dashboard" && currentRole === "SALE" && (
          <SalesDashboardTab
            bookings={visibleBookings}
            onConfirmBooking={handleConfirmBooking}
            onRejectBooking={handleRejectBooking}
            onCompleteBooking={handleCompleteBooking}
          />
        )}

        {activeTab === "admin-portal" && currentRole === "ADMIN" && (
          <AdminTab properties={properties} bookings={visibleBookings} users={users} onToggleUserStatus={handleUserStatusChange} onCreateProperty={handleCreateProperty} />
        )}
      </main>

      {/* Booking Form Modal */}
      <BookingModal
        property={bookingModalProperty}
        isOpen={Boolean(bookingModalProperty)}
        onClose={() => setBookingModalProperty(null)}
        onSubmitBooking={handleCreateBooking}
      />

      {/* Property Details Modal */}
      {detailModalProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-gray-100 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative h-72 w-full bg-slate-900">
              <img
                src={detailModalProperty.images[0]}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setDetailModalProperty(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center font-bold text-lg transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg">
                📍 {detailModalProperty.address}, {detailModalProperty.district}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-100 pb-3">
                <span className="text-red-600 font-extrabold text-2xl">
                  {detailModalProperty.priceText}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  Đơn giá: {detailModalProperty.unitPriceText}
                </span>
              </div>

              <h2 className="text-lg font-extrabold text-gray-900">
                {detailModalProperty.title}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-3 rounded-xl text-xs font-semibold text-gray-700">
                <div>📐 Diện tích: <strong>{detailModalProperty.area} m²</strong></div>
                <div>🛏️ Phòng ngủ: <strong>{detailModalProperty.bedrooms} PN</strong></div>
                <div>🚿 Phòng tắm: <strong>{detailModalProperty.bathrooms} WC</strong></div>
                <div>🧭 Hướng: <strong>{detailModalProperty.direction || "Đông Nam"}</strong></div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase text-gray-500 mb-1">Mô tả bất động sản:</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {detailModalProperty.description}
                </p>
              </div>

              {/* Agent Box */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    src={detailModalProperty.assignedSale.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-red-400"
                  />
                  <div>
                    <div className="text-xs font-bold text-gray-900">
                      {detailModalProperty.assignedSale.name}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Hotline tư vấn: <strong className="text-red-600">{detailModalProperty.assignedSale.phone}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const target = detailModalProperty;
                    setDetailModalProperty(null);
                    setBookingModalProperty(target);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  📅 Đặt Lịch Xem Nhà
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentRole !== "SALE" && <Footer />}
    </div>
  );
}
