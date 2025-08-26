const Joi = require("joi");
const mongoose = require("mongoose");

// Helper to validate MongoDB ObjectId
const isObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const createProjectSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(1000).required(),
  status: Joi.string()
    .valid("not started", "in progress", "completed")
    .default("not started"),
  priority: Joi.string().valid("low", "medium", "high").default("medium"),
  hourlyRate: Joi.number().min(0).default(0),
});

const updateProjectSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(5).max(1000),
  status: Joi.string().valid("not started", "in progress", "completed"),
  priority: Joi.string().valid("low", "medium", "high"),
  hourlyRate: Joi.number().min(0),
});

const projectIdParamSchema = Joi.object({
  id: Joi.string().custom(isObjectId).required(),
});

module.exports = {
  createProjectSchema,
  updateProjectSchema,
  projectIdParamSchema,
};
