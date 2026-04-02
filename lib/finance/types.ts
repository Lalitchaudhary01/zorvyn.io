export type Role = "viewer" | "admin";
export type TransactionType = "income" | "expense";
export type SortOption = "latest" | "oldest" | "highest" | "lowest";

export type Transaction = {
  id: string;
  date: string;
  title: string;
  amount: number;
  category: string;
  type: TransactionType;
  account: string;
  note?: string;
};

export type DraftTransaction = Omit<Transaction, "id">;

export type TrendPoint = {
  label: string;
  value: number;
};

export type CategoryBreakdown = {
  category: string;
  total: number;
};
