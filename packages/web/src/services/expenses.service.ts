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
