// auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { validate } = require("../middlewares/validate.middleware");
const { signupSchema, loginSchema } = require("../validations/auth.schema");

router.post("/register", validate(signupSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
