const express = require("express");
const router = express.Router();
const Message = require("../models/Message.js");
const { authenticateToken } = require("../middleware/auth.js");

// POST /contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Additional validation
    if (name.trim().length < 2) {
      return res
        .status(400)
        .json({ error: "Name must be at least 2 characters long" });
    }

    if (subject && subject.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Subject must be at least 3 characters long" });
    }

    if (message.trim().length < 10) {
      return res
        .status(400)
        .json({ error: "Message must be at least 10 characters long" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid email address" });
    }

    // Save to MongoDB
    await Message.create({ name, email, subject, message });
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /contact (optional, for admin to view messages)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /contact/:id
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
