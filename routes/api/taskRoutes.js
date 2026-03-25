const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const Task = require("../../models/Task");
const { authMiddleware } = require("../../utils/authMiddleware");

router.use(authMiddleware);

router.post("/projects/:projectId/tasks", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "PROJECT NOT FOUND" });
    }
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "NOT YOURS BUDDY" });
    }
    const task = await Task.create({
      ...req.body,
      project: req.params.projectId,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.get("/projects/:projectId/tasks", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "PROJECT NOT FOUND" });
    }
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "NOT YOURS BUDDY" });
    }

    const tasks = await Task.find({ project: req.params.projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.put("/tasks/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate("project");

    if (!task) {
      return res.status(404).json({ message: "TASK NOT FOUND" });
    }
    if (task.project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "NOT YOURS BUDDY" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate("project");
    if (!task) {
      return res.status(404).json({ message: "TASK NOT FOUND" });
    }
    if (task.project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "NOT YOURS BUDDY" });
    }
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ message: "TASK SUCCESSFULLY DELETED" });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

module.exports = router;
