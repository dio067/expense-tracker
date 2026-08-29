import { Router } from "express";
import {
  authenticateUser,
  authLimiter,
  refreshTokenValidation,
  validate,
} from "../../middlewares";
import { login, logout, refreshToken, register } from "../../controllers";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";

const router = Router();

router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/logout", authenticateUser, logout);
router.post("/refresh-token", refreshTokenValidation, refreshToken);

export default router;
