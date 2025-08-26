// timeEntry.controller.js
const TimeEntry = require("../models/timeEntry.model");
const { generateTimeEntriesPDF } = require("../utils/pdfGenerator.util");

async function createTimeEntry(req, res) {
  try {
    const { projectId, userId, startTime, endTime, description } = req.body;
    const duration = endTime - startTime;
    const newTimeEntry = new TimeEntry({
      projectId,
      userId,
      startTime,
      endTime,
      duration,
      description,
    });
    await newTimeEntry.save();
    res.status(201).json({
      message: "Time entry created successfully",
      timeEntry: newTimeEntry,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getAllTimeEntries(req, res) {
  try {
    const timeEntries = await TimeEntry.find({}).populate("projectId", "title");
    res.status(200).json({ timeEntries });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getTimeEntriesByProject(req, res) {
  try {
    const timeEntries = await TimeEntry.find({
      projectId: req.params.projectId,
    });
    res.status(200).json({ timeEntries });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getTimeEntriesByUser(req, res) {
  try {
    const timeEntries = await TimeEntry.find({ userId: req.params.userId });
    res.status(200).json({ timeEntries });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function updateTimeEntry(req, res) {
  try {
    const { projectId, userId, startTime, endTime, description } = req.body;
    const timeEntry = await TimeEntry.findById(req.params.entryId);
    if (!timeEntry) {
      return res.status(404).json({ message: "Time entry not found" });
    }
    const duration = endTime - startTime;
    timeEntry.projectId = projectId;
    timeEntry.userId = userId;
    timeEntry.startTime = startTime;
    timeEntry.endTime = endTime;
    timeEntry.duration = duration;
    timeEntry.description = description;
    await timeEntry.save();
    res.status(200).json({ message: "Time entry updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function deleteTimeEntry(req, res) {
  try {
    const timeEntry = await TimeEntry.findById(req.params.entryId);
    if (!timeEntry) {
      return res.status(404).json({ message: "Time entry not found" });
    }
    const deletedTimeEntry = await TimeEntry.findByIdAndDelete(
      req.params.entryId
    );
    res
      .status(200)
      .json({ message: "Time entry deleted successfully", deletedTimeEntry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// To make pdf of the data
const downloadTimeEntriesPDF = async (req, res) => {
  try {
    const entries = await TimeEntry.find().lean();

    const pdfBuffer = await generateTimeEntriesPDF(entries);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=time-entries.pdf",
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};

module.exports = {
  createTimeEntry,
  getAllTimeEntries,
  getTimeEntriesByProject,
  getTimeEntriesByUser,
  updateTimeEntry,
  deleteTimeEntry,
  downloadTimeEntriesPDF,
};
