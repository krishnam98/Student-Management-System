import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/getStudent/:id", authMiddleware, getStudentProfile);
router.post("/update/:id", authMiddleware, updateStudentProfile);

export default router;
