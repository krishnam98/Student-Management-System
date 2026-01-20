import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendStudentCredentials } from "../utils/sendStudentCredentials.js";

export const addStudent = async (req, res) => {
  try {
    const { name, email, password, dept, dob } = req.body;
    if (!name || !email || !password || !dept || !dob) {
      return res.status(400).json("missing details");
    }
    const hashed = await bcrypt.hash(password, 12);

    try {
      await sendStudentCredentials(email, password);
      const student = await User.create({
        name: name,
        email: email,
        password: hashed,
        role: "STUDENT",
        department: dept,
        dob: dob,
      });

      return res.json({ student, message: "Student created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
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
      totalPages: Math.ceil(total / limit),
      CurrentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
