const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      enum: ["To Do", "In Progress", "Done"],
      default: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    }
  },
  { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
