// routes/classRoutes.js
const express = require('express');
const router = express.Router();

// Sample class data or actual DB data
const classes = [
  { id: 1, name: "Calculus I" },
  { id: 2, name: "Physics II" },
  // Add more classes or fetch from the database
];

// GET all classes
router.get('/', (req, res) => {
  res.json(classes);  // Send class data as JSON response
});

module.exports = router;
