import User from "../models/User.js";

export const getStudentProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await User.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.json({ student });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = req.body;
    const student = await User.findById(id);
    if (!student) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const updatedStudent = await User.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.json({ updatedStudent });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};
