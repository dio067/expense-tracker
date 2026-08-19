export interface Expense {
  id: number;
  description: string;
  amount: number | null;
  category: string;
  createdAt: string;
}

export interface createExpensePayload {
  amount: number | null;
  category: string | null;
  description: string;
}

export type updateExpensePayload = Partial<createExpensePayload>;
