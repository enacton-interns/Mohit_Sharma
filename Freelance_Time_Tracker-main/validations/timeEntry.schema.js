const Joi = require("joi");
const mongoose = require("mongoose");

// Custom ObjectId validator
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

// ─── CREATE (POST /) ─────────────────────────────────────────
const createTimeEntrySchema = Joi.object({
  projectId: Joi.string().custom(objectId).required().messages({
    "any.required": "Project ID is required",
    "any.invalid": "Project ID must be a valid ObjectId",
  }),
  userId: Joi.string().custom(objectId).required().messages({
    "any.required": "User ID is required",
    "any.invalid": "User ID must be a valid ObjectId",
  }),
  startTime: Joi.date().required().messages({
    "any.required": "Start time is required",
    "date.base": "Start time must be a valid date",
  }),
  endTime: Joi.date().min(Joi.ref("startTime")).required().messages({
    "any.required": "End time is required",
    "date.base": "End time must be a valid date",
    "date.min": "End time cannot be before start time",
  }),
  description: Joi.string().min(3).max(500).required().messages({
    "any.required": "Description is required",
    "string.min": "Description must be at least 3 characters",
    "string.max": "Description can't exceed 500 characters",
  }),
});

// ─── UPDATE (PUT /:entryId) ───────────────────────────────────
const updateTimeEntrySchema = Joi.object({
  projectId: Joi.string().custom(objectId).messages({
    "any.invalid": "Project ID must be a valid ObjectId",
  }),
  userId: Joi.string().custom(objectId).messages({
    "any.invalid": "User ID must be a valid ObjectId",
  }),
  startTime: Joi.date().messages({
    "date.base": "Start time must be a valid date",
  }),
  endTime: Joi.date().min(Joi.ref("startTime")).messages({
    "date.base": "End time must be a valid date",
    "date.min": "End time cannot be before start time",
  }),
  description: Joi.string().min(3).max(500).messages({
    "string.min": "Description must be at least 3 characters",
    "string.max": "Description can't exceed 500 characters",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update",
  });

// ─── PARAM VALIDATION ──────────────────────────────────────────
const projectIdParamSchema = Joi.object({
  projectId: Joi.string().custom(objectId).required().messages({
    "any.required": "Project ID is required",
    "any.invalid": "Project ID must be a valid ObjectId",
  }),
});

const userIdParamSchema = Joi.object({
  userId: Joi.string().custom(objectId).required().messages({
    "any.required": "User ID is required",
    "any.invalid": "User ID must be a valid ObjectId",
  }),
});

const entryIdParamSchema = Joi.object({
  entryId: Joi.string().custom(objectId).required().messages({
    "any.required": "Entry ID is required",
    "any.invalid": "Entry ID must be a valid ObjectId",
  }),
});

module.exports = {
  createTimeEntrySchema,
  updateTimeEntrySchema,
  projectIdParamSchema,
  userIdParamSchema,
  entryIdParamSchema,
};
