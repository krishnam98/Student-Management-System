import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createDefaultAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.log("Admin credentials not provided in env");
    return;
  }

  const existingAdmin = await User.findOne({
    email: adminEmail,
    role: "ADMIN",
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await User.create({
    email: adminEmail,
    password: hashedPassword,
    role: "ADMIN",
    department: "ADM",
    dob: "2000-01-01",
  });

  console.log("Default admin created");
};

export const deleteUser = async (email) => {
  await User.deleteOne({ email });
};
