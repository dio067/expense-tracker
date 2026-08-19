import { Router } from "express";
import expenseRouter from "./expenses.route";

const router = Router();

router.use(expenseRouter);

export default router;
