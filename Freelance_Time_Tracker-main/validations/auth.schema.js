const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(30).required().messages({
    "string.min": "Password must be at least 4 characters long.",
    "string.max": "Password must not exceed 30 characters.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  signupSchema,
  loginSchema,
};
