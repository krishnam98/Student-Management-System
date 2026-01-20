import express from "express";
import { changePassword, login } from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/changePassword", authMiddleware, changePassword);

export default router;
