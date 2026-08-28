import { Router } from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import { apiLimiter, authLimiter } from "../../middlewares";

const router = Router();

router.use(authLimiter, authRoutes);
router.use(apiLimiter, userRoutes);

export default router;
