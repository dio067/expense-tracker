import { Router } from "express";
import authRouter from "./auth";
import healthRouter from "./health.route";
import expensesRouter from "./expenses";
const router = Router();

router.use("/auth", authRouter);
router.use("/expenses", expensesRouter);
router.use("/", healthRouter);

export default router;
