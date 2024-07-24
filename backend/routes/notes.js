const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Note = require("../models/Note");

// GET /api/notes - Get all notes for logged-in user
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ userID: req.userId });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// POST /api/notes - Create a new note
router.post("/", async (req, res) => {
  const { userId, title, content, tags } = req.body;
  console.log(userId, title, content, tags);
  try {
    const newNote = new Note({
      userId,
      title,
      content,
      tags,
    });
    const note = await newNote.save();
    note ? res.status(201).json(note) : res.status(401).json("error");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
