// project.model.js
const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["not started", "in progress", "completed"],
      default: "not started",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    hourlyRate: {
      type: Number,
      min: 0,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);
module.exports = Project;
