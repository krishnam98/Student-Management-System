import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import express from "express";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import loginRouter from "./routes/authRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import { createDefaultAdmin, deleteUser } from "./utils/addDefaultAdmin.js";

connectDB().then(() => {
  createDefaultAdmin();
  // deleteUser("krishnamsoni3@gmail.com");
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", loginRouter);
app.use("/api/admin", adminRouter);
app.use("/api/student", studentRouter);

const PORT = process.env.PORT || 5500;
app.listen(PORT, console.log("App is Running on Port: ", PORT));
