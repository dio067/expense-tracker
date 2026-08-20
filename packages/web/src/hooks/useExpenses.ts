import { useExpenseStore } from "@/store/expense.store";
import { expenseService } from "@/services/expenses.service";
import type { createExpensePayload, updateExpensePayload } from "@/types";

export const useExpenses = () => {
  const {
    expenses,
    selectedExpense,
    isLoading,
    error,
    setIsLoading,
    setError,
    addExpense,
    setExpenses,
    setSelectedExpense,
    editExpense,
    removeExpense,
  } = useExpenseStore();
  const createExpense = async (payload: createExpensePayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await expenseService.create(payload);
      addExpense(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      setError("Failed to create expense");
    } finally {
      setIsLoading(false);
    }
  };
  const readExpense = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await expenseService.read(id);
      setSelectedExpense(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      setError("Failed to read data");
    } finally {
      setIsLoading(false);
    }
  };
  const readExpenses = async () => {
    setIsLoading(true);
    setError(null);
