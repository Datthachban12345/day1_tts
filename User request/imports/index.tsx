import { useEffect, useState } from "react";
import svgPaths from "./svg-31p59nx4fp";

function CanvasHeader() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center leading-[normal] not-italic pb-[48px] relative shrink-0 whitespace-nowrap" data-name="canvas-header">
      <p className="font-['Inter:Extra_Bold',sans-serif] font-extrabold relative shrink-0 text-[#111827] text-[32px]">SƠ ĐỒ LƯỒNG ĐẶT LỊCH HẸN XEM BĐS</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[16px]">Luồng quy trình 4 bước từ khi tìm kiếm đến khi Sale phê duyệt lịch hẹn</p>
    </div>
  );
}

function LogoGroup() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="logo-group">
      <div className="bg-[#374151] relative rounded-[4px] shrink-0 size-[32px]" data-name="Rectangle" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">ALAND</p>
    </div>
  );
}

function NavLinks() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[32px] items-center leading-[normal] not-italic relative shrink-0 text-[14px] whitespace-nowrap" data-name="nav-links">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827]">Tìm kiếm dự án</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#111827]">Lịch đặt của tôi</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#6b7280]">Hỗ trợ</p>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="user-profile">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Khách hàng</p>
      <div className="relative shrink-0 size-[36px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="36" preserveAspectRatio="none" viewBox="0 0 36 36" width="36">
          <circle cx="18" cy="18" fill="#F9FAFB" id="Ellipse" r="17.5" stroke="#D1D5DB" />
        </svg>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between px-[48px] py-[16px] relative shrink-0 w-full" data-name="header">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <LogoGroup />
      <NavLinks />
      <UserProfile />
    </div>
  );
}

function HeroText() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] not-italic relative shrink-0 w-full whitespace-nowrap" data-name="hero-text">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[28px]">Tìm kiếm bất động sản phù hợp</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[15px]">Khám phá hàng ngàn căn hộ, biệt thự và nhà phố với lịch hẹn xem thực tế nhanh chóng.</p>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="search">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="search">
          <path d={svgPaths.peea8900} id="Vector" stroke="#6B7280" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SearchInput() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_26px] gap-[8px] items-center min-w-px p-[12px] relative rounded-[4px]" data-name="search-input">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Search />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-px not-italic relative text-[#6b7280] text-[14px]">Nhập địa điểm, tên dự án hoặc khu vực...</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="chevron-down">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="#6B7280" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="bg-white content-stretch flex gap-[24px] items-center px-[16px] py-[12px] relative rounded-[4px] shrink-0" data-name="dropdown">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Khoảng giá</p>
      <ChevronDown />
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="chevron-down">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="chevron-down">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="#6B7280" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Dropdown1() {
  return (
    <div className="bg-white content-stretch flex gap-[24px] items-center px-[16px] py-[12px] relative rounded-[4px] shrink-0" data-name="dropdown">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Diện tích</p>
      <ChevronDown1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#374151] content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">Tìm kiếm</p>
    </div>
  );
}

function SearchFilters() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="search-filters">
      <SearchInput />
      <Dropdown />
      <Dropdown1 />
      <Button />
    </div>
  );
}

function HeroSearchSection() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[24px] items-start p-[48px] relative shrink-0 w-full" data-name="hero-search-section">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <HeroText />
      <SearchFilters />
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="image">
          <path d={svgPaths.p2c44b300} id="Vector" stroke="#6B7280" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ImagePlaceholder() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[8px] h-[160px] items-center justify-center relative shrink-0 w-full" data-name="image-placeholder">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none" />
      <Image />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">Ảnh minh họa</p>
    </div>
  );
}

function CardInfo() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-full" data-name="card-info">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Vinhomes Grand Park</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[13px] w-full">Quận 9, TP. HCM</p>
    </div>
  );
}

function SpecsRow() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[16px] items-start leading-[normal] not-italic relative shrink-0 w-full whitespace-nowrap" data-name="specs-row">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px]">2.5 Tỷ VNĐ</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[13px]">65 m²</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[13px]">2 PN</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_34px] items-center justify-center min-w-px px-[16px] py-[10px] relative rounded-[4px]" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Xem chi tiết</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#374151] content-stretch flex flex-[1_0_0] items-center justify-center min-w-px px-[16px] py-[10px] relative rounded-[4px]" data-name="button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">Đặt lịch xem</p>
    </div>
  );
}

function CardActions() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pt-[8px] relative shrink-0 w-full" data-name="card-actions">
      <Button1 />
      <Button2 />
    </div>
  );
}

function CardBody() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative shrink-0 w-full" data-name="card-body">
      <CardInfo />
      <SpecsRow />
      <CardActions />
    </div>
  );
}

