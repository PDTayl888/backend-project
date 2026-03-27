const express = require("express");
const router = express.Router();
const Project = require('../../models/Project');
const { authMiddleware } = require("../../utils/authMiddleware");

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'SERVER ERROR', error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      {_id: req.params.id, user: req.user.id },
    req.body,
  { new: true }
  );
  if (!project) {
    return res.status(403).json({ message: "NOT YOURS BUDDY"});
  }
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'SERVER ERROR', error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
   const project = await Project.findOneAndDelete(
    { _id: req.params.id, user: req.user.id }
    )
    if (!project) {
      return res.status(403).json({ message: "PROJECT NOT FOUND" });
    }
    res.status(200).json({ message: 'DELETED'});
  } catch (error) {
    res.status(500).json({ message: 'SERVER ERROR', error: error.message });
  }
});

module.exports = router;
