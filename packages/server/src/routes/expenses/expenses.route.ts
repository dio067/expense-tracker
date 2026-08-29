import {
  addExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../../controllers";
import { validate } from "../../middlewares";
import { authenticateUser } from "../../middlewares";
import { Router } from "express";
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "../../schemas/expenses.schema";

const router = Router();

router.use(authenticateUser);

router.get("/", getExpenses);
router.get("/:id/", getExpense);
router.post("/", validate(createExpenseSchema), addExpense);
router.delete("/:id/", deleteExpense);
router.put("/:id/", validate(updateExpenseSchema), updateExpense);

export default router;
