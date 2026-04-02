import type { CategoryBreakdown, TrendPoint } from "@/lib/finance/types";
import { formatCurrency } from "@/lib/finance/utils";

export function LineChart({ data }: { data: TrendPoint[] }) {
  if (!data.length) {
    return (
      <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-center text-slate-400">
        <p>No trend data available for the current selection.</p>
      </div>
    );
  }

  const width = 520;
  const height = 220;
  const padding = 24;
  const values = data.map((item) => item.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data.map((item, index) => {
    const x =
      padding +
      (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
    const y =
      height -
      padding -
      ((item.value - min) / range) * (height - padding * 2);

    return { ...item, x, y };
  });

  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-60 w-full">
        <defs>
          <linearGradient id="trendStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
        </defs>
        {points.map((point) => (
          <line
            key={`${point.label}-grid`}
            x1={point.x}
            y1={height - padding}
            x2={point.x}
            y2={padding}
            stroke="rgba(148, 163, 184, 0.14)"
            strokeDasharray="3 6"
          />
        ))}
        <polyline
          fill="none"
          stroke="url(#trendStroke)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polyline}
        />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="7" fill="#fff7ed" />
            <circle cx={point.x} cy={point.y} r="4.5" fill="#ea580c" />
            <text
              x={point.x}
              y={height - 4}
              textAnchor="middle"
              className="fill-slate-400 text-[11px]"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex items-center justify-between gap-4 text-slate-400">
        <span>Balance trend</span>
        <strong className="text-white">{formatCurrency(data[data.length - 1]?.value ?? 0)}</strong>
      </div>
    </div>
  );
}

export function CategoryChart({ data }: { data: CategoryBreakdown[] }) {
  if (!data.length) {
    return (
      <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-center text-slate-400">
        <p>No expense categories available right now.</p>
      </div>
    );
  }

  const max = Math.max(...data.map((item) => item.total));

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.category} className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-slate-200">{item.category}</span>
            <span className="text-slate-400">{formatCurrency(item.total)}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#fb923c,#14b8a6)]"
              style={{ width: `${Math.max((item.total / max) * 100, 8)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
