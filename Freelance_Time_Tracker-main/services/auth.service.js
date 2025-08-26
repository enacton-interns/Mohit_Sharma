// auth.service.js
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid token at verifyToken");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
