import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "STUDENT"],
      default: "STUDENT",
    },
    department: {
      type: String,
      required: true,
      enum: ["CSE", "ECE", "IT", "ME", "CE", "ADM"],
    },
    dob: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