function PropertyCard() {
  return (
    <div className="bg-white flex-[1_0_2px] min-w-px relative rounded-[6px]" data-name="property-card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImagePlaceholder />
        <CardBody />
      </div>
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Image1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="image">
          <path d={svgPaths.p2c44b300} id="Vector" stroke="#6B7280" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ImagePlaceholder1() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[8px] h-[160px] items-center justify-center relative shrink-0 w-full" data-name="image-placeholder">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none" />
      <Image1 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">Ảnh minh họa</p>
    </div>
  );
}

function CardInfo1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-full" data-name="card-info">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Masteri Thảo Điền</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[13px] w-full">Quận 2, TP. HCM</p>
    </div>
  );
}

function SpecsRow1() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[16px] items-start leading-[normal] not-italic relative shrink-0 w-full whitespace-nowrap" data-name="specs-row">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px]">4.8 Tỷ VNĐ</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[13px]">80 m²</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[13px]">3 PN</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_34px] items-center justify-center min-w-px px-[16px] py-[10px] relative rounded-[4px]" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Xem chi tiết</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#374151] content-stretch flex flex-[1_0_0] items-center justify-center min-w-px px-[16px] py-[10px] relative rounded-[4px]" data-name="button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">Đặt lịch xem</p>
    </div>
  );
}

function CardActions1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pt-[8px] relative shrink-0 w-full" data-name="card-actions">
      <Button3 />
      <Button4 />
    </div>
  );
}

function CardBody1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative shrink-0 w-full" data-name="card-body">
      <CardInfo1 />
      <SpecsRow1 />
      <CardActions1 />
    </div>
  );
}

function PropertyCard1() {
  return (
    <div className="bg-white flex-[1_0_2px] min-w-px relative rounded-[6px]" data-name="property-card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImagePlaceholder1 />
        <CardBody1 />
      </div>
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Image2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="image">
          <path d={svgPaths.p2c44b300} id="Vector" stroke="#6B7280" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ImagePlaceholder2() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[8px] h-[160px] items-center justify-center relative shrink-0 w-full" data-name="image-placeholder">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none" />
      <Image2 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">Ảnh minh họa</p>
    </div>
  );
}

function CardInfo2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-full" data-name="card-info">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Sunrise City Quận 7</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[13px] w-full">Quận 7, TP. HCM</p>
    </div>
  );
}

function SpecsRow2() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[16px] items-start leading-[normal] not-italic relative shrink-0 w-full whitespace-nowrap" data-name="specs-row">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px]">3.2 Tỷ VNĐ</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[13px]">72 m²</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[13px]">2 PN</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_34px] items-center justify-center min-w-px px-[16px] py-[10px] relative rounded-[4px]" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Xem chi tiết</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#374151] content-stretch flex flex-[1_0_0] items-center justify-center min-w-px px-[16px] py-[10px] relative rounded-[4px]" data-name="button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">Đặt lịch xem</p>
    </div>
  );
}

function CardActions2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pt-[8px] relative shrink-0 w-full" data-name="card-actions">
      <Button5 />
      <Button6 />
    </div>
  );
}

function CardBody2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative shrink-0 w-full" data-name="card-body">
      <CardInfo2 />
      <SpecsRow2 />
      <CardActions2 />
    </div>
  );
}

function PropertyCard2() {
  return (
    <div className="bg-white flex-[1_0_2px] min-w-px relative rounded-[6px]" data-name="property-card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImagePlaceholder2 />
        <CardBody2 />
      </div>
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Grid() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="grid">
      <PropertyCard />
      <PropertyCard1 />
      <PropertyCard2 />
    </div>
  );
}

function ListingSection() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start p-[48px] relative shrink-0 w-full" data-name="listing-section">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">Dự án nổi bật</p>
      <Grid />
    </div>
  );
}

function ScreenHome() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="screen-home">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Header />
        <HeroSearchSection />
        <ListingSection />
      </div>
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge() {
  return (
    <div className="[word-break:break-word] bg-[#374151] content-stretch flex gap-[8px] items-center leading-[normal] not-italic px-[16px] py-[8px] relative rounded-[20px] shrink-0 text-[12px] whitespace-nowrap" data-name="badge">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-white uppercase">BƯỚC 1</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#d1d5db]">{`Khách hàng tìm kiếm dự án & Nhấp 'Đặt lịch xem'`}</p>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow-down">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="arrow-down">
          <path d={svgPaths.p273cdd00} id="Vector" stroke="#374151" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center py-[32px] relative shrink-0 w-full" data-name="flow-connector">
      <ArrowDown />
    </div>
  );
}

