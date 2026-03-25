const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleWare = require("../../utils/authMiddleware");

router.post("/", authMiddleWare, async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'SERVER ERRRO', error.message });
  }
});

router.get("/", authMiddleWare,async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.get("/:id", authMiddleWare, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user.id });
    if (!project) {
      return res.status(403).json({ message: "PROJECT NOT FOUND"});
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'SERVER ERROR', error: error.message });
  }
});

router.put("/:id", authMiddleWare, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/:id", authMiddleWare, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
