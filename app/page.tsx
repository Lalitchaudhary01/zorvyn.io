"use client";

import { startTransition, useDeferredValue, useEffect, useState, type FormEvent } from "react";

import { CategoryChart, LineChart } from "@/components/dashboard/charts";
import { HeroControls } from "@/components/dashboard/hero-controls";
import { InsightsGrid } from "@/components/dashboard/insights-grid";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { TransactionModal } from "@/components/dashboard/transaction-modal";
import { TransactionsSection } from "@/components/dashboard/transactions-section";
import {
  createEmptyDraft,
  sampleTransactions,
  storageKeys,
} from "@/lib/finance/constants";
import type {
  DraftTransaction,
  Role,
  SortOption,
  Transaction,
  TransactionType,
} from "@/lib/finance/types";
import {
  downloadFile,
  formatCompactCurrency,
  getCategories,
  getFilteredTransactions,
  getMonthlyComparison,
  getSpendingByCategory,
  getTotals,
  getTrendData,
  parseStoredTransactions,
} from "@/lib/finance/utils";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [role, setRole] = useState<Role>("admin");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | TransactionType>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftTransaction>(createEmptyDraft());

  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTransactions(parseStoredTransactions());

      const storedRole = window.localStorage.getItem(storageKeys.role) as Role | null;
      const storedTheme = window.localStorage.getItem(storageKeys.theme) as
        | "light"
        | "dark"
        | null;

      if (storedRole === "viewer" || storedRole === "admin") {
        setRole(storedRole);
      }

      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.transactions, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    window.localStorage.setItem(storageKeys.role, role);
  }, [role]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(storageKeys.theme, theme);
  }, [theme]);

  const categories = getCategories(transactions);
  const filteredTransactions = getFilteredTransactions(
    transactions,
    deferredQuery,
    typeFilter,
    categoryFilter,
    sortBy,
  );
  const { totalBalance, totalIncome, totalExpense } = getTotals(transactions);
  const trendData = getTrendData(transactions);
  const spendingByCategory = getSpendingByCategory(transactions);
  const highestSpendingCategory = spendingByCategory[0];
  const { difference: monthlyExpenseDifference, direction: monthlyExpenseDirection } =
    getMonthlyComparison(transactions);

  const recentExpenses = filteredTransactions.filter((item) => item.type === "expense");
  const recentIncome = filteredTransactions.filter((item) => item.type === "income");

  function resetFilters() {
    setQuery("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setSortBy("latest");
  }

  function openCreateModal() {
    setEditingId(null);
    setDraft(createEmptyDraft());
    setIsModalOpen(true);
  }

  function openEditModal(transaction: Transaction) {
    setEditingId(transaction.id);
    setDraft({
      date: transaction.date,
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      account: transaction.account,
      note: transaction.note ?? "",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingId(null);
    setDraft(createEmptyDraft());
  }

  function handleRoleChange(nextRole: Role) {
    setRole(nextRole);

    if (nextRole === "viewer" && isModalOpen) {
      setIsModalOpen(false);
      setEditingId(null);
      setDraft(createEmptyDraft());
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (role !== "admin" || !draft.title.trim() || draft.amount <= 0) {
      return;
    }

    const nextTransaction: Transaction = {
      id: editingId ?? crypto.randomUUID(),
      title: draft.title.trim(),
      amount: Number(draft.amount),
      date: draft.date,
      category: draft.category.trim(),
      type: draft.type,
      account: draft.account.trim(),
      note: draft.note?.trim(),
    };

    startTransition(() => {
      setTransactions((current) => {
        if (editingId) {
          return current.map((item) => (item.id === editingId ? nextTransaction : item));
        }

        return [nextTransaction, ...current];
      });
    });

    closeModal();
  }

  function exportCsv() {
    const header = ["Date", "Title", "Category", "Type", "Account", "Amount"];
    const rows = filteredTransactions.map((item) => [
      item.date,
      item.title,
      item.category,
      item.type,
      item.account,
      item.amount.toString(),
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
      .join("\n");

    downloadFile(csv, "finance-dashboard-transactions.csv", "text/csv");
  }

  function exportJson() {
    downloadFile(
      JSON.stringify(filteredTransactions, null, 2),
      "finance-dashboard-transactions.json",
      "application/json",
    );
  }

  return (
    <main className="min-h-screen px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <HeroControls
          role={role}
          theme={theme}
          onRoleChange={handleRoleChange}
          onThemeToggle={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
        />

        <MetricsGrid
          theme={theme}
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          filteredCount={filteredTransactions.length}
          incomeCount={recentIncome.length}
          expenseCount={recentExpenses.length}
        />

        <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <article
            className={`rounded-[30px] p-6 backdrop-blur-xl transition duration-300 ${
              theme === "dark"
                ? "border border-white/12 bg-slate-950/55 shadow-[0_24px_80px_rgba(2,8,23,0.28)] hover:border-white/18"
                : "border border-white/75 bg-white/80 shadow-[0_24px_80px_rgba(148,163,184,0.14)] hover:shadow-[0_28px_90px_rgba(148,163,184,0.18)]"
            }`}
          >
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>Overview</span>
                <h2 className={`mt-2 text-[clamp(1.2rem,2vw,1.75rem)] font-semibold leading-[1.15] ${theme === "dark" ? "text-white" : "text-slate-950"}`}>Balance trend over time</h2>
              </div>
              <span className={`inline-flex items-center justify-center rounded-full px-3.5 py-2 text-xs font-bold ${theme === "dark" ? "bg-teal-500/15 text-teal-300" : "bg-teal-100 text-teal-700"}`}>
                Current: {formatCompactCurrency(totalBalance)}
              </span>
            </div>
            <LineChart data={trendData} />
          </article>

          <article className="rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,#0b1220_0%,#09111d_100%)] p-6 text-slate-100 shadow-[0_24px_80px_rgba(2,8,23,0.28)] backdrop-blur-xl transition duration-300 hover:border-white/18">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-slate-400">Spending Breakdown</span>
                <h2 className="mt-2 text-[clamp(1.2rem,2vw,1.75rem)] font-semibold leading-[1.15] text-white">Top expense categories</h2>
              </div>
              <span className="inline-flex items-center justify-center rounded-full bg-white/8 px-3.5 py-2 text-xs font-bold text-slate-300">
                Expense mix
              </span>
            </div>
            <CategoryChart data={spendingByCategory} />
          </article>
        </section>

        <InsightsGrid
          theme={theme}
          highestCategory={highestSpendingCategory}
          monthlyDirection={monthlyExpenseDirection}
          monthlyDifference={monthlyExpenseDifference}
          expenseCoverageRatio={
            totalExpense > 0 ? `${(totalIncome / totalExpense).toFixed(1)}x` : "comfortably"
          }
        />

        <TransactionsSection
          role={role}
          theme={theme}
          categories={categories}
          query={query}
          typeFilter={typeFilter}
          categoryFilter={categoryFilter}
          sortBy={sortBy}
          transactions={filteredTransactions}
          onQueryChange={setQuery}
          onTypeFilterChange={setTypeFilter}
          onCategoryFilterChange={setCategoryFilter}
          onSortChange={setSortBy}
          onResetFilters={resetFilters}
          onAddTransaction={openCreateModal}
          onEditTransaction={openEditModal}
          onExportCsv={exportCsv}
          onExportJson={exportJson}
        />
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        theme={theme}
        editingId={editingId}
        draft={draft}
        onClose={closeModal}
        onDraftChange={setDraft}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
