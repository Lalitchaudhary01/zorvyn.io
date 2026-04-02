import type { FormEvent } from "react";

import type { DraftTransaction, TransactionType } from "@/lib/finance/types";

type TransactionModalProps = {
  isOpen: boolean;
  theme: "light" | "dark";
  editingId: string | null;
  draft: DraftTransaction;
  onClose: () => void;
  onDraftChange: (draft: DraftTransaction) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function TransactionModal({
  isOpen,
  theme,
  editingId,
  draft,
  onClose,
  onDraftChange,
  onSubmit,
}: TransactionModalProps) {
  if (!isOpen) {
    return null;
  }

  const isDark = theme === "dark";
  const shellClass = isDark
    ? "max-h-[calc(100vh-2rem)] w-full max-w-[760px] overflow-auto rounded-[30px] border border-white/12 bg-slate-950/95 p-6 shadow-[0_24px_80px_rgba(2,8,23,0.45)]"
    : "max-h-[calc(100vh-2rem)] w-full max-w-[760px] overflow-auto rounded-[30px] border border-white/90 bg-white/95 p-6 shadow-[0_24px_80px_rgba(148,163,184,0.22)]";
  const labelClass = isDark
    ? "text-[0.72rem] font-bold uppercase tracking-[0.16em] text-slate-400"
    : "text-[0.72rem] font-bold uppercase tracking-[0.16em] text-slate-500";
  const inputClass = isDark
    ? "w-full rounded-[18px] border border-white/15 bg-white/8 px-4 py-3 text-white outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-500/20"
    : "w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-md">
      <div className={shellClass}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className={labelClass}>Admin action</span>
            <h2
              className={`mt-2 text-[clamp(1.2rem,2vw,1.75rem)] font-semibold leading-[1.15] ${
                isDark ? "text-white" : "text-slate-950"
              }`}
            >
              {editingId ? "Edit transaction" : "Add transaction"}
            </h2>
          </div>
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full border px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
              isDark
                ? "border-dashed border-white/15 text-slate-300 hover:text-white"
                : "border-dashed border-slate-300 text-slate-600 hover:text-slate-950"
            }`}
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <label className="flex min-w-0 flex-col gap-2.5">
            <span className={labelClass}>Title</span>
            <input
              className={inputClass}
              value={draft.title}
              onChange={(event) =>
                onDraftChange({ ...draft, title: event.target.value })
              }
              required
            />
          </label>

          <label className="flex min-w-0 flex-col gap-2.5">
            <span className={labelClass}>Amount</span>
            <input
              type="number"
              min="1"
              className={inputClass}
              value={draft.amount}
              onChange={(event) =>
                onDraftChange({ ...draft, amount: Number(event.target.value) })
              }
              required
            />
          </label>

          <label className="flex min-w-0 flex-col gap-2.5">
            <span className={labelClass}>Date</span>
            <input
              type="date"
              className={inputClass}
              value={draft.date}
              onChange={(event) =>
                onDraftChange({ ...draft, date: event.target.value })
              }
              required
            />
          </label>

          <label className="flex min-w-0 flex-col gap-2.5">
            <span className={labelClass}>Account</span>
            <input
              className={inputClass}
              value={draft.account}
              onChange={(event) =>
                onDraftChange({ ...draft, account: event.target.value })
              }
              required
            />
          </label>

          <label className="flex min-w-0 flex-col gap-2.5">
            <span className={labelClass}>Category</span>
            <input
              className={inputClass}
              value={draft.category}
              onChange={(event) =>
                onDraftChange({ ...draft, category: event.target.value })
              }
              required
            />
          </label>

          <label className="flex min-w-0 flex-col gap-2.5">
            <span className={labelClass}>Type</span>
            <select
              className={`${inputClass} appearance-none`}
              value={draft.type}
              onChange={(event) =>
                onDraftChange({
                  ...draft,
                  type: event.target.value as TransactionType,
                })
              }
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>

          <label className="flex min-w-0 flex-col gap-2.5 md:col-span-2">
            <span className={labelClass}>Note</span>
            <textarea
              className={`${inputClass} min-h-28 resize-none`}
              value={draft.note}
              onChange={(event) =>
                onDraftChange({ ...draft, note: event.target.value })
              }
              placeholder="Optional context for the transaction"
            />
          </label>

          <div className="md:col-span-2 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                isDark
                  ? "border-white/15 bg-white/8 text-white"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#f97316,#0f766e)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,118,110,0.25)] transition hover:-translate-y-0.5"
            >
              {editingId ? "Save changes" : "Create transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
