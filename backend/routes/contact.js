const express = require("express");
const router = express.Router();
const Message = require("../models/Message.js");
const { authenticateToken } = require("../middleware/auth.js");
const { validateContact } = require("../middleware/validation.js");

// POST /api/contact
router.post("/", validateContact, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save message to database
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Some error occurred" });
  }
});

// GET /api/contact (optional, for admin to view messages)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/contact/:id
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
