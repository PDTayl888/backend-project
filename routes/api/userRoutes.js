const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser) {
        return res.status(400).json({ message: 'USER EXISTS' })
    }
     const user = await User.create({ username, email, password });
     res.status(201).json({ message: 'USER EGISTERED', userId: user._id});
    } catch (err) {
        res.status(500).json({ message: 'SERVER ERROR', error: err.message});
    }
});

router.post("/", async (req, res) => {
});

module.exports = router;

