import type { SortOption, Transaction, TransactionType } from "@/lib/finance/types";
import { formatCurrency, formatLongDate } from "@/lib/finance/utils";

type TransactionsSectionProps = {
  role: "viewer" | "admin";
  theme: "light" | "dark";
  categories: string[];
  query: string;
  typeFilter: "all" | TransactionType;
  categoryFilter: string;
  sortBy: SortOption;
  transactions: Transaction[];
  onQueryChange: (value: string) => void;
  onTypeFilterChange: (value: "all" | TransactionType) => void;
  onCategoryFilterChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onResetFilters: () => void;
  onAddTransaction: () => void;
  onEditTransaction: (transaction: Transaction) => void;
  onExportCsv: () => void;
  onExportJson: () => void;
};

export function TransactionsSection({
  role,
  theme,
  categories,
  query,
  typeFilter,
  categoryFilter,
  sortBy,
  transactions,
  onQueryChange,
  onTypeFilterChange,
  onCategoryFilterChange,
  onSortChange,
  onResetFilters,
  onAddTransaction,
  onEditTransaction,
  onExportCsv,
  onExportJson,
}: TransactionsSectionProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`rounded-[30px] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl ${
        isDark
          ? "border border-white/12 bg-slate-950/60 text-slate-100"
          : "border border-white/12 bg-white/85 text-slate-900"
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>Transactions</span>
          <h2 className={`mt-2 text-[clamp(1.2rem,2vw,1.75rem)] font-semibold leading-[1.15] ${isDark ? "text-white" : "text-slate-950"}`}>Explore activity and adjust the view</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {role === "admin" ? (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#f97316,#0f766e)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,118,110,0.2)] transition hover:-translate-y-0.5"
              onClick={onAddTransaction}
            >
              Add transaction
            </button>
          ) : (
            <button
              type="button"
              className={`inline-flex cursor-not-allowed items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${
                isDark ? "bg-slate-800 text-slate-400" : "bg-slate-200 text-slate-500"
              }`}
              disabled
            >
              Viewer mode
            </button>
          )}
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
              isDark
                ? "border-white/10 bg-white/5 text-slate-200"
                : "border-slate-200 bg-white text-slate-700"
            }`}
            onClick={onExportCsv}
          >
            Export CSV
          </button>
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
              isDark
                ? "border-white/10 bg-white/5 text-slate-200"
                : "border-slate-200 bg-white text-slate-700"
            }`}
            onClick={onExportJson}
          >
            Export JSON
          </button>
        </div>
      </div>

      <div
        className={`mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border px-4 py-3 ${
          role === "admin"
            ? isDark
              ? "border-emerald-500/20 bg-emerald-500/10"
              : "border-emerald-200 bg-emerald-50"
            : isDark
              ? "border-amber-500/20 bg-amber-500/10"
              : "border-amber-200 bg-amber-50"
        }`}
      >
        <div>
          <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
            {role === "admin" ? "Admin actions unlocked" : "Viewer restrictions active"}
          </p>
          <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {role === "admin"
              ? "You can add new records, edit existing transactions, and export the filtered dataset."
              : "You can explore and filter the data, but transaction editing is disabled for this role."}
          </p>
        </div>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
            role === "admin"
              ? isDark
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-emerald-100 text-emerald-700"
              : isDark
                ? "bg-amber-500/15 text-amber-300"
                : "bg-amber-100 text-amber-700"
          }`}
        >
          {role}
        </span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="flex min-w-0 flex-col gap-2.5 xl:col-span-2">
          <span className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>Search</span>
          <input
            className={`w-full rounded-[18px] border px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 ${
              isDark
                ? "border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                : "border-slate-200 bg-white text-slate-900"
            }`}
            placeholder="Search title, account, category..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>

        <label className="flex min-w-0 flex-col gap-2.5">
          <span className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>Type</span>
          <select
            className={`w-full appearance-none rounded-[18px] border px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 ${
              isDark
                ? "border-white/10 bg-white/5 text-white"
                : "border-slate-200 bg-white text-slate-900"
            }`}
            value={typeFilter}
            onChange={(event) =>
              onTypeFilterChange(event.target.value as "all" | TransactionType)
            }
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-2.5">
          <span className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>Category</span>
          <select
            className={`w-full appearance-none rounded-[18px] border px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 ${
              isDark
                ? "border-white/10 bg-white/5 text-white"
                : "border-slate-200 bg-white text-slate-900"
            }`}
            value={categoryFilter}
            onChange={(event) => onCategoryFilterChange(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-2.5">
          <span className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>Sort</span>
          <select
            className={`w-full appearance-none rounded-[18px] border px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 ${
              isDark
                ? "border-white/10 bg-white/5 text-white"
                : "border-slate-200 bg-white text-slate-900"
            }`}
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
          >
            <option value="latest">Latest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest amount</option>
            <option value="lowest">Lowest amount</option>
          </select>
        </label>

        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-full border border-dashed px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
            isDark ? "border-white/15 text-slate-300" : "border-slate-300 text-slate-600"
          }`}
          onClick={onResetFilters}
        >
          Reset filters
        </button>
      </div>

      <div className={`mt-6 overflow-hidden rounded-[28px] border ${isDark ? "border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" : "border-slate-200/80 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"}`}>
        <div className={`hidden grid-cols-[1.1fr_0.75fr_0.8fr_0.6fr_0.65fr_0.55fr] gap-4 border-b px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] md:grid ${isDark ? "border-white/10 text-slate-400" : "border-slate-200 text-slate-500"}`}>
          <span>Transaction</span>
          <span>Date</span>
          <span>Category</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Action</span>
        </div>

        {transactions.length > 0 ? (
          <div className={isDark ? "divide-y divide-white/10" : "divide-y divide-slate-200"}>
            {transactions.map((item) => (
              <div
                key={item.id}
                className={`grid gap-3 px-5 py-4 transition md:grid-cols-[1.1fr_0.75fr_0.8fr_0.6fr_0.65fr_0.55fr] md:items-center ${
                  isDark ? "hover:bg-white/[0.03]" : "hover:bg-slate-50/80"
                }`}
              >
                <div>
                  <p className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{item.title}</p>
                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{item.account}</p>
                </div>
                <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>{formatLongDate(item.date)}</span>
                <span className={`inline-flex justify-self-start rounded-full px-3 py-1.5 text-xs font-bold ${isDark ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-700"}`}>
                  {item.category}
                </span>
                <span
                  className={
                    item.type === "income"
                      ? isDark
                        ? "inline-flex items-center justify-center rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-300"
                        : "inline-flex items-center justify-center rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700"
                      : isDark
                        ? "inline-flex items-center justify-center rounded-full bg-orange-500/15 px-3 py-1.5 text-xs font-bold text-orange-300"
                        : "inline-flex items-center justify-center rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold text-orange-700"
                  }
                >
                  {item.type}
                </span>
                <strong
                  className={item.type === "income" ? (isDark ? "text-emerald-300" : "text-emerald-600") : isDark ? "text-orange-300" : "text-orange-600"}
                >
                  {item.type === "income" ? "+" : "-"}
                  {formatCurrency(item.amount)}
                </strong>
                <div>
                  {role === "admin" ? (
                    <button
                      type="button"
                      className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                        isDark
                          ? "bg-teal-500/10 text-teal-300 hover:bg-teal-500/15 hover:text-teal-200"
                          : "bg-teal-50 text-teal-700 hover:bg-teal-100 hover:text-teal-900"
                      }`}
                      onClick={() => onEditTransaction(item)}
                    >
                      Edit
                    </button>
                  ) : (
                    <span className={`text-sm font-medium ${isDark ? "text-amber-300" : "text-amber-600"}`}>
                      Locked
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 p-8 text-center">
            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>No transactions match the current view.</h3>
            <p className={isDark ? "text-slate-400" : "text-slate-500"}>
              Try clearing filters, adjusting the search query, or add a new
              transaction if you are in admin mode.
            </p>
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                isDark
                  ? "border-white/15 bg-white/8 text-slate-200"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
              onClick={onResetFilters}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
