const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

console.log("Environment variables loaded:", {
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH ? "set" : "not set",
  JWT_SECRET: process.env.JWT_SECRET ? "set" : "not set",
});

const app = express();
const PORT = process.env.PORT || 3000;

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
const mongoUrl = process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
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

    // Use environment variables for credentials
    const adminEmail = process.env.ADMIN_EMAIL || "admin@portfolio.com";
    const adminPasswordHash =
      process.env.ADMIN_PASSWORD_HASH ||
      "$2b$10$qMIsYs7cL12zUNpDIe4xde2c00D7kMB7gZRLTfIqciJs92Smc/LA2";
    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret_key";

    if (email !== adminEmail) {
      console.log("Email does not match");
      return res.status(401).json({ error: "Email is not valid" });
    }

    const isValid = await bcrypt.compare(password, adminPasswordHash);

    console.log("Password validation result:", isValid);

    if (!isValid) {
      console.log("Password is invalid");
      return res.status(401).json({ error: "Password is wrong" });
    }

    const token = jwt.sign({ email }, jwtSecret, {
      expiresIn: "1h",
    });

    console.log("Login successful, token issued");
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin route removed, served by separate server

// Error handling middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
