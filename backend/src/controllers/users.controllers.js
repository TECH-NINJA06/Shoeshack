import mongoose from "mongoose";
import User from "../models/user.models.js";

const registerUser = async (req, res) => {
  try {
    const { email, fullName, password, avatar } = req.body;

    // Validate fields
    if (!email) {
      throw new Error("Email is required");
    }
    if (!fullName) {
      throw new Error("FullName is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    // Check if user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(422).json({ err: "User already exists" });
    }
    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      avatar: avatar || "",
    });

    const createdUser = await user.save();

    if (!createdUser) {
      throw new Error("Something went wrong while registering the user");
    }
    return res.status(201).json({
      status: "success",
      data: createdUser,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

export default registerUser;