function LogoGroup1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="logo-group">
      <div className="bg-[#374151] relative rounded-[4px] shrink-0 size-[32px]" data-name="Rectangle" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">ALAND</p>
    </div>
  );
}

function NavLinks1() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[32px] items-center leading-[normal] not-italic relative shrink-0 text-[14px] whitespace-nowrap" data-name="nav-links">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827]">Tìm kiếm dự án</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#111827]">Lịch đặt của tôi</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#6b7280]">Hỗ trợ</p>
    </div>
  );
}

function UserProfile1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="user-profile">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Khách hàng</p>
      <div className="relative shrink-0 size-[36px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="36" preserveAspectRatio="none" viewBox="0 0 36 36" width="36">
          <circle cx="18" cy="18" fill="#F9FAFB" id="Ellipse" r="17.5" stroke="#D1D5DB" />
        </svg>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between px-[48px] py-[16px] relative shrink-0 w-full" data-name="header">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <LogoGroup1 />
      <NavLinks1 />
      <UserProfile1 />
    </div>
  );
}

function StepsIndicator() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[16px] items-start px-[48px] py-[16px] relative shrink-0 w-full" data-name="steps-indicator">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">Dự án: Vinhomes Grand Park</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">→</p>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">Ngày: 24/10/2023</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">→</p>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">Giờ: 14:00</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">→</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Xác nhận</p>
    </div>
  );
}

function TextGroup() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative" data-name="text-group">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">Vinhomes Grand Park</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Quận 9, TP. HCM — 2.5 Tỷ VNĐ</p>
    </div>
  );
}

function PreviewBox() {
  return (
    <div className="content-stretch flex gap-[12px] items-center p-[12px] relative rounded-[6px] shrink-0 w-full" data-name="preview-box">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-[#f9fafb] border border-[#d1d5db] border-solid relative rounded-[4px] shrink-0 size-[60px]" data-name="Rectangle" />
      <TextGroup />
    </div>
  );
}

function DayBoxSelected() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-[1_0_28px] flex-col items-center min-w-px p-[12px] relative rounded-[4px]" data-name="day-box-selected">
      <div aria-hidden className="absolute border-2 border-[#374151] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap">Thứ Ba</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[16px] whitespace-nowrap">24/10</p>
    </div>
  );
}

function DayBox() {
  return (
    <div className="content-stretch flex flex-[1_0_26px] flex-col items-center min-w-px p-[12px] relative rounded-[4px]" data-name="day-box">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap">Thứ Tư</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[16px] whitespace-nowrap">25/10</p>
    </div>
  );
}

function DayBox1() {
  return (
    <div className="content-stretch flex flex-[1_0_26px] flex-col items-center min-w-px p-[12px] relative rounded-[4px]" data-name="day-box">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] whitespace-nowrap">Thứ Năm</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[16px] whitespace-nowrap">26/10</p>
    </div>
  );
}

function CalendarSimulation() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="calendar-simulation">
      <DayBoxSelected />
      <DayBox />
      <DayBox1 />
    </div>
  );
}

function TimePill() {
  return (
    <div className="bg-white content-stretch flex items-start px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="time-pill">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">09:00</p>
    </div>
  );
}

function TimePill1() {
  return (
    <div className="bg-white content-stretch flex items-start px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="time-pill">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">10:30</p>
    </div>
  );
}

function TimePill2() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex items-start px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="time-pill">
      <div aria-hidden className="absolute border-2 border-[#374151] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">14:00 (Đã chọn)</p>
    </div>
  );
}

function TimePill3() {
  return (
    <div className="bg-white content-stretch flex items-start px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="time-pill">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">15:30</p>
    </div>
  );
}

function TimeSlots() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="time-slots">
      <TimePill />
      <TimePill1 />
      <TimePill2 />
      <TimePill3 />
    </div>
  );
}

function Scheduler() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="scheduler">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">{`Chọn Ngày & Giờ`}</p>
      <CalendarSimulation />
      <TimeSlots />
    </div>
  );
}

function InputBox() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex items-center px-[12px] py-[10px] relative rounded-[4px] shrink-0 w-full" data-name="input-box">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Nguyễn Văn A</p>
    </div>
  );
}

function FieldHVaTenNgiXem() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="field-Họ và tên người xem">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Họ và tên người xem</p>
      <InputBox />
    </div>
  );
}

function InputBox1() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex items-center px-[12px] py-[10px] relative rounded-[4px] shrink-0 w-full" data-name="input-box">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">0901234567</p>
    </div>
  );
}

function FieldSDinThoiLienH() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="field-Số điện thoại liên hệ">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Số điện thoại liên hệ</p>
      <InputBox1 />
    </div>
  );
}

