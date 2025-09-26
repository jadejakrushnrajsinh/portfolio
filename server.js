const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

console.log("Environment variables loaded:", {
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH ? "set" : "not set",
  JWT_SECRET: process.env.JWT_SECRET ? "set" : "not set",
});

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
const securityMiddleware = require("./middleware/security");
app.use(securityMiddleware);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("."));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/projects", require("./routes/projects"));

// Admin login with validation
const { validateLogin } = require("./middleware/validation");
app.post("/api/admin/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt for email:", email);

    if (email !== process.env.ADMIN_EMAIL) {
      console.log("Email does not match");
      return res.status(401).json({ error: "Email is not valid" });
    }

    const isValid = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    console.log("Password validation result:", isValid);

    if (!isValid) {
      console.log("Password is invalid");
      return res.status(401).json({ error: "Password is wrong" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Login successful, token issued");
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin route
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/admin.html");
});

// Error handling middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
