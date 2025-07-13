import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from '../utils/sendEmail.js';
import dotenv from 'dotenv';
dotenv.config();
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (password.length < 10) {
      return res.status(400).json({ message: "Password must be at least 10 characters long" });
    }

    // Only allow 'admin' role if no admin exists yet
    let userRole = 'user';
    if (role === 'admin') {
      const adminExists = await User.findOne({ role: 'admin' });
      if (!adminExists) {
        userRole = 'admin';
      }
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    await sendEmail({
      to: user.email,
      subject: `Welcome to My Protfolio ${user.name}`,
      text: `Hi ${user.name}, welcome to My Protfolio.\n\nYour account has been successfully created.\n\nYou can now log in using your email and password.\n\nThank you for registering on my portfolio website.\n\nHave a great day! 😄`,
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
