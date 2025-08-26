const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbURI = process.env.DB_URI;

function connectDB() {
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = connectDB;