function InputBox2() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex items-center px-[12px] py-[10px] relative rounded-[4px] shrink-0 w-full" data-name="input-box">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">Ví dụ: Cần xem thêm hướng ban công, tiện ích nội khu...</p>
    </div>
  );
}

function FieldGhiChuThemChoSale() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="field-Ghi chú thêm cho Sale">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Ghi chú thêm cho Sale</p>
      <InputBox2 />
    </div>
  );
}

function UserFields() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="user-fields">
      <FieldHVaTenNgiXem />
      <FieldSDinThoiLienH />
      <FieldGhiChuThemChoSale />
    </div>
  );
}

function LeftForm() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="left-form">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">Thông tin đặt lịch xem</p>
      <PreviewBox />
      <Scheduler />
      <UserFields />
    </div>
  );
}

function Row() {
  return (
    <div className="[word-break:break-word] content-stretch flex items-start justify-between leading-[normal] not-italic relative shrink-0 text-[13px] w-full whitespace-nowrap" data-name="row">
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280]">Bất động sản</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#111827]">Vinhomes Grand Park</p>
    </div>
  );
}

function Row2() {
  return (
    <div className="[word-break:break-word] content-stretch flex items-start justify-between leading-[normal] not-italic relative shrink-0 text-[13px] w-full whitespace-nowrap" data-name="row">
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280]">Thời gian</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#111827]">14:00 — 24/10/2023</p>
    </div>
  );
}

function Row3() {
  return (
    <div className="[word-break:break-word] content-stretch flex items-start justify-between leading-[normal] not-italic relative shrink-0 text-[13px] w-full whitespace-nowrap" data-name="row">
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280]">Khách hàng</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#111827]">Nguyễn Văn A (090...)</p>
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="status-badge">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[11px] whitespace-nowrap">Chờ xác nhận</p>
    </div>
  );
}

function StatusRow() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="status-row">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">Trạng thái mặc định</p>
      <StatusBadge />
    </div>
  );
}

function SummaryDetails() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="summary-details">
      <Row />
      <Row2 />
      <Row3 />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 332 1" width="332">
            <line id="Line" stroke="#D1D5DB" x2="332" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <StatusRow />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#374151] content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0 w-full" data-name="button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">Xác nhận đặt lịch</p>
    </div>
  );
}

function RightSummary() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[20px] items-start p-[24px] relative rounded-[6px] shrink-0 w-[380px]" data-name="right-summary">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[16px] whitespace-nowrap">Tóm tắt đặt lịch</p>
      <SummaryDetails />
      <Button7 />
    </div>
  );
}

function BookingLayout() {
  return (
    <div className="content-stretch flex gap-[32px] items-start p-[48px] relative shrink-0 w-full" data-name="booking-layout">
      <LeftForm />
      <RightSummary />
    </div>
  );
}

function ScreenBooking() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="screen-booking">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Header1 />
        <StepsIndicator />
        <BookingLayout />
      </div>
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge1() {
  return (
    <div className="[word-break:break-word] bg-[#374151] content-stretch flex gap-[8px] items-center leading-[normal] not-italic px-[16px] py-[8px] relative rounded-[20px] shrink-0 text-[12px] whitespace-nowrap" data-name="badge">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-white uppercase">BƯỚC 2</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#d1d5db]">{`Khách hàng chọn lịch & Điền thông tin, Nhấp 'Xác nhận đặt lịch'`}</p>
    </div>
  );
}

function ArrowDown1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow-down">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="arrow-down">
          <path d={svgPaths.p273cdd00} id="Vector" stroke="#374151" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function FlowConnector1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center py-[32px] relative shrink-0 w-full" data-name="flow-connector">
      <ArrowDown1 />
    </div>
  );
}

function LogoGroup2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="logo-group">
      <div className="bg-[#374151] relative rounded-[4px] shrink-0 size-[32px]" data-name="Rectangle" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">ALAND</p>
    </div>
  );
}

function NavLinks2() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[32px] items-center leading-[normal] not-italic relative shrink-0 text-[14px] whitespace-nowrap" data-name="nav-links">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#111827]">Tìm kiếm dự án</p>
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827]">Lịch đặt của tôi</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#6b7280]">Hỗ trợ</p>
    </div>
  );
}

function UserProfile2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="user-profile">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Khách hàng</p>
      <div className="relative shrink-0 size-[36px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="36" preserveAspectRatio="none" viewBox="0 0 36 36" width="36">
          <circle cx="18" cy="18" fill="#F9FAFB" id="Ellipse" r="17.5" stroke="#D1D5DB" />
        </svg>
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between px-[48px] py-[16px] relative shrink-0 w-full" data-name="header">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <LogoGroup2 />
      <NavLinks2 />
      <UserProfile2 />
    </div>
  );
}

