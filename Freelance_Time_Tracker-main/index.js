// index.js
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();
const cookieParser = require("cookie-parser");

const authMiddleware = require("./middlewares/auth.middleware");
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const timeEntryRoutes = require("./routes/timeEntry.routes");

// Initialize Express app
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", authMiddleware, projectRoutes);
app.use("/api/timeEntries", authMiddleware, timeEntryRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
