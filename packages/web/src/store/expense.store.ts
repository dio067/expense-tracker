import { create } from "zustand";
import type { Expense } from "@/types";

type ExpensesState = {
  expenses: Expense[];
  selectedExpense: Expense | null;
  isLoading: boolean;
  error: string | null;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedExpense: (selectedExpense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  editExpense: (id: number, updated: Partial<Expense>) => void;
  removeExpense: (id: number) => void;
};
export const useExpenseStore = create<ExpensesState>((set) => ({
  expenses: [],
  selectedExpense: null,
  isLoading: false,
  error: null,
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSelectedExpense: (selectedExpense) => set({ selectedExpense }),
  setExpenses: (expenses) => set({ expenses }),
  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
    })),
  editExpense: (id, updated) =>
    set((state) => ({
      expenses: state.expenses.map((exp) =>
        exp.id === id ? { ...exp, ...updated } : exp,
      ),
    })),
  removeExpense: (id) => {
    set((state) => ({
      expenses: state.expenses.filter((exp) => exp.id !== id),
    }));
  },
}));
