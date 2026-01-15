import bcrypt from "bcrypt.js";
import User from "../models/User";
import { sendStudentCredentials } from "../mailUtils/sendStudentCredentials";

export const addStudent = async (req, res) => {
  try {
    const { name, email, password, dept, dob } = req.body;
    if (!name || !email || !password || !dept || !dob) {
      return res.status(400).json("missing details");
    }
    const hashed = await bcrypt.hash(password, 12);
    const student = await User.create({
      name: name,
      email: email,
      password: hashed,
      role: "STUDENT",
      department: dept,
      dob: dob,
    });

    await sendStudentCredentials(email, password);

    return res.json({ student, message: "Student created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = {
      role: "STUDENT",
      $or: [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ],
    };

    const students = await User.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await User.countDocuments(query);

    res.json({
      students,
      totalpages: Math.ceil(total / limit),
      Currentpage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
