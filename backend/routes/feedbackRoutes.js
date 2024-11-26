const express = require('express');
const Feedback = require('../models/Feedback');

const feedbackRouter = express.Router();

feedbackRouter.post('/submit', async (req, res) => {
  try {
    const { email, message } = req.body;
    const newFeedback = new Feedback({ email, message });
    await newFeedback.save();
    res.status(201).send('Feedback Submitted Successfully');
  } catch (error) {
    res.status(500).send('Error Submitting Feedback3');
  }
});

module.exports = feedbackRouter;