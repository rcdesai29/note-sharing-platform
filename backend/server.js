// server.js
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors"); 
const sess = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const userRouter = require("./routes/userRoutes");

console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line
console.log("All Environment Variables:", process.env); // Debugging line

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Use CORS middleware
app.use(cors()); 

// Serve static files from the 'public' directory
app.use("/public", express.static("public"));

// Express user sessions
app.use(sess({
  secret: 'ksucvxna9w8ehrpafhna09wfja',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60*60*1000},
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.successMessages = req.flash('success');
  res.locals.errorMessages = req.flash('error');
  next();
});

// Import your routes
const noteRoutes = require("./routes/noteRoutes");
const classRoutes = require("./routes/classRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

// Use your routes
app.use("/api/notes", noteRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/users", userRouter);
app.use("/api/feedback", feedbackRoutes);

// Example base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Fallback route to serve the frontend application
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Starting Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
