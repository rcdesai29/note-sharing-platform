const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import CORS middleware

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Import your routes
const noteRoutes = require('./routes/noteRoutes');   // Notes routes
const classRoutes = require('./routes/classRoutes'); // Classes routes

// Use your routes
app.use('/api/notes', noteRoutes);    // For notes
app.use('/api/classes', classRoutes); // For classes

// Example base route 
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Starting Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
