import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";
import { getStudents } from "../controllers/adminController";

const router = express.Router();

router.get("/students", authMiddleware, isAdmin, getStudents);
router.post("/addStudent", authMiddleware, isAdmin, addStudent);

export default router;
