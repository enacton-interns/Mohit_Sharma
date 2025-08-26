// routes/time.routes.js
const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const {
  createTimeEntrySchema,
  updateTimeEntrySchema,
  projectIdParamSchema,
  userIdParamSchema,
  entryIdParamSchema,
} = require("../validations/timeEntry.schema");
const {
  createTimeEntry,
  getAllTimeEntries,
  getTimeEntriesByProject,
  getTimeEntriesByUser,
  updateTimeEntry,
  deleteTimeEntry,
  downloadTimeEntriesPDF,
} = require("../controllers/timeEntry.controller");

router.post("/", validate(createTimeEntrySchema), createTimeEntry);

router.get("/", getAllTimeEntries);

router.get(
  "/project/:projectId",
  validate(projectIdParamSchema, "params"),
  getTimeEntriesByProject
);

router.get(
  "/user/:userId",
  validate(userIdParamSchema, "params"),
  getTimeEntriesByUser
);

router.put(
  "/:entryId",
  validate(entryIdParamSchema, "params"),
  validate(updateTimeEntrySchema),
  updateTimeEntry
);

router.delete(
  "/:entryId",
  validate(entryIdParamSchema, "params"),
  deleteTimeEntry
);

router.get("/download/pdf", downloadTimeEntriesPDF);

module.exports = router;
