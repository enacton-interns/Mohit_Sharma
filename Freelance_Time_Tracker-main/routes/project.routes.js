const express = require("express");
const projectController = require("../controllers/project.controller");
const { validate } = require("../middlewares/validate.middleware");
const {
  createProjectSchema,
  updateProjectSchema,
  projectIdParamSchema,
} = require("../validations/project.schema");

const router = express.Router();

router.post(
  "/",
  validate(createProjectSchema), // validate req.body
  projectController.createProject
);

router.get("/", projectController.getAllProjects);

router.get(
  "/:id",
  validate(projectIdParamSchema, "params"),
  projectController.getProjectById
);

router.put(
  "/:id",
  validate(projectIdParamSchema, "params"),
  validate(updateProjectSchema), // validates req.body by default
  projectController.updateProject
);

router.delete(
  "/:id",
  validate(projectIdParamSchema, "params"),
  projectController.deleteProject
);

module.exports = router;
