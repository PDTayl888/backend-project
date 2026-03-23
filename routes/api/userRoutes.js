const express = require("express");
import { jwt } from 'jsonwebtoken';
const router = express.Router();
const Product = require("../models/Product");
const bcrypt = require('bcrypt');


router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

