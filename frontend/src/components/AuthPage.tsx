import React, { FormEvent, useState, useMemo } from "react";
import { login, register } from "../services/auth.service.js";
import { UserRole } from "../types/index.js";
import { LoadingSpinner, InlineAlert, FieldError } from "./UIStates.js";

interface AuthPageProps {
  initialMode: "login" | "register";
  onAuthenticated: (role: UserRole) => void;
}

// ─── Demo Accounts ──────────────────────────────────────────────────────────────
const DEMO_ACCOUNTS = [
  {
    role: "CUSTOMER" as UserRole,
    label: "Khách Hàng",
    description: "Demo",
    email: "customer.minh@gmail.com",
    password: "password123",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  },
  {
    role: "SALE" as UserRole,
    label: "Sales",
    description: "Chuyên viên",
    email: "sale.nam@homebooking.vn",
    password: "password123",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
  },
  {
    role: "ADMIN" as UserRole,
    label: "Admin",
    description: "Quản trị",
    email: "admin@homebooking.vn",
    password: "password123",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100",
  },
];

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode, onAuthenticated }) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const switchMode = (nextMode: "login" | "register") => {
    setMode(nextMode);
    setError(null);
    setSuccess(null);
  };

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, text: "", color: "bg-slate-200", width: "0%" };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { score: 1, text: "Yếu", color: "bg-rose-500", width: "25%" };
    if (score === 2) return { score: 2, text: "Trung bình", color: "bg-amber-500", width: "50%" };
    if (score === 3 || score === 4) return { score: 3, text: "Khá", color: "bg-blue-500", width: "75%" };
    return { score: 4, text: "Mạnh", color: "bg-emerald-500", width: "100%" };
  }, [password]);

  // Handle 1-click Demo Fill
  const handleFillDemo = (demo: typeof DEMO_ACCOUNTS[0]) => {
    setMode("login");
    setEmail(demo.email);
    setPassword(demo.password);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (mode === "register") {
      if (password !== confirmPassword) {
        setError("Mật khẩu xác nhận không khớp.");
        return;
      }
      if (!agreeTerms) {
        setError("Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      if (mode === "register") {
        await register({ email, password, fullName, phone });
        setSuccess("Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.");
        setMode("login");
        setPassword("");
        setConfirmPassword("");
      } else {
        const response = await login(email, password);
        onAuthenticated(response.user.role);
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Không thể kết nối tới máy chủ. Vui lòng thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-red-50/40 px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center font-sans text-slate-800 antialiased">
      {/* Background Soft Blurs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-red-100/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto grid min-h-[620px] max-w-5xl w-full overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-200/80 lg:grid-cols-[1fr_1.05fr]">

        {/* ── LEFT PANE: BRANDING & HERO ── */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-red-600 via-rose-600 to-red-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          {/* Subtle Geometric Overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-black/10 rounded-full blur-xl pointer-events-none" />

          {/* Top Brand Logo */}
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl font-black text-red-600 shadow-md">
                B
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-white">
                  Batdongsan<span className="text-red-200">.booking</span>
                </div>
                <div className="text-xs text-red-100">
                  Đặt lịch xem nhà trực tuyến hàng đầu
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              Nền tảng xem nhà thế hệ mới
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-white">
              Tìm căn nhà mơ ước.<br />
              <span className="text-red-100">
                Đặt lịch xem chỉ trong 60 giây.
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-red-50 max-w-sm">
              Kết nối trực tiếp khách hàng và chuyên viên tư vấn BĐS, đối soát ca rảnh tức thì và bảo vệ lịch hẹn an toàn.
            </p>

            {/* Feature Cards */}
            <div className="space-y-2.5 pt-2 max-w-sm">
              {[
                { icon: "🛡️", title: "Chống trùng lịch 100%", desc: "Tự động khóa slot khi có khách đặt thành công." },
                { icon: "📜", title: "Lịch sử kiểm toán minh bạch", desc: "Theo dõi trọn vẹn từng mốc xác nhận của Sales." },
                { icon: "⚡", title: "Xác nhận tức thì", desc: "Thông báo trạng thái thời gian thực đến khách hàng." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                  <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{item.title}</div>
                    <div className="text-xs text-red-100">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 pt-6 border-t border-white/20 grid grid-cols-3 gap-3 text-left">
            <div>
              <div className="text-2xl font-bold text-white">5,000+</div>
              <div className="text-[10px] text-red-200">Lượt Xem Nhà</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">99.8%</div>
              <div className="text-[10px] text-red-200">Đúng Giờ Hẹn</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4.9/5</div>
              <div className="text-[10px] text-red-200">Đánh Giá Sales</div>
            </div>
          </div>
        </section>

        {/* ── RIGHT PANE: AUTH FORM ── */}
        <section className="flex flex-col justify-between p-6 sm:p-10 lg:p-11 overflow-y-auto bg-white">
          <div className="mx-auto w-full max-w-md my-auto space-y-5">

            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-red-600">
                  {mode === "login" ? "Chào mừng trở lại" : "Khởi tạo tài khoản"}
                </span>
                <span className="text-xs text-slate-400">Bảo mật SSL 256-bit</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                {mode === "login" ? "Đăng Nhập" : "Đăng Ký Tài Khoản"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {mode === "login"
                  ? "Nhập thông tin hoặc chọn tài khoản Demo bên dưới."
                  : "Đăng ký tài khoản để bắt đầu đặt lịch xem nhà miễn phí."}
              </p>
            </div>

            {/* Tab Pill Switcher */}
            <div className="grid grid-cols-2 rounded-2xl bg-slate-100 p-1 text-sm font-medium border border-slate-200/70">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`py-2.5 rounded-xl transition-all duration-150 ${
                  mode === "login"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Đăng Nhập
              </button>
              <button
                type="button"
                onClick={() => switchMode("register")}
                className={`py-2.5 rounded-xl transition-all duration-150 ${
                  mode === "register"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Đăng Ký Mới
              </button>
            </div>

            {/* Demo Accounts */}
            {mode === "login" && (
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Đăng nhập nhanh với Demo:</span>
                  <span className="text-xs text-red-600">1-Click</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  {DEMO_ACCOUNTS.map((demo) => (
                    <button
                      key={demo.role}
                      type="button"
                      onClick={() => handleFillDemo(demo)}
                      className={`px-2.5 py-2 rounded-xl text-left border text-xs transition-all flex flex-col justify-between ${demo.badgeColor}`}
                    >
                      <span className="font-medium truncate">{demo.label}</span>
                      <span className="text-[10px] text-slate-500 truncate mt-0.5">{demo.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Status Alerts */}
            {error && <InlineAlert type="error" message={error} onDismiss={() => setError(null)} />}
            {success && <InlineAlert type="success" message={success} onDismiss={() => setSuccess(null)} />}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <>
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">
                      Họ và tên
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">👤</span>
                      <input
                        required
                        minLength={2}
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-700">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">📞</span>
                      <input
                        required
                        minLength={8}
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                        placeholder="0912 345 678"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Địa chỉ Email
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">✉️</span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">
                    Mật khẩu
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔒</span>
                  <input
                    required
                    minLength={6}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50/70 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                    placeholder="Tối thiểu 6 ký tự"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded hover:bg-slate-100 transition-colors"
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {mode === "register" && password.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Độ mạnh:</span>
                      <span className="font-medium text-slate-700">{passwordStrength.text}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: passwordStrength.width }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              {mode === "register" && (
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-700">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔒</span>
                    <input
                      required
                      minLength={6}
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-10 pr-11 py-2.5 bg-slate-50/70 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 transition-all outline-none ${
                        confirmPassword && password !== confirmPassword
                          ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100"
                          : "border-slate-200 focus:border-red-500 focus:ring-red-100"
                      }`}
                      placeholder="Nhập lại mật khẩu"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded hover:bg-slate-100 transition-colors"
                    >
                      {showConfirmPassword ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <FieldError message="Mật khẩu xác nhận chưa khớp." />
                  )}
                </div>
              )}

              {/* Checkboxes */}
              <div>
                {mode === "login" ? (
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                    />
                    <span>Duy trì đăng nhập trên thiết bị này</span>
                  </label>
                ) : (
                  <label className="flex items-start gap-2.5 cursor-pointer text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500 mt-0.5"
                    />
                    <span>
                      Tôi đồng ý với{" "}
                      <a href="#" className="font-medium text-red-600 hover:underline">
                        Điều khoản dịch vụ
                      </a>{" "}
                      và{" "}
                      <a href="#" className="font-medium text-red-600 hover:underline">
                        Chính sách bảo mật
                      </a>.
                    </span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md shadow-red-600/20 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Đang xử lý...</span>
                  </>
                ) : mode === "login" ? (
                  "Đăng Nhập"
                ) : (
                  "Tạo Tài Khoản"
                )}
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-slate-400">Hoặc tiếp tục với</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-sm font-medium text-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-sm font-medium text-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.36-.58.67-1.08 1.74-.95 2.77 1 .08 2.04-.51 2.67-1.28z"/>
                </svg>
                Apple
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-100">
            © 2026 Batdongsan.booking · Home Viewing Booking System
          </div>
        </section>
      </div>

      {/* ── FORGOT PASSWORD MODAL ── */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-slate-900">Khôi Phục Mật Khẩu</h3>
              <button
                onClick={() => { setShowForgotModal(false); setForgotSubmitted(false); }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {forgotSubmitted ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl mx-auto">
                  ✓
                </div>
                <h4 className="font-medium text-slate-900">Đã gửi hướng dẫn khôi phục!</h4>
                <p className="text-sm text-slate-500">
                  Vui lòng kiểm tra hòm thư <strong>{forgotEmail}</strong> để tiến hành đặt lại mật khẩu.
                </p>
                <button
                  onClick={() => { setShowForgotModal(false); setForgotSubmitted(false); }}
                  className="w-full py-2.5 bg-slate-900 text-white font-medium rounded-xl text-sm hover:bg-slate-800"
                >
                  Quay lại đăng nhập
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSubmitted(true);
                }}
                className="space-y-3"
              >
                <p className="text-sm text-slate-500">
                  Nhập địa chỉ email liên kết với tài khoản của bạn để nhận liên kết đặt lại mật khẩu.
                </p>
                <input
                  required
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-xl text-sm hover:bg-slate-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl text-sm hover:bg-red-700"
                  >
                    Gửi liên kết
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
