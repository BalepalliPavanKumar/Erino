const express = require("express");

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET, COOKIE_NAME, COOKIE_SAMESITE, COOKIE_SECURE, NODE_ENV } = require("../config");

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password });
    return res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: false,         
      sameSite: "lax",     
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ message: "Logged out" });
});


router.get("/me", async (req, res) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select("_id name email");
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.json(user);
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