function TabActive() {
  return (
    <div className="bg-white content-stretch flex items-start px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="tab-active">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">Tất cả</p>
    </div>
  );
}

function Tab() {
  return (
    <div className="content-stretch flex items-start px-[12px] py-[6px] relative shrink-0" data-name="tab">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">Đợi duyệt</p>
    </div>
  );
}

function Tab1() {
  return (
    <div className="content-stretch flex items-start px-[12px] py-[6px] relative shrink-0" data-name="tab">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">Sắp tới</p>
    </div>
  );
}

function FilterTabs() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[4px] items-start p-[4px] relative rounded-[6px] shrink-0" data-name="filter-tabs">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <TabActive />
      <Tab />
      <Tab1 />
    </div>
  );
}

function TitleHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="title-header">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[24px] whitespace-nowrap">Lịch đặt của tôi</p>
      <FilterTabs />
    </div>
  );
}

function ColProject() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[250px]" data-name="col-project">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">Vinhomes Grand Park</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Căn hộ chung cư cao cấp</p>
    </div>
  );
}

function ColDatetime() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[180px]" data-name="col-datetime">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#111827] text-[14px] w-full">14:00 - 24/10/2023</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Lịch xem thực tế</p>
    </div>
  );
}

function ColAgent() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[150px]" data-name="col-agent">
      <p className="relative shrink-0 text-[#111827] text-[14px] w-full">Trần Văn Môi Giới</p>
      <p className="relative shrink-0 text-[#6b7280] text-[12px] w-full">Chuyên viên hỗ trợ</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex items-start px-[10px] py-[6px] relative rounded-[4px] shrink-0" data-name="badge">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">Chờ xác nhận</p>
    </div>
  );
}

function ColStatus() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[140px]" data-name="col-status">
      <Badge2 />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Xem chi tiết</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Hủy lịch</p>
    </div>
  );
}

function ColActions() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 w-[200px]" data-name="col-actions">
      <Button8 />
      <Button9 />
    </div>
  );
}

function BookingRow() {
  return (
    <div className="content-stretch flex items-center justify-between p-[20px] relative shrink-0 w-full" data-name="booking-row">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <ColProject />
      <ColDatetime />
      <ColAgent />
      <ColStatus />
      <ColActions />
    </div>
  );
}

function ColProject1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[250px]" data-name="col-project">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">Masteri Thảo Điền</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Căn hộ chung cư cao cấp</p>
    </div>
  );
}

function ColDatetime1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[180px]" data-name="col-datetime">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#111827] text-[14px] w-full">09:30 - 26/10/2023</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Lịch xem thực tế</p>
    </div>
  );
}

function ColAgent1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[150px]" data-name="col-agent">
      <p className="relative shrink-0 text-[#111827] text-[14px] w-full">Lê Hoàng Sale</p>
      <p className="relative shrink-0 text-[#6b7280] text-[12px] w-full">Chuyên viên hỗ trợ</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex items-start px-[10px] py-[6px] relative rounded-[4px] shrink-0" data-name="badge">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[12px] whitespace-nowrap">Đã xác nhận</p>
    </div>
  );
}

function ColStatus1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[140px]" data-name="col-status">
      <Badge3 />
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Xem chi tiết</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Hủy lịch</p>
    </div>
  );
}

function ColActions1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 w-[200px]" data-name="col-actions">
      <Button10 />
      <Button11 />
    </div>
  );
}

function BookingRow1() {
  return (
    <div className="content-stretch flex items-center justify-between p-[20px] relative shrink-0 w-full" data-name="booking-row">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <ColProject1 />
      <ColDatetime1 />
      <ColAgent1 />
      <ColStatus1 />
      <ColActions1 />
    </div>
  );
}

function ColProject2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[250px]" data-name="col-project">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">Sunrise City Quận 7</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Căn hộ chung cư cao cấp</p>
    </div>
  );
}

function ColDatetime2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[180px]" data-name="col-datetime">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#111827] text-[14px] w-full">16:00 - 18/10/2023</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Lịch xem thực tế</p>
    </div>
  );
}

function ColAgent2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[150px]" data-name="col-agent">
      <p className="relative shrink-0 text-[#111827] text-[14px] w-full">Nguyễn Thị Tư Vấn</p>
      <p className="relative shrink-0 text-[#6b7280] text-[12px] w-full">Chuyên viên hỗ trợ</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#374151] content-stretch flex items-start px-[10px] py-[6px] relative rounded-[4px] shrink-0" data-name="badge">
      <div aria-hidden className="absolute border border-[#374151] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Đã hoàn thành</p>
    </div>
  );
}

function ColStatus2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[140px]" data-name="col-status">
      <Badge4 />
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Xem chi tiết</p>
    </div>
  );
}

