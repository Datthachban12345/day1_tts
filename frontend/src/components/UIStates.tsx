import React from "react";

// ─── Loading Spinner ───────────────────────────────────────────────────────────
export const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  const s = size === "sm" ? "w-4 h-4 border-2" : size === "lg" ? "w-10 h-10 border-4" : "w-6 h-6 border-2";
  return (
    <span
      className={`${s} rounded-full border-gray-200 border-t-red-600 animate-spin inline-block`}
      role="status"
      aria-label="Đang tải..."
    />
  );
};

// ─── Full-screen Loading State ─────────────────────────────────────────────────
export const LoadingState: React.FC<{ message?: string }> = ({
  message = "Đang tải dữ liệu...",
}) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <LoadingSpinner size="lg" />
    <p className="text-sm font-medium text-gray-500">{message}</p>
  </div>
);

// ─── Property Skeleton Card ────────────────────────────────────────────────────
export const PropertySkeletonCard: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
    <div className="h-52 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-5 bg-gray-200 rounded w-1/2" />
      <div className="flex gap-4">
        <div className="h-3 bg-gray-200 rounded w-16" />
        <div className="h-3 bg-gray-200 rounded w-16" />
        <div className="h-3 bg-gray-200 rounded w-16" />
      </div>
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-10 bg-gray-200 rounded mt-2" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-8 bg-gray-200 rounded" />
        <div className="h-8 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

export const PropertySkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <PropertySkeletonCard key={i} />
    ))}
  </div>
);

// ─── Empty State ───────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "📭",
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
    <span className="text-5xl">{icon}</span>
    <h3 className="text-base font-bold text-gray-800">{title}</h3>
    {description && <p className="text-sm text-gray-500 max-w-sm">{description}</p>}
    {action && (
      <button
        onClick={action.onClick}
        className="mt-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
      >
        {action.label}
      </button>
    )}
  </div>
);

// ─── Error State ───────────────────────────────────────────────────────────────
interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Không thể tải dữ liệu. Vui lòng thử lại.",
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
    <span className="text-5xl">⚠️</span>
    <p className="text-sm font-semibold text-gray-700 max-w-sm">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-1 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all"
      >
        Thử lại
      </button>
    )}
  </div>
);

// ─── Inline Alert Banner ───────────────────────────────────────────────────────
type AlertType = "info" | "success" | "warning" | "error";

const alertStyles: Record<AlertType, string> = {
  info:    "bg-blue-50  border-blue-200  text-blue-800",
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  error:   "bg-red-50   border-red-200   text-red-800",
};

const alertIcons: Record<AlertType, string> = {
  info:    "ℹ️",
  success: "✓",
  warning: "⚠️",
  error:   "✕",
};

export const InlineAlert: React.FC<{
  type: AlertType;
  message: string;
  onDismiss?: () => void;
}> = ({ type, message, onDismiss }) => (
  <div
    role="alert"
    className={`flex items-start gap-2 rounded-lg border px-3.5 py-2.5 text-xs font-semibold ${alertStyles[type]}`}
  >
    <span className="shrink-0">{alertIcons[type]}</span>
    <span className="flex-1">{message}</span>
    {onDismiss && (
      <button
        onClick={onDismiss}
        className="shrink-0 opacity-60 hover:opacity-100 font-bold"
        aria-label="Đóng"
      >
        ✕
      </button>
    )}
  </div>
);

// ─── Field Error (inline validation) ──────────────────────────────────────────
export const FieldError: React.FC<{ message: string | null }> = ({ message }) => {
  if (!message) return null;
  return <p className="mt-1 text-[11px] font-semibold text-red-600">{message}</p>;
};

// ─── Booking Status Badge (shared) ────────────────────────────────────────────
import { BookingStatus } from "../types/index.js";

const statusConfig: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  PENDING:   { label: "⏳ Chờ xác nhận",      className: "bg-amber-100 text-amber-800 border-amber-300" },
  CONFIRMED: { label: "✓ Đã xác nhận",         className: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  COMPLETED: { label: "★ Hoàn tất",            className: "bg-blue-100 text-blue-800 border-blue-300" },
  CANCELLED: { label: "✕ Đã hủy",              className: "bg-gray-100 text-gray-700 border-gray-300" },
  REJECTED:  { label: "✕ Sales từ chối",        className: "bg-rose-100 text-rose-800 border-rose-300" },
};

export const StatusBadge: React.FC<{ status: BookingStatus; size?: "sm" | "md" }> = ({
  status,
  size = "md",
}) => {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1 border font-bold rounded-full ${cfg.className} ${
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"
      }`}
    >
      {cfg.label}
    </span>
  );
};

// ─── Step Progress Indicator ───────────────────────────────────────────────────
export const StepIndicator: React.FC<{
  steps: string[];
  currentStep: number;
}> = ({ steps, currentStep }) => (
  <div className="flex items-center gap-0">
    {steps.map((step, idx) => {
      const done    = idx < currentStep;
      const active  = idx === currentStep;
      const pending = idx > currentStep;
      return (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                done    ? "bg-emerald-500 text-white" :
                active  ? "bg-red-600 text-white ring-4 ring-red-100" :
                          "bg-gray-200 text-gray-500"
              }`}
            >
              {done ? "✓" : idx + 1}
            </div>
            <span
              className={`text-[10px] font-bold whitespace-nowrap ${
                active ? "text-red-600" : done ? "text-emerald-600" : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mb-4 mx-1 transition-all ${done ? "bg-emerald-400" : "bg-gray-200"}`} style={{ minWidth: 24 }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);
