// routes/noteRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Note = require("../models/Note");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure that the 'public/documents/' directory exists
const uploadDir = "public/documents/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Destination folder for documents
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter to accept only specific document types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed."
      )
    );
  }
};

// Configure Multer with storage, file filter, and limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit (optional)
});

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET notes by class ID
// GET notes by class ID
router.get("/class/:classId", async (req, res) => {
  try {
    const classIdParam = req.params.classId;

    // Validate classId
    if (!mongoose.Types.ObjectId.isValid(classIdParam)) {
      return res.status(400).json({ message: "Invalid classId" });
    }

    const classId = new mongoose.Types.ObjectId(classIdParam);

    // Debugging statement
    console.log("Fetching notes for classId:", classId);

    const notes = await Note.find({ classId: classId });
    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes by classId:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST create a new note with file upload
router.post("/", upload.single("file"), async (req, res) => {
  const { title, content, classId } = req.body;
  const file = req.file;

  // Debugging statements
  console.log("Request body:", req.body);
  console.log("Class ID:", classId);
  console.log("Uploaded file:", file);

  // Validate classId
  if (!mongoose.Types.ObjectId.isValid(classId)) {
    return res.status(400).json({ message: "Invalid classId" });
  }

  const newNote = new Note({
    title,
    content,
    classId: new mongoose.Types.ObjectId(classId), // Convert to ObjectId
    filePath: file ? file.path : null, // Store the file path
  });

  try {
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific note by ID
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: "Cannot find note" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH update a note
router.patch("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: "Cannot find note" });
    }

    if (req.body.title != null) {
      note.title = req.body.title;
    }
    if (req.body.content != null) {
      note.content = req.body.content;
    }

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: "Cannot find note" });
    }

    // Optionally, delete the associated file from the server
    if (note.filePath) {
      fs.unlink(note.filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    }

    await note.remove();
    res.json({ message: "Deleted note" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
