import { Router } from "express";
import { authenticateUser, refreshTokenValidation } from "../middlewares";
import { login, logout, refreshToken, register } from "../controllers";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authenticateUser, logout);
router.post("/refresh-token", refreshTokenValidation, refreshToken);

export default router;
