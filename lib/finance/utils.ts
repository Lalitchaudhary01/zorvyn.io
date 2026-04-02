import { openingBalance, sampleTransactions, storageKeys } from "./constants";
import type {
  CategoryBreakdown,
  SortOption,
  Transaction,
  TransactionType,
  TrendPoint,
} from "./types";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatLongDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getMonthLabel(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
  }).format(new Date(`${value}-01`));
}

export function parseStoredTransactions() {
  if (typeof window === "undefined") {
    return sampleTransactions;
  }

  const raw = window.localStorage.getItem(storageKeys.transactions);
  if (!raw) {
    return sampleTransactions;
  }

  try {
    const parsed = JSON.parse(raw) as Transaction[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : sampleTransactions;
  } catch {
    return sampleTransactions;
  }
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function getSortedTransactions(
  transactions: Transaction[],
  sortBy: SortOption,
) {
  return [...transactions].sort((left, right) => {
    if (sortBy === "latest") {
      return new Date(right.date).getTime() - new Date(left.date).getTime();
    }

    if (sortBy === "oldest") {
      return new Date(left.date).getTime() - new Date(right.date).getTime();
    }

    if (sortBy === "highest") {
      return right.amount - left.amount;
    }

    return left.amount - right.amount;
  });
}

export function getFilteredTransactions(
  transactions: Transaction[],
  query: string,
  typeFilter: "all" | TransactionType,
  categoryFilter: string,
  sortBy: SortOption,
) {
  const normalizedQuery = query.trim().toLowerCase();

  return getSortedTransactions(
    transactions.filter((item) => {
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [item.title, item.category, item.account, item.note]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesType && matchesCategory && matchesQuery;
    }),
    sortBy,
  );
}

export function getTotals(transactions: Transaction[]) {
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  return {
    totalIncome,
    totalExpense,
    totalBalance: openingBalance + totalIncome - totalExpense,
  };
}

export function getCategories(transactions: Transaction[]) {
  return Array.from(new Set(transactions.map((item) => item.category))).sort(
    (left, right) => left.localeCompare(right),
  );
}

export function getTrendData(transactions: Transaction[]): TrendPoint[] {
  const monthlyMap = new Map<string, { income: number; expense: number }>();

  [...transactions]
    .sort(
      (left, right) => new Date(left.date).getTime() - new Date(right.date).getTime(),
    )
    .forEach((item) => {
      const monthKey = item.date.slice(0, 7);
      const existing = monthlyMap.get(monthKey) ?? { income: 0, expense: 0 };

      if (item.type === "income") {
        existing.income += item.amount;
      } else {
        existing.expense += item.amount;
      }

      monthlyMap.set(monthKey, existing);
    });

  let runningBalance = openingBalance;

  return Array.from(monthlyMap.entries()).map(([month, totals]) => {
    runningBalance += totals.income - totals.expense;
    return {
      label: getMonthLabel(month),
      value: runningBalance,
    };
  });
}

export function getSpendingByCategory(
  transactions: Transaction[],
): CategoryBreakdown[] {
  return Array.from(
    transactions
      .filter((item) => item.type === "expense")
      .reduce((map, item) => {
        map.set(item.category, (map.get(item.category) ?? 0) + item.amount);
        return map;
      }, new Map<string, number>()),
  )
    .map(([category, total]) => ({ category, total }))
    .sort((left, right) => right.total - left.total)
    .slice(0, 5);
}

export function getMonthlyComparison(transactions: Transaction[]) {
  const monthlyMap = new Map<string, { income: number; expense: number }>();

  [...transactions]
    .sort(
      (left, right) => new Date(left.date).getTime() - new Date(right.date).getTime(),
    )
    .forEach((item) => {
      const monthKey = item.date.slice(0, 7);
      const current = monthlyMap.get(monthKey) ?? { income: 0, expense: 0 };

      if (item.type === "income") {
        current.income += item.amount;
      } else {
        current.expense += item.amount;
      }

      monthlyMap.set(monthKey, current);
    });

  const monthEntries = Array.from(monthlyMap.entries());
  const currentMonth = monthEntries[monthEntries.length - 1]?.[1];
  const previousMonth = monthEntries[monthEntries.length - 2]?.[1];
  const difference = (currentMonth?.expense ?? 0) - (previousMonth?.expense ?? 0);

  return {
    difference,
    direction: (difference <= 0 ? "down" : "up") as "down" | "up",
  };
}