function ColActions2() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-[200px]" data-name="col-actions">
      <Button12 />
    </div>
  );
}

function BookingRow2() {
  return (
    <div className="content-stretch flex items-center justify-between p-[20px] relative shrink-0 w-full" data-name="booking-row">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <ColProject2 />
      <ColDatetime2 />
      <ColAgent2 />
      <ColStatus2 />
      <ColActions2 />
    </div>
  );
}

function ColProject3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[250px]" data-name="col-project">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">Empire City Thủ Thiêm</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Căn hộ chung cư cao cấp</p>
    </div>
  );
}

function ColDatetime3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[180px]" data-name="col-datetime">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#111827] text-[14px] w-full">10:00 - 12/10/2023</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Lịch xem thực tế</p>
    </div>
  );
}

function ColAgent3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[150px]" data-name="col-agent">
      <p className="relative shrink-0 text-[#111827] text-[14px] w-full">Trần Văn Môi Giới</p>
      <p className="relative shrink-0 text-[#6b7280] text-[12px] w-full">Chuyên viên hỗ trợ</p>
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-white content-stretch flex items-start px-[10px] py-[6px] relative rounded-[4px] shrink-0" data-name="badge">
      <div aria-hidden className="absolute border border-[#d1d5db] border-dashed inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">Đã từ chối</p>
    </div>
  );
}

function ColStatus3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[140px]" data-name="col-status">
      <Badge5 />
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Xem chi tiết</p>
    </div>
  );
}

function ColActions3() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-[200px]" data-name="col-actions">
      <Button13 />
    </div>
  );
}

function BookingRow3() {
  return (
    <div className="content-stretch flex items-center justify-between p-[20px] relative shrink-0 w-full" data-name="booking-row">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <ColProject3 />
      <ColDatetime3 />
      <ColAgent3 />
      <ColStatus3 />
      <ColActions3 />
    </div>
  );
}

function ColProject4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[250px]" data-name="col-project">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">The Sun Avenue</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Căn hộ chung cư cao cấp</p>
    </div>
  );
}

function ColDatetime4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[180px]" data-name="col-datetime">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#111827] text-[14px] w-full">15:30 - 05/10/2023</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px] w-full">Lịch xem thực tế</p>
    </div>
  );
}

function ColAgent4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[150px]" data-name="col-agent">
      <p className="relative shrink-0 text-[#111827] text-[14px] w-full">Phạm Văn Sale</p>
      <p className="relative shrink-0 text-[#6b7280] text-[12px] w-full">Chuyên viên hỗ trợ</p>
    </div>
  );
}

function Badge6() {
  return (
    <div className="bg-white content-stretch flex items-start px-[10px] py-[6px] relative rounded-[4px] shrink-0" data-name="badge">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[12px] whitespace-nowrap">Đã hủy</p>
    </div>
  );
}

function ColStatus4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[140px]" data-name="col-status">
      <Badge6 />
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Xem chi tiết</p>
    </div>
  );
}

function ColActions4() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-[200px]" data-name="col-actions">
      <Button14 />
    </div>
  );
}

function BookingRow4() {
  return (
    <div className="content-stretch flex items-center justify-between p-[20px] relative shrink-0 w-full" data-name="booking-row">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <ColProject4 />
      <ColDatetime4 />
      <ColAgent4 />
      <ColStatus4 />
      <ColActions4 />
    </div>
  );
}

function BookingList() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[6px] shrink-0 w-full" data-name="booking-list">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <BookingRow />
      <BookingRow1 />
      <BookingRow2 />
      <BookingRow3 />
      <BookingRow4 />
    </div>
  );
}

function PageBody() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start p-[48px] relative shrink-0 w-full" data-name="page-body">
      <TitleHeader />
      <BookingList />
    </div>
  );
}

function ScreenMyBookings() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="screen-my-bookings">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Header2 />
        <PageBody />
      </div>
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge7() {
  return (
    <div className="[word-break:break-word] bg-[#374151] content-stretch flex gap-[8px] items-center leading-[normal] not-italic px-[16px] py-[8px] relative rounded-[20px] shrink-0 text-[12px] whitespace-nowrap" data-name="badge">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-white uppercase">BƯỚC 3</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#d1d5db]">Yêu cầu được gửi đến hệ thống để Sale tiếp nhận xử lý</p>
    </div>
  );
}

function ArrowDown2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow-down">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g id="arrow-down">
          <path d={svgPaths.p273cdd00} id="Vector" stroke="#374151" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function FlowConnector2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center py-[32px] relative shrink-0 w-full" data-name="flow-connector">
      <ArrowDown2 />
    </div>
  );
}

