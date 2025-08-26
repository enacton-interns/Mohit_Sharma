// authentication.middleware.js
const { verifyToken } = require("../services/auth.service");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const userPayload = verifyToken(token);
    req.user = userPayload;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token at authMiddleware" });
  }
  next();
};

module.exports = authMiddleware;
