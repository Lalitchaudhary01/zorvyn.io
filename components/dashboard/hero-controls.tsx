import { startTransition } from "react";

import type { Role } from "@/lib/finance/types";

type HeroControlsProps = {
  role: Role;
  theme: "light" | "dark";
  onRoleChange: (role: Role) => void;
  onThemeToggle: () => void;
};

export function HeroControls({
  role,
  theme,
  onRoleChange,
  onThemeToggle,
}: HeroControlsProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`relative overflow-hidden rounded-[36px] p-6 backdrop-blur-xl ${
        isDark
          ? "border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(249,115,22,0.08))] shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
          : "border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,237,213,0.92),rgba(204,251,241,0.75))] shadow-[0_24px_80px_rgba(148,163,184,0.18)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl ${
          isDark ? "bg-orange-400/20" : "bg-orange-300/35"
        }`}
      />
      <div
        className={`pointer-events-none absolute bottom-0 right-1/4 h-28 w-28 rounded-full blur-3xl ${
          isDark ? "bg-teal-400/15" : "bg-teal-300/30"
        }`}
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <span
            className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${
              isDark ? "text-teal-300" : "text-teal-700"
            }`}
          >
            Finance Dashboard UI
          </span>
          <div className="space-y-3">
            <h1
              className={`text-4xl font-semibold tracking-tight sm:text-5xl ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              Understand your money flow without opening five different apps.
            </h1>
            <p
              className={`max-w-2xl text-base leading-7 sm:text-lg ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              A clean, responsive dashboard with financial summaries,
              transaction analysis, role-based actions, and a few smart
              insights to make the mock product feel real.
            </p>
          </div>
          <div
            className={`inline-flex flex-wrap items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm ${
              role === "admin"
                ? isDark
                  ? "border-emerald-400/15 bg-emerald-500/15 text-emerald-300"
                  : "border-emerald-200 bg-emerald-100/90 text-emerald-700"
                : isDark
                  ? "border-amber-400/15 bg-amber-500/15 text-amber-300"
                  : "border-amber-200 bg-amber-100/90 text-amber-700"
            }`}
          >
            <span>{role === "admin" ? "Admin access enabled" : "Viewer mode enabled"}</span>
            <span className={`${isDark ? "text-white/50" : "text-slate-400"}`}>•</span>
            <span>
              {role === "admin"
                ? "Add, edit, and manage transactions"
                : "Read-only access for review and analysis"}
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label
            className={`flex min-w-0 flex-col justify-between gap-3 rounded-[24px] p-4 backdrop-blur-md ${
              isDark
                ? "border border-white/10 bg-white/10 shadow-[0_12px_32px_rgba(2,8,23,0.16)] transition hover:-translate-y-0.5"
                : "border border-white/80 bg-white/75 shadow-[0_12px_32px_rgba(148,163,184,0.14)] transition hover:-translate-y-0.5"
            }`}
          >
            <span
              className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${
                isDark ? "text-slate-300" : "text-slate-500"
              }`}
            >
              Role
            </span>
            <select
              className={`w-full appearance-none rounded-[18px] px-4 py-3 text-sm font-medium outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-500/20 ${
                isDark
                  ? "border border-white/15 bg-white/10 text-white"
                  : "border border-slate-200 bg-white text-slate-900"
              }`}
              value={role}
              onChange={(event) =>
                startTransition(() => onRoleChange(event.target.value as Role))
              }
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </label>

          <button
            type="button"
            className={`flex min-w-0 flex-col justify-between gap-3 rounded-[24px] p-4 text-left backdrop-blur-md ${
              isDark
                ? "border border-white/10 bg-white/10 shadow-[0_12px_32px_rgba(2,8,23,0.16)] transition hover:-translate-y-0.5"
                : "border border-white/80 bg-white/75 shadow-[0_12px_32px_rgba(148,163,184,0.14)] transition hover:-translate-y-0.5"
            }`}
            onClick={onThemeToggle}
          >
            <span
              className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${
                isDark ? "text-slate-300" : "text-slate-500"
              }`}
            >
              Appearance
            </span>
            <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              {theme === "dark" ? "Dark mode" : "Light mode"}
            </span>
          </button>

          <div
            className={`flex min-w-0 flex-col justify-between gap-3 rounded-[24px] p-4 backdrop-blur-md ${
              isDark
                ? "border border-white/10 bg-white/10 shadow-[0_12px_32px_rgba(2,8,23,0.16)]"
                : "border border-white/80 bg-white/75 shadow-[0_12px_32px_rgba(148,163,184,0.14)]"
            }`}
          >
            <span
              className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${
                isDark ? "text-slate-300" : "text-slate-500"
              }`}
            >
              Permissions
            </span>
            <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              {role === "admin"
                ? "Can add and edit transactions"
                : "Read-only dashboard access"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
