import type {
  Expense,
  createExpensePayload,
  updateExpensePayload,
} from "@/types";
import api from "./api";

interface ApiResponse<T> {
  ok: boolean;
  message: string;
  data: T;
}

export const expenseService = {
  create: async (
    payload: createExpensePayload,
  ): Promise<ApiResponse<Expense>> => {
    const res = await api.post("/expenses", payload);
    return res.data;
  },
  read: async (id: number): Promise<ApiResponse<Expense>> => {
    const res = await api.get(`/expenses/${id}`);
    return res.data;
  },
  readAll: async (): Promise<ApiResponse<Expense[]>> => {
    const res = await api.get("/expenses");
    return res.data;
  },
  update: async (
    id: number,
    payload: updateExpensePayload,
  ): Promise<ApiResponse<Expense>> => {
    const res = await api.put(`/expenses/${id}`, payload);
    return res.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/expenses/${id}`);
  },
};
