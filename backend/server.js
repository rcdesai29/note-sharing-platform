// server.js
// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import dependencies
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Log the MongoDB URI for debugging (Optional, remove in production)
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Serve static files from the 'public' directory
app.use("/public", express.static("public"));

// Import routes
const noteRoutes = require("./routes/noteRoutes");
const classRoutes = require("./routes/classRoutes");
const userRoutes = require("./routes/userRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

// Use your routes
app.use("/", userRoutes); // No prefix here

// Route handlers
app.use("/api/notes", noteRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
