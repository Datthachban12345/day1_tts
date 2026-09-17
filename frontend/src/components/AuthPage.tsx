import React, { FormEvent, useState } from "react";
import { login, register } from "../services/auth.service.js";
import { UserRole } from "../types/index.js";

interface AuthPageProps {
  initialMode: "login" | "register";
  onAuthenticated: (role: UserRole) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode, onAuthenticated }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const switchMode = (nextMode: "login" | "register") => {
    setMode(nextMode);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        await register({ email, password, fullName, phone });
        setSuccess("Đăng ký thành công. Bạn có thể đăng nhập ngay bây giờ.");
        setMode("login");
        setPassword("");
      } else {
        const response = await login(email, password);
        onAuthenticated(response.user.role);
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không thể kết nối tới hệ thống.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-red-700 via-rose-700 to-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black text-red-700">B</div>
              <div>
                <div className="text-xl font-extrabold">Batdongsan<span className="text-red-200">.booking</span></div>
                <div className="text-xs text-red-100">Home viewing, made simple.</div>
              </div>
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-200">Home Viewing Booking System</p>
            <h1 className="max-w-lg text-4xl font-black leading-tight">Tìm căn nhà phù hợp. Đặt lịch xem trong vài phút.</h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-red-100">Kết nối khách hàng, chuyên viên tư vấn và lịch xem nhà trên một không gian rõ ràng, đáng tin cậy.</p>
          </div>
          <div className="relative z-10 grid grid-cols-3 gap-3 text-xs text-red-100">
            <div className="border-l border-red-300/40 pl-3"><strong className="block text-lg text-white">01</strong>Tìm kiếm</div>
            <div className="border-l border-red-300/40 pl-3"><strong className="block text-lg text-white">02</strong>Chọn lịch</div>
            <div className="border-l border-red-300/40 pl-3"><strong className="block text-lg text-white">03</strong>Xem nhà</div>
          </div>
          <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full border-[40px] border-white/10" />
        </section>

        <section className="flex items-center p-6 sm:p-10 lg:p-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="text-xl font-extrabold text-slate-950">Batdongsan<span className="text-red-600">.booking</span></div>
            </div>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">{mode === "login" ? "Welcome back" : "Get started"}</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">{mode === "login" ? "Đăng nhập tài khoản" : "Tạo tài khoản mới"}</h2>
              <p className="mt-2 text-sm text-slate-500">{mode === "login" ? "Tiếp tục quản lý hành trình xem nhà của bạn." : "Đăng ký để bắt đầu đặt lịch xem nhà."}</p>
            </div>

            <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-bold">
              <button type="button" onClick={() => switchMode("login")} className={`rounded-lg px-3 py-2.5 transition ${mode === "login" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>Đăng nhập</button>
              <button type="button" onClick={() => switchMode("register")} className={`rounded-lg px-3 py-2.5 transition ${mode === "register" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}>Đăng ký</button>
            </div>

            {error && <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}
            {success && <div role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && <>
                <label className="block text-sm font-bold text-slate-700">Họ và tên<input required minLength={2} value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100" placeholder="Nguyễn Văn A" /></label>
                <label className="block text-sm font-bold text-slate-700">Số điện thoại<input required minLength={8} value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100" placeholder="0912345678" /></label>
              </>}
              <label className="block text-sm font-bold text-slate-700">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100" placeholder="you@example.com" /></label>
              <label className="block text-sm font-bold text-slate-700">Mật khẩu<input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100" placeholder="Tối thiểu 6 ký tự" /></label>
              <button disabled={isSubmitting} type="submit" className="w-full rounded-xl bg-red-600 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Đang xử lý..." : mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}</button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};