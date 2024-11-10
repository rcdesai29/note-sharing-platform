const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // Import CORS middleware
const multer = require("multer");

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Serve static files from the 'public' directory
app.use("/public", express.static("public"));

// Import your routes
const noteRoutes = require("./routes/noteRoutes"); // Notes routes
const classRoutes = require("./routes/classRoutes"); // Classes routes
const userRoutes = require("./routes/userRoutes"); // User routes

// Use your routes
app.use("/api/notes", noteRoutes); // For notes
app.use("/api/classes", classRoutes); // For classes
app.use("/api/users", userRoutes); // For users

// Example base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Starting Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
