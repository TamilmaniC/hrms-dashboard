import express from "express";
import bcrypt from "bcrypt"; // ✅ Fixed typo
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/User.js";

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.json({ status: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Signup failed" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User is not registered" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.json({ message: "Incorrect password" });

    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    return res.json({ status: true, message: "Login successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Login failed" });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not registered" });

    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "5m" });
    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.json({ message: "Error sending email" });
      }
      return res.json({ status: true, message: "Email sent" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: false, message: "Invalid or expired token" });
  }
});

// Middleware to verify token
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ status: false, message: "No token found" });

    const decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.json({ status: false, message: "Invalid token" });
  }
};

// Token verification route
router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "Logged out successfully" });
});

export { router as UserRouter };
