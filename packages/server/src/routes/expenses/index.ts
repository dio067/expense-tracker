import { Router } from "express";
import expenseRouter from "./expenses.route";
import { apiLimiter } from "@/middlewares";

const router = Router();

router.use(apiLimiter, expenseRouter);

export default router;
