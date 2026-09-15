import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-lg">
              B
            </div>
            <span className="font-extrabold text-lg text-white">
              Batdongsan<span className="text-red-500">.booking</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Hệ thống đặt lịch xem nhà trực tuyến hàng đầu, tối ưu hóa quy trình kết nối giữa khách hàng và chuyên viên bất động sản.
          </p>
          <div className="text-slate-300 font-bold">
            Hotline: <span className="text-red-400">1900 1888</span>
          </div>
        </div>

        {/* Col 2 */}
        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Khu Vực Trọng Điểm</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">BĐS Quận Cầu Giấy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">BĐS Quận Nam Từ Liêm</a></li>
            <li><a href="#" className="hover:text-white transition-colors">BĐS Quận Đống Đa</a></li>
            <li><a href="#" className="hover:text-white transition-colors">BĐS Quận Tây Hồ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">BĐS Quận Thanh Xuân</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Loại Hình Bất Động Sản</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Căn hộ chung cư cao cấp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Nhà phố mặt tiền kinh doanh</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Biệt thự đơn lập, song lập</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shophouse khối đế thương mại</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-2">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Cam Kết Chất Lượng</h4>
          <p className="text-[11px] leading-relaxed">
            ✓ 100% Tin đăng xác thực và có ca rảnh tiếp đón.<br />
            ✓ Không mất phí trung gian khi đặt lịch.<br />
            ✓ Bảo mật thông tin khách hàng tuyệt đối.<br />
            ✓ Hỗ trợ xử lý tranh chấp 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>© 2026 Home Viewing Booking System - Chuẩn thiết kế Batdongsan.com.vn (Phase 1 MVP).</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">Điều khoản sử dụng</a>
          <a href="#" className="hover:text-slate-300">Chính sách bảo mật</a>
          <a href="#" className="hover:text-slate-300">Quy chế hoạt động</a>
        </div>
      </div>
    </footer>
  );
};