function SidebarBrand() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="sidebar-brand">
      <div className="bg-[#374151] relative rounded-[4px] shrink-0 size-[24px]" data-name="Rectangle" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[16px] whitespace-nowrap">SALE HUB</p>
    </div>
  );
}

function LayoutDashboard() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="layout-dashboard">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="layout-dashboard">
          <g id="Vector">
            <path d={svgPaths.pff0fc00} stroke="#111827" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p1d76d410} stroke="#111827" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p2f091200} stroke="#111827" strokeLinecap="round" strokeWidth="2" />
            <path d={svgPaths.p39897300} stroke="#111827" strokeLinecap="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function NavItemActive() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[4px] shrink-0 w-full" data-name="nav-item-active">
      <LayoutDashboard />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Bảng điều khiển</p>
    </div>
  );
}

function List() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="list">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="list">
          <path d={svgPaths.p231c2300} id="Vector" stroke="#6B7280" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NavItem() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative shrink-0 w-full" data-name="nav-item">
      <List />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">Quản lý lịch hẹn</p>
    </div>
  );
}

function List1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="list">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="list">
          <path d={svgPaths.p231c2300} id="Vector" stroke="#6B7280" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NavItem1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative shrink-0 w-full" data-name="nav-item">
      <List1 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">Khách hàng</p>
    </div>
  );
}

function List2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="list">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="list">
          <path d={svgPaths.p231c2300} id="Vector" stroke="#6B7280" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NavItem2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative shrink-0 w-full" data-name="nav-item">
      <List2 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">Dự án liên kết</p>
    </div>
  );
}

function List3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="list">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="list">
          <path d={svgPaths.p231c2300} id="Vector" stroke="#6B7280" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NavItem3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative shrink-0 w-full" data-name="nav-item">
      <List3 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">Báo cáo doanh thu</p>
    </div>
  );
}

function NavItems() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="nav-items">
      <NavItemActive />
      <NavItem />
      <NavItem1 />
      <NavItem2 />
      <NavItem3 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[32px] h-full items-start p-[24px] relative shrink-0 w-[220px]" data-name="sidebar">
      <div aria-hidden className="absolute border-[#d1d5db] border-r border-solid inset-0 pointer-events-none" />
      <SidebarBrand />
      <NavItems />
    </div>
  );
}

function TitleGroup() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 whitespace-nowrap" data-name="title-group">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[20px]">Bảng điều khiển môi giới</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#6b7280] text-[12px]">Quản lý lịch đặt và phê duyệt yêu cầu từ khách hàng</p>
    </div>
  );
}

function AgentMeta() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="agent-meta">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Môi giới: Nguyễn Thị Sale</p>
      <div className="relative shrink-0 size-[32px]" data-name="Ellipse">
        <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
          <circle cx="16" cy="16" fill="#D1D5DB" id="Ellipse" r="16" />
        </svg>
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="dashboard-header">
      <TitleGroup />
      <AgentMeta />
    </div>
  );
}

function KpiCard() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-[1_0_42px] flex-col gap-[8px] items-start min-w-px p-[20px] relative rounded-[6px]" data-name="kpi-card">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Lịch chờ xác nhận</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[24px] w-full">05</p>
    </div>
  );
}

function KpiCard1() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-[1_0_42px] flex-col gap-[8px] items-start min-w-px p-[20px] relative rounded-[6px]" data-name="kpi-card">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Lịch hôm nay</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[24px] w-full">02</p>
    </div>
  );
}

function KpiCard2() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-[1_0_42px] flex-col gap-[8px] items-start min-w-px p-[20px] relative rounded-[6px]" data-name="kpi-card">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Đã xác nhận</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[24px] w-full">18</p>
    </div>
  );
}

function KpiCard3() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-[1_0_42px] flex-col gap-[8px] items-start min-w-px p-[20px] relative rounded-[6px]" data-name="kpi-card">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Đã hoàn thành</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[24px] w-full">124</p>
    </div>
  );
}

function KpiRow() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="kpi-row">
      <KpiCard />
      <KpiCard1 />
      <KpiCard2 />
      <KpiCard3 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex items-start justify-between p-[12px] relative shrink-0 w-full" data-name="table-header">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] w-[150px]">KHÁCH HÀNG</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] w-[180px]">DỰ ÁN</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] w-[100px]">NGÀY</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] w-[80px]">GIỜ</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] w-[120px]">TRẠNG THÁI</p>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[11px] text-right w-[200px]">THAO TÁC</p>
    </div>
  );
}

function StatusPill() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="status-pill">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[11px] whitespace-nowrap">Chờ xác nhận</p>
    </div>
  );
}

