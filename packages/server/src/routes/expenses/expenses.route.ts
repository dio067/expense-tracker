import {
  addExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../../controllers";
import { authenticateUser } from "../../middlewares";
import { Router } from "express";

const router = Router();

router.use(authenticateUser);

router.get("/", getExpenses);
router.get("/:id/", getExpense);
router.post("/", addExpense);
router.delete("/:id/", deleteExpense);
router.put("/:id/", updateExpense);

export default router;
