import { Router } from "express";
import { getUser } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares";

const router = Router();

router.get("/info", authenticateUser, getUser);

export default router;