function StatusCell() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[120px]" data-name="status-cell">
      <StatusPill />
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[#374151] content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">Xác nhận</p>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Từ chối</p>
    </div>
  );
}

function ActionCell() {
  return (
    <div className="content-stretch flex gap-[6px] items-start justify-end relative shrink-0 w-[200px]" data-name="action-cell">
      <Button15 />
      <Button16 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-center justify-between p-[12px] relative shrink-0 w-full" data-name="row-0">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] w-[150px]">Nguyễn Văn A</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] w-[180px]">Vinhomes Grand Park</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[100px]">24/10/2023</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[80px]">14:00</p>
      <StatusCell />
      <ActionCell />
    </div>
  );
}

function StatusPill1() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="status-pill">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[11px] whitespace-nowrap">Đã xác nhận</p>
    </div>
  );
}

function StatusCell1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[120px]" data-name="status-cell">
      <StatusPill1 />
    </div>
  );
}

function Button17() {
  return (
    <div className="bg-[#374151] content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">Hoàn thành</p>
    </div>
  );
}

function ActionCell1() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-[200px]" data-name="action-cell">
      <Button17 />
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex items-center justify-between p-[12px] relative shrink-0 w-full" data-name="row-1">
      <div aria-hidden className="absolute border-[#d1d5db] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] w-[150px]">Phan Thị B</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] w-[180px]">Masteri Thảo Điền</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[100px]">25/10/2023</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[80px]">10:30</p>
      <StatusCell1 />
      <ActionCell1 />
    </div>
  );
}

function StatusPill2() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="status-pill">
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[11px] whitespace-nowrap">Đã hoàn thành</p>
    </div>
  );
}

function StatusCell2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[120px]" data-name="status-cell">
      <StatusPill2 />
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0" data-name="button">
      <div aria-hidden className="absolute border border-[#9ca3af] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] whitespace-nowrap">Xem</p>
    </div>
  );
}

function ActionCell2() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0 w-[200px]" data-name="action-cell">
      <Button18 />
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex items-center justify-between p-[12px] relative shrink-0 w-full" data-name="row-2">
      <div aria-hidden className="absolute border-0 border-[#d1d5db] border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] w-[150px]">Trần Minh C</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[13px] w-[180px]">Sunrise City Quận 7</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[100px]">22/10/2023</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[80px]">15:00</p>
      <StatusCell2 />
      <ActionCell2 />
    </div>
  );
}

function TableContainer() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="table-container">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <TableHeader />
        <Row1 />
        <Row4 />
        <Row5 />
      </div>
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function TableSection() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px relative w-full" data-name="table-section">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[15px] whitespace-nowrap">Danh sách lịch hẹn mới nhất</p>
      <TableContainer />
    </div>
  );
}

function MainPanel() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] h-full items-start min-w-px p-[32px] relative" data-name="main-panel">
      <DashboardHeader />
      <KpiRow />
      <TableSection />
    </div>
  );
}

function ScreenSaleDashboard() {
  return (
    <div className="bg-white h-[640px] relative rounded-[8px] shrink-0 w-full" data-name="screen-sale-dashboard">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Sidebar />
        <MainPanel />
      </div>
      <div aria-hidden className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

type Step = 1 | 2 | 3 | 4;

function getStepFromHash(): Step {
  const value = Number(window.location.hash.replace("#step-", ""));
  return value === 2 || value === 3 || value === 4 ? value : 1;
}

function StepNavigation({ activeStep }: { activeStep: Step }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center pb-[32px] relative shrink-0" data-name="step-navigation">
      {[1, 2, 3, 4].map((step) => (
        <a
          className={`content-stretch flex items-center justify-center px-[20px] py-[10px] relative rounded-[6px] text-[13px] ${activeStep === step ? "bg-[#374151] text-white" : "bg-white text-[#6b7280]"}`}
          href={`#step-${step}`}
          key={step}
        >
          BƯỚC {step}
        </a>
      ))}
    </div>
  );
}

function StepFrame({ activeStep }: { activeStep: Step }) {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name={`step-frame-${activeStep}`}>
      {activeStep === 1 && <ScreenHome />}
      {activeStep === 2 && <ScreenBooking />}
      {activeStep === 3 && <ScreenMyBookings />}
      {activeStep === 4 && <ScreenSaleDashboard />}
    </div>
  );
}

export default function Canvas() {
  const [activeStep, setActiveStep] = useState<Step>(1);

  useEffect(() => {
    const updateStep = () => setActiveStep(getStepFromHash());
    updateStep();
    window.addEventListener("hashchange", updateStep);
    return () => window.removeEventListener("hashchange", updateStep);
  }, []);

  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-center relative w-full" data-name="canvas">
      <StepFrame activeStep={activeStep} />
    </div>
  );
}