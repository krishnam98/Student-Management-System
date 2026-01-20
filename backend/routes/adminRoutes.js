import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { addStudent, getStudents } from "../controllers/adminController.js";

const router = express.Router();

router.get("/students", authMiddleware, isAdmin, getStudents);
router.post("/addStudent", authMiddleware, isAdmin, addStudent);

export default router;
