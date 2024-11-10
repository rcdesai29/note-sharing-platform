// routes/classRoutes.js
const express = require("express");
const router = express.Router();
const Class = require("../models/Class");

// GET all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find({});
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a class by ID
router.get("/:id", async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (cls == null) {
      return res.status(404).json({ message: "Cannot find class" });
    }
    res.json(cls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
