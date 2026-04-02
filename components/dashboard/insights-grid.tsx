import { formatCurrency } from "@/lib/finance/utils";

type InsightsGridProps = {
  theme: "light" | "dark";
  highestCategory?: {
    category: string;
    total: number;
  };
  monthlyDirection: "up" | "down";
  monthlyDifference: number;
  expenseCoverageRatio: string;
};

export function InsightsGrid({
  theme,
  highestCategory,
  monthlyDirection,
  monthlyDifference,
  expenseCoverageRatio,
}: InsightsGridProps) {
  const isDark = theme === "dark";
  const cardClass = isDark
    ? "rounded-[30px] border border-white/12 bg-slate-950/55 p-5 shadow-[0_24px_80px_rgba(2,8,23,0.28)] backdrop-blur-xl"
    : "rounded-[30px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,247,237,0.92))] p-5 shadow-[0_24px_80px_rgba(148,163,184,0.14)] backdrop-blur-xl";
  const kickerClass = isDark
    ? "text-[0.72rem] font-bold uppercase tracking-[0.16em] text-slate-400"
    : "text-[0.72rem] font-bold uppercase tracking-[0.16em] text-slate-500";
  const titleClass = isDark
    ? "mt-2 text-[clamp(1.2rem,2vw,1.75rem)] font-semibold leading-[1.15] text-white"
    : "mt-2 text-[clamp(1.2rem,2vw,1.75rem)] font-semibold leading-[1.15] text-slate-950";
  const bodyClass = isDark
    ? "mt-4 text-base leading-7 text-slate-200"
    : "mt-4 text-base leading-7 text-slate-700";

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <article className={cardClass}>
        <span className={kickerClass}>Insight 01</span>
        <h3 className={titleClass}>Highest spending category</h3>
        <p className={bodyClass}>
          {highestCategory
            ? `${highestCategory.category} at ${formatCurrency(highestCategory.total)}`
            : "No category data available"}
        </p>
      </article>

      <article className={cardClass}>
        <span className={kickerClass}>Insight 02</span>
        <h3 className={titleClass}>Month-on-month comparison</h3>
        <p className={bodyClass}>
          Expenses are{" "}
          <strong>
            {monthlyDirection} by {formatCurrency(Math.abs(monthlyDifference))}
          </strong>{" "}
          versus last month.
        </p>
      </article>

      <article className={cardClass}>
        <span className={kickerClass}>Insight 03</span>
        <h3 className={titleClass}>Useful observation</h3>
        <p className={bodyClass}>
          Salary and freelance income together cover current expenses{" "}
          {expenseCoverageRatio}, leaving room for savings and investments.
        </p>
      </article>
    </section>
  );
}
