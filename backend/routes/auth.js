const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log("Login attempt for email:", email);

    // Use environment variables for credentials
    const adminEmail = process.env.ADMIN_EMAIL || "admin@portfolio.com";
    const adminPasswordHash =
      process.env.ADMIN_PASSWORD_HASH ||
      "$2b$10$qMIsYs7cL12zUNpDIe4xde2c00D7kMB7gZRLTfIqciJs92Smc/LA2";
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error(
        "JWT_SECRET environment variable is not set. Please set a secure JWT_SECRET in your Railway environment variables for security."
      );
      return res.status(500).json({ error: "Server configuration error" });
    }

    if (email !== adminEmail) {
      console.log("Email does not match");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, adminPasswordHash);

    console.log("Password validation result:", isValid);

    if (!isValid) {
      console.log("Password is invalid");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, jwtSecret, {
      expiresIn: "1h",
    });

    console.log("Login successful, token issued");
    res.json({ token, user: { email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
