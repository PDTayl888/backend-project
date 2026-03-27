const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "USER EXISTS" });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "USER REGISTERED", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "SERVER ERROR", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "EMAIL INVALID" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "PASSWORD INVALID" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

module.exports = router;
