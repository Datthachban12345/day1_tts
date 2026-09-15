import { Property, Booking } from "../types/index.js";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Căn Hộ Cao Cấp Vinhomes Skylake Phạm Hùng - View Hồ Điều Hòa 32ha",
    propertyType: "APARTMENT",
    price: 4850000000,
    priceText: "4.85 Tỷ",
    unitPriceText: "62.5 tr/m²",
    area: 78,
    bedrooms: 2,
    bathrooms: 2,
    direction: "Đông Nam",
    address: "Tòa S2, Vinhomes Skylake, Phạm Hùng",
    district: "Nam Từ Liêm",
    city: "Hà Nội",
    description: "Căn hộ tầng trung view trọn hồ điều hòa 32ha, full nội thất nhập khẩu cao cấp từ Đức. Tiện ích 5 sao: bể bơi tràn bờ, trung tâm thương mại Vincom, sân chơi thể thao, an ninh 24/7. Sổ đỏ lâu dài, bàn giao ngay.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    isVip: true,
    hasFreeSlotToday: true,
    assignedSale: {
      id: 101,
      name: "Trần Hải Đăng",
      phone: "0982 123 456",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      availableSlots: ["08:30 - 10:00", "10:00 - 11:30", "14:00 - 15:30", "15:30 - 17:00"]
    }
  },
  {
    id: 2,
    title: "Bán Nhà Phố Mặt Tiền Kinh Doanh Phố Thái Hà - Đống Đa, Ô Tô Đỗ Cửa",
    propertyType: "HOUSE",
    price: 13500000000,
    priceText: "13.5 Tỷ",
    unitPriceText: "225 tr/m²",
    area: 60,
    bedrooms: 4,
    bathrooms: 4,
    direction: "Chính Nam",
    address: "Số 88 Ngõ 178 Thái Hà, Trung Liệt",
    district: "Đống Đa",
    city: "Hà Nội",
    description: "Nhà xây mới 5 tầng thang máy nhập khẩu, mặt tiền 5.2m cực rộng. Vị trí kinh doanh sầm uất, ô tô 7 chỗ đỗ cửa ngày đêm. Thích hợp mở văn phòng công ty, spa, phòng khám hoặc cho thuê dòng tiền 45tr/tháng.",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
    ],
    isVip: true,
    hasFreeSlotToday: true,
    assignedSale: {
      id: 102,
      name: "Nguyễn Văn Thành",
      phone: "0915 888 999",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5.0,
      availableSlots: ["09:00 - 10:30", "11:00 - 12:30", "14:30 - 16:00"]
    }
  },
  {
    id: 3,
    title: "Căn Hộ Góc 3PN Masteri West Heights Smart City - Ban Công Đông Nam",
    propertyType: "APARTMENT",
    price: 5200000000,
    priceText: "5.2 Tỷ",
    unitPriceText: "58 tr/m²",
    area: 89,
    bedrooms: 3,
    bathrooms: 2,
    direction: "Đông Nam",
    address: "Phân khu Masteri, KĐT Vinhomes Smart City, Tây Mỗ",
    district: "Nam Từ Liêm",
    city: "Hà Nội",
    description: "Căn góc hoa hậu 3 phòng ngủ thoáng mát, kính Triple Low-E chạm sàn kịch trần. Tiện ích riêng biệt: Sảnh lễ tân cao cấp, vườn trên không, rạp chiếu phim ngoài trời. Tặng gói nội thất cao cấp 150 triệu.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80"
    ],
    isVip: false,
    hasFreeSlotToday: false,
    assignedSale: {
      id: 101,
      name: "Trần Hải Đăng",
      phone: "0982 123 456",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      availableSlots: ["08:30 - 10:00", "14:00 - 15:30", "16:00 - 17:30"]
    }
  },
  {
    id: 4,
    title: "Biệt Thự Đơn Lập Starlake Tây Hồ Tây - Khu Đô Thị Đẳng Cấp Quốc Tế",
    propertyType: "VILLA",
    price: 46000000000,
    priceText: "46 Tỷ",
    unitPriceText: "190 tr/m²",
    area: 242,
    bedrooms: 5,
    bathrooms: 6,
    direction: "Đông Bắc",
    address: "Khu H7-TT1, Khu Đô Thị Starlake Tây Hồ Tây",
    district: "Bắc Từ Liêm",
    city: "Hà Nội",
    description: "Biệt thự siêu VIP đẳng cấp thượng lưu, 3 mặt thoáng đón ánh sáng tự nhiên. Sân vườn rộng rãi, có hồ cá Koi. Vị trí trung tâm kết nối Hồ Tây và sân bay Nội Bài thuận tiện. Khu dân trí cao, an ninh 3 lớp nghiêm ngặt.",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
    ],
    isVip: true,
    hasFreeSlotToday: true,
    assignedSale: {
      id: 103,
      name: "Lê Minh Tuấn",
      phone: "0904 555 777",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5.0,
      availableSlots: ["09:00 - 11:00", "14:00 - 16:00"]
    }
  },
  {
    id: 5,
    title: "Căn Hộ Dịch Vụ 7 Tầng Doanh Thu 80tr/tháng - Cầu Giấy Gần Các Trường ĐH",
    propertyType: "HOUSE",
    price: 11200000000,
    priceText: "11.2 Tỷ",
    unitPriceText: "185 tr/m²",
    area: 60,
    bedrooms: 12,
    bathrooms: 12,
    direction: "Tây Nam",
    address: "Ngõ 165 Cầu Giấy, Dịch Vọng",
    district: "Cầu Giấy",
    city: "Hà Nội",
    description: "Tòa nhà 7 tầng thang máy mới tinh gồm 12 phòng khép kín full đồ cao cấp. Lúc nào cũng full phòng sinh viên và người đi làm thuê. Doanh thu dòng tiền thụ động ổn định 80 triệu/tháng. PCCC đạt chuẩn quy định mới.",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80"
    ],
    isVip: false,
    hasFreeSlotToday: true,
    assignedSale: {
      id: 102,
      name: "Nguyễn Văn Thành",
      phone: "0915 888 999",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5.0,
      availableSlots: ["08:30 - 10:00", "10:30 - 12:00", "15:00 - 16:30"]
    }
  },
  {
    id: 6,
    title: "Shophouse Khối Đế The Manor Central Park Nguyễn Xiển - Mặt Đường Lớn",
    propertyType: "TOWNHOUSE",
    price: 24500000000,
    priceText: "24.5 Tỷ",
    unitPriceText: "245 tr/m²",
    area: 100,
    bedrooms: 4,
    bathrooms: 5,
    direction: "Đông",
    address: "KĐT The Manor Central Park, Đại Kim",
    district: "Hoàng Mai",
    city: "Hà Nội",
    description: "Nhà phố thương mại shophouse 4 tầng 1 lửng mặt tiền đường lớn. Thiết kế 2 lối đi riêng biệt vừa ở vừa kinh doanh hoặc cho thuê độc lập. Công viên trung tâm Chu Văn An 100ha kế cận xanh mát.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1000&q=80"
    ],
    isVip: true,
    hasFreeSlotToday: false,
    assignedSale: {
      id: 103,
      name: "Lê Minh Tuấn",
      phone: "0904 555 777",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5.0,
      availableSlots: ["10:00 - 11:30", "14:30 - 16:00"]
    }
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 1,
    bookingCode: "BK-8901",
    propertyId: 1,
    propertyTitle: "Căn Hộ Cao Cấp Vinhomes Skylake Phạm Hùng - View Hồ Điều Hòa 32ha",
    propertyAddress: "Tòa S2, Vinhomes Skylake, Phạm Hùng, Nam Từ Liêm",
    propertyImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
    propertyPrice: "4.85 Tỷ",
    customerId: 1,
    customerName: "Nguyễn Văn Khách",
    customerPhone: "0912 345 678",
    saleId: 101,
    saleName: "Trần Hải Đăng",
    salePhone: "0982 123 456",
    bookingDate: "2026-09-18",
    timeSlot: "08:30 - 10:00",
    status: "CONFIRMED",
    customerNote: "Tôi đi cùng vợ, muốn xem kỹ hướng ban công và pháp lý sổ đỏ.",
    createdAt: "2026-09-14 10:15:00",
    history: [
      {
        id: 1,
        oldStatus: null,
        newStatus: "PENDING",
        actorRole: "CUSTOMER",
        actorName: "Nguyễn Văn Khách",
        reason: "Khách hàng tạo lịch hẹn xem nhà",
        timestamp: "2026-09-14 10:15:00"
      },
      {
        id: 2,
        oldStatus: "PENDING",
        newStatus: "CONFIRMED",
        actorRole: "SALE",
        actorName: "Trần Hải Đăng",
        reason: "Sales đã liên hệ khách và chốt thời gian tiếp đón tại sảnh S2",
        timestamp: "2026-09-14 11:00:00"
      }
    ]
  },
  {
    id: 2,
    bookingCode: "BK-8902",
    propertyId: 2,
    propertyTitle: "Bán Nhà Phố Mặt Tiền Kinh Doanh Phố Thái Hà - Đống Đa, Ô Tô Đỗ Cửa",
    propertyAddress: "Số 88 Ngõ 178 Thái Hà, Trung Liệt, Đống Đa",
    propertyImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
    propertyPrice: "13.5 Tỷ",
    customerId: 1,
    customerName: "Nguyễn Văn Khách",
    customerPhone: "0912 345 678",
    saleId: 102,
    saleName: "Nguyễn Văn Thành",
    salePhone: "0915 888 999",
    bookingDate: "2026-09-20",
    timeSlot: "14:30 - 16:00",
    status: "PENDING",
    customerNote: "Cần xem hệ thống thang máy và đo lại chiều rộng mặt tiền.",
    createdAt: "2026-09-15 08:30:00",
    history: [
      {
        id: 3,
        oldStatus: null,
        newStatus: "PENDING",
        actorRole: "CUSTOMER",
        actorName: "Nguyễn Văn Khách",
        reason: "Khách hàng gửi yêu cầu đặt lịch mới",
        timestamp: "2026-09-15 08:30:00"
      }
    ]
  }
];
