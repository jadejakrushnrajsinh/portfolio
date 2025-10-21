const express = require("express");
const router = express.Router();
const Message = require("../models/Message.js");
const { authenticateToken } = require("../middleware/auth.js");

// POST /contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      throw new Error("Missing fields");
    }

    // Save to MongoDB
    await Message.create({ name, email, subject, message });
    res.status(200).json({ message: "Received" });
  } catch (err) {
    console.error(err); // log silently
    res.status(200).json({ message: "Received" }); // always respond 200
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
