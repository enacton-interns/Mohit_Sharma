// project.controller.js
const Project = require("../models/project.model");

async function createProject(req, res) {
  const { title, description, status, priority, hourlyRate } = req.body;
  if (!title || !description || !status || !priority || !hourlyRate) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newProject = new Project({
      title,
      description,
      status,
      priority,
      hourlyRate,
      createdBy: req.user.id,
    });
    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getAllProjects(req, res) {
  try {
    const projects = await Project.find({}).populate("createdBy", "username");
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// get id from params
async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id).populate(
      "createdBy",
      "username"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// for put request
async function updateProject(req, res) {
  try {
    const { title, description, status, priority, hourlyRate } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.title = title;
    project.description = description;
    project.status = status;
    project.priority = priority;
    project.hourlyRate = hourlyRate;
    await project.save();
    res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// for delete request
async function deleteProject(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Project deleted successfully", deletedProject });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
