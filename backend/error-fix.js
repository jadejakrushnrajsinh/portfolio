// COMPREHENSIVE ERROR FIX FOR ALL ISSUES
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// 1. FIX CORS ERRORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5000",
      "*",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);

// 2. FIX SECURITY HEADERS ERRORS
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  })
);

// 3. FIX RATE LIMITING ERRORS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
});
app.use(limiter);

// 4. FIX BODY PARSER ERRORS
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// 5. HANDLE PREFLIGHT REQUESTS
app.options("*", cors());

// 6. GLOBAL ERROR HANDLER - FIX UNCAUGHT ERRORS
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

// 7. FIX 404 ERRORS
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
