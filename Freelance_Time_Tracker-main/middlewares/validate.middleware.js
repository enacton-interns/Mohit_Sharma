// validate.middleware.js
const validate = (schema, property = "body") => {
  return async (req, res, next) => {
    try {
      const validated = await schema.validateAsync(req[property], {
        abortEarly: false, // show all errors, not just the first
        allowUnknown: false, // disallow unknown fields
        stripUnknown: true, // remove unknown fields automatically
      });
      req[property] = validated; // replace with sanitized data
      next();
    } catch (err) {
      return res.status(400).json({
        error: "Validation error",
        details: err.details.map((e) => e.message),
      });
    }
  };
};

module.exports = { validate };
