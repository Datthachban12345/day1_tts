import React, { useEffect, useState, useMemo } from "react";
import { Navbar } from "./components/Navbar.js";
import { HeroSearch } from "./components/HeroSearch.js";
import { PropertyCard } from "./components/PropertyCard.js";
import { PropertyDetailPage } from "./components/PropertyDetailPage.js";
import { BookingModal } from "./components/BookingModal.js";
import { MyBookingsTab } from "./components/MyBookingsTab.js";
import { SalesDashboardTab } from "./components/SalesDashboardTab.js";
import { AdminTab } from "./components/AdminTab.js";
import { AuthPage } from "./components/AuthPage.js";
import { Footer } from "./components/Footer.js";
import { PropertySkeletonGrid, EmptyState, ErrorState } from "./components/UIStates.js";
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

const getPathForRole = (role: UserRole) =>
  role === "SALE" ? "/sale" : role === "ADMIN" ? "/admin" : "/customer";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const isAuthPage = currentPath === "/login" || currentPath === "/register";
  const [currentRole, setCurrentRole] = useState<UserRole>(getRoleFromPath);
  const [activeTab, setActiveTab] = useState<"home" | "my-bookings" | "sales-dashboard" | "admin-portal">(
    () => getTabForRole(getRoleFromPath())
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
    void getCurrentUser()
      .then((user) => {
        const nextPath = getPathForRole(user.role);
        setCurrentRole(user.role);
        setActiveTab(getTabForRole(user.role));
        if (currentPath !== nextPath) {
          window.history.replaceState({}, "", nextPath);
          setCurrentPath(nextPath);
        }
      })
      .catch(() => {
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
      if (selectedPriceRange === "5B_10B") { params.set("minPrice", "5000000000"); params.set("maxPrice", "10000000000"); }
      if (selectedPriceRange === "10B_20B") { params.set("minPrice", "10000000000"); params.set("maxPrice", "20000000000"); }
      if (selectedPriceRange === "OVER_20B") params.set("minPrice", "20000000000");

      const [loadedProperties, loadedBookings] = await Promise.all([
        getProperties(params),
        currentRole === "SALE"
          ? getSaleBookings()
          : currentRole === "ADMIN"
          ? getAdminBookings()
          : getCustomerBookings(),
      ]);
      setProperties(loadedProperties);
      setBookings(loadedBookings);
      if (currentRole === "ADMIN") setUsers(await getAdminUsers());
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Không thể tải dữ liệu từ server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthPage || !localStorage.getItem("homeviewing.accessToken")) return;
    void loadData();
  }, [currentRole, isAuthPage, selectedCity, searchTerm, selectedDistrict, selectedType, selectedBedrooms, selectedPriceRange]);

  // ── Modal / Page States ──────────────────────────────────────────────────────
  const [bookingModalProperty, setBookingModalProperty] = useState<Property | null>(null);
  const [detailProperty, setDetailProperty] = useState<Property | null>(null);

  // ── Filtered Properties ──────────────────────────────────────────────────────
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q) && !p.district.toLowerCase().includes(q)) return false;
      }
      if (selectedDistrict !== "ALL" && p.district !== selectedDistrict) return false;
      if (selectedType !== "ALL" && p.propertyType !== selectedType) return false;
      if (selectedPriceRange !== "ALL") {
        if (selectedPriceRange === "UNDER_5B" && p.price >= 5_000_000_000) return false;
        if (selectedPriceRange === "5B_10B" && (p.price < 5_000_000_000 || p.price > 10_000_000_000)) return false;
        if (selectedPriceRange === "10B_20B" && (p.price < 10_000_000_000 || p.price > 20_000_000_000)) return false;
        if (selectedPriceRange === "OVER_20B" && p.price <= 20_000_000_000) return false;
      }
      return true;
    });
  }, [properties, searchTerm, selectedDistrict, selectedType, selectedPriceRange]);

  const recommendedProperties = properties.filter((p) => p.isVip || p.hasFreeSlotToday);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedDistrict("ALL");
    setSelectedType("ALL");
    setSelectedPriceRange("ALL");
    setSelectedBedrooms("ALL");
  };

  // ── Booking Handlers ─────────────────────────────────────────────────────────
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
      customerNote: data.customerNote,
    });
    setBookings((current) => [booking, ...current]);
    return { bookingCode: booking.bookingCode };
  };

  const handleCancelBooking = async (bookingId: string, reason: string) => {
    const booking = await updateBookingStatus(bookingId, "CANCELLED", reason);
    setBookings((current) => current.map((item) => (item.id === booking.id ? booking : item)));
  };

  const handleConfirmBooking = async (bookingId: string) => {
    const booking = await updateBookingStatus(bookingId, "CONFIRMED");
    setBookings((current) => current.map((item) => (item.id === booking.id ? booking : item)));
  };

  const handleRejectBooking = async (bookingId: string, reason: string) => {
    const booking = await updateBookingStatus(bookingId, "REJECTED", reason);
    setBookings((current) => current.map((item) => (item.id === booking.id ? booking : item)));
  };

  const handleCompleteBooking = async (bookingId: string) => {
    const booking = await updateBookingStatus(bookingId, "COMPLETED");
    setBookings((current) => current.map((item) => (item.id === booking.id ? booking : item)));
  };

  const handleUserStatusChange = async (user: AdminUser) => {
    await updateAdminUserStatus(user.id, !user.isActive);
    setUsers((current) => current.map((item) => (item.id === user.id ? { ...item, isActive: !item.isActive } : item)));
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

  // ── Property Detail Page (full-page, replaces home content) ─────────────────
  if (detailProperty) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Navbar
          currentRole={currentRole}
          activeTab={activeTab}
          onTabChange={(tab) => { setActiveTab(tab); setDetailProperty(null); }}
          onLogout={() => { logout(); window.history.replaceState({}, "", "/login"); setCurrentPath("/login"); }}
          bookingCount={bookings.length}
        />
        <main className="flex-1">
          <PropertyDetailPage
            property={detailProperty}
            onBack={() => setDetailProperty(null)}
            onBook={(p) => { setDetailProperty(null); setBookingModalProperty(p); }}
          />
        </main>
        <BookingModal
          property={bookingModalProperty}
          isOpen={Boolean(bookingModalProperty)}
          onClose={() => setBookingModalProperty(null)}
          onGoToMyBookings={() => { setActiveTab("my-bookings"); }}
          onSubmitBooking={handleCreateBooking}
        />
      </div>
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
        bookingCount={bookings.length}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* ── Home Tab ── */}
        {activeTab === "home" && (
          <div className="space-y-8 pb-16">
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

            {/* Recommendations */}
            {recommendedProperties.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                      ✨ Bất Động Sản Nổi Bật
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Gợi ý những bất động sản VIP và đang có lịch xem.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAllRecommendations((c) => !c)}
                    className="px-3.5 py-2 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 text-xs font-bold rounded-lg transition-colors"
                  >
                    {showAllRecommendations ? "Thu gọn" : "Xem thêm"}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(showAllRecommendations ? recommendedProperties : recommendedProperties.slice(0, 3)).map((property) => (
                    <PropertyCard
                      key={`rec-${property.id}`}
                      property={property}
                      onOpenBookingModal={setBookingModalProperty}
                      onViewDetails={setDetailProperty}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Property Listing */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    🔥 Danh Sách Bất Động Sản
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {isLoading
                      ? "Đang tải..."
                      : `Hiển thị ${filteredProperties.length} bất động sản tại ${selectedCity}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-gray-500">Sắp xếp:</span>
                  <select className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none">
                    <option>Tin VIP & Mới nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                    <option>Diện tích lớn nhất</option>
                  </select>
                </div>
              </div>

              {/* States */}
              {isLoading ? (
                <PropertySkeletonGrid count={6} />
              ) : loadError ? (
                <div className="bg-white rounded-2xl border border-gray-200">
                  <ErrorState message={loadError} onRetry={() => void loadData()} />
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200">
                  <EmptyState
                    icon="🔍"
                    title="Không tìm thấy bất động sản phù hợp"
                    description="Vui lòng thử điều chỉnh từ khóa hoặc bộ lọc."
                    action={{ label: "Xóa tất cả bộ lọc", onClick: handleResetFilters }}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onOpenBookingModal={setBookingModalProperty}
                      onViewDetails={setDetailProperty}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── My Bookings ── */}
        {activeTab === "my-bookings" && currentRole === "CUSTOMER" && (
          <MyBookingsTab
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onGetBookingDetail={getBookingDetail}
            onExploreMore={() => setActiveTab("home")}
          />
        )}

        {/* ── Sales Dashboard ── */}
        {activeTab === "sales-dashboard" && currentRole === "SALE" && (
          <SalesDashboardTab
            bookings={bookings}
            onConfirmBooking={handleConfirmBooking}
            onRejectBooking={handleRejectBooking}
            onCompleteBooking={handleCompleteBooking}
          />
        )}

        {/* ── Admin Portal ── */}
        {activeTab === "admin-portal" && currentRole === "ADMIN" && (
          <AdminTab
            properties={properties}
            bookings={bookings}
            users={users}
            onToggleUserStatus={handleUserStatusChange}
            onCreateProperty={handleCreateProperty}
          />
        )}
      </main>

      {/* Booking Modal (global) */}
      <BookingModal
        property={bookingModalProperty}
        isOpen={Boolean(bookingModalProperty)}
        onClose={() => setBookingModalProperty(null)}
        onGoToMyBookings={() => {
          setActiveTab("my-bookings");
          setBookingModalProperty(null);
        }}
        onSubmitBooking={handleCreateBooking}
      />

      {currentRole !== "SALE" && <Footer />}
    </div>
  );
}
