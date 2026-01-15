import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import express from "express";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;
app.listen(PORT, console.log("App is Running on Port: ", PORT));
