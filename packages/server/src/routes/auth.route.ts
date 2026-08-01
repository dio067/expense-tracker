import { Router, Request, Response } from "express";
import { authenticateUser } from "../middlewares";
import { logout } from "../controllers";

const router = Router();

router.post("/logout", authenticateUser, logout);

export default router;
