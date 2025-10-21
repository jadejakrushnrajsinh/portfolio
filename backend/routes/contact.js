const express = require("express");
const router = express.Router();
const Message = require("../models/Message.js");
const { authenticateToken } = require("../middleware/auth.js");
const { validateContact } = require("../middleware/validation.js");

// POST /contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Save to MongoDB
    const newMessage = await Message.create({ name, email, subject, message });

    // Respond silently (black box style)
    res.status(200).json({ message: "Received" });
  } catch (err) {
    // Prevent backend error logs from showing
    console.error("Contact endpoint handled an error");
    res.status(200).json({ message: "Received" });
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
