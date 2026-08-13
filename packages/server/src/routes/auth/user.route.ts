import { Router } from "express";
import { editUser, getUser } from "../../controllers/user.controller";
import { authenticateUser } from "../../middlewares";

const router = Router();

router.get("/me", authenticateUser, getUser);
router.put("/update", authenticateUser, editUser);

export default router;
