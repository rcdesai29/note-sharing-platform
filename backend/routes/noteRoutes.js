const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// POST create a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({
    title,
    content,
  });
  const savedNote = await newNote.save();
  res.json(savedNote);
});

module.exports = router;
