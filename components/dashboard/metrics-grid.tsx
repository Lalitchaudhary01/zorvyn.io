import { formatCurrency } from "@/lib/finance/utils";

type MetricsGridProps = {
  theme: "light" | "dark";
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  filteredCount: number;
  incomeCount: number;
  expenseCount: number;
};

export function MetricsGrid({
  theme,
  totalBalance,
  totalIncome,
  totalExpense,
  filteredCount,
  incomeCount,
  expenseCount,
}: MetricsGridProps) {
  const isDark = theme === "dark";
  const cardClass = isDark
    ? "group rounded-[30px] border border-white/12 bg-slate-950/55 p-5 shadow-[0_24px_80px_rgba(2,8,23,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/18"
    : "group rounded-[30px] border border-white/75 bg-white/80 p-5 shadow-[0_24px_80px_rgba(148,163,184,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(148,163,184,0.18)]";
  const labelClass = isDark
    ? "text-[0.72rem] font-bold uppercase tracking-[0.16em] text-slate-400"
    : "text-[0.72rem] font-bold uppercase tracking-[0.16em] text-slate-500";
  const valueClass = isDark
    ? "mt-3 block text-[clamp(1.7rem,3vw,2.45rem)] leading-[1.05] text-white"
    : "mt-3 block text-[clamp(1.7rem,3vw,2.45rem)] leading-[1.05] text-slate-950";
  const noteClass = isDark ? "mt-3 text-slate-400" : "mt-3 text-slate-600";

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article className={cardClass}>
        <span className={labelClass}>Total Balance</span>
        <div className={`mt-3 h-1.5 w-14 rounded-full ${isDark ? "bg-white/10" : "bg-slate-200"} transition group-hover:w-20`} />
        <strong className={valueClass}>{formatCurrency(totalBalance)}</strong>
        <p className={noteClass}>Net of income and expenses from sample activity.</p>
      </article>

      <article className={cardClass}>
        <span className={labelClass}>Income</span>
        <div className="mt-3 h-1.5 w-14 rounded-full bg-emerald-500/40 transition group-hover:w-20" />
        <strong className="mt-3 block text-[clamp(1.7rem,3vw,2.45rem)] leading-[1.05] text-emerald-500">
          {formatCurrency(totalIncome)}
        </strong>
        <p className={noteClass}>{incomeCount} income entries visible</p>
      </article>

      <article className={cardClass}>
        <span className={labelClass}>Expenses</span>
        <div className="mt-3 h-1.5 w-14 rounded-full bg-orange-500/40 transition group-hover:w-20" />
        <strong className="mt-3 block text-[clamp(1.7rem,3vw,2.45rem)] leading-[1.05] text-orange-500">
          {formatCurrency(totalExpense)}
        </strong>
        <p className={noteClass}>{expenseCount} expense entries visible</p>
      </article>

      <article className={cardClass}>
        <span className={labelClass}>Filtered Results</span>
        <div className={`mt-3 h-1.5 w-14 rounded-full ${isDark ? "bg-teal-400/30" : "bg-teal-500/25"} transition group-hover:w-20`} />
        <strong className={valueClass}>
          {filteredCount.toString().padStart(2, "0")}
        </strong>
        <p className={noteClass}>
          Search, sort, and category filters update this instantly.
        </p>
      </article>
    </section>
  );
}
