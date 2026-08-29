import { z } from "zod";

export const CATEGORIES = [
  "Food",
  "Transport",
  "Clothes",
  "Education",
  "Bills",
  "Other",
] as const;

export const createExpenseSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1).max(300),
  category: z.enum(CATEGORIES),
});

export const updateExpenseSchema = createExpenseSchema.partial();
