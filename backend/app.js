const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

console.log("Environment variables loaded:", {
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH ? "set" : "not set",
  JWT_SECRET: process.env.JWT_SECRET ? "set" : "not set",
});

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for Railway deployment
app.set("trust proxy", true);

// Security middleware
const securityMiddleware = require("./middleware/security.js");
app.use(securityMiddleware);

// Middleware
app.use(
  cors({
    origin: [
      "https://krushnrajsinhjadeja.com",
      "https://krushnrajsinhjadeja.vercel.app",
      "https://new-portfolio-rce5vpi2c-jadejakrushnrajsinhs-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from client directory
app.use(express.static(path.join(process.cwd(), "..", "client")));

// Routes example
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Connect to MongoDB - Use Railway's MongoDB service
const mongoUrl =
  process.env.MONGO_URL ||
  process.env.DATABASE_URL ||
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://mongo:jrRQUutvvEAcMcecEXOziUSSKFVIETNg@mongodb.railway.internal:27017/portfolio"; // Railway MongoDB

console.log(
  `Environment variables check: MONGO_URL=${!!process.env
    .MONGO_URL}, DATABASE_URL=${!!process.env
    .DATABASE_URL}, MONGODB_URI=${!!process.env.MONGODB_URI}`
);

const maskedUrl = mongoUrl.replace(/:([^:@]{4})[^:@]*@/, ":$1****@");
console.log(`Connecting to MongoDB at: ${maskedUrl}`);

mongoose
  .connect(mongoUrl, {
    serverSelectionTimeoutMS: 30000, // Increased timeout for production
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log("Falling back to local MongoDB for development");
    // Fallback to local MongoDB
    mongoose
      .connect("mongodb://localhost:27017/portfolio", {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => console.log("Connected to local MongoDB"))
      .catch((localErr) => {
        console.error("Local MongoDB connection failed:", localErr);
        if (process.env.NODE_ENV === "production") {
          console.error(
            "Exiting due to MongoDB connection failure in production"
          );
          process.exit(1);
        }
      });
  });

// Basic API routes for immediate testing
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

// Routes
const contactRoute = require("./routes/contact.js");
const projectsRoute = require("./routes/projects.js");
app.use("/api/contact", contactRoute);
app.use("/api/projects", projectsRoute);

// Test route to verify API is working
app.get("/test", (req, res) => {
  res.json({ message: "API is working!", timestamp: new Date().toISOString() });
});

// Admin login with validation
const { validateLogin } = require("./middleware/validation.js");
app.post("/admin/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

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
      process.exit(1);
    }

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

// Seed endpoint for development/production seeding
app.post("/seed", async (req, res) => {
  try {
    console.log("Seeding database...");
    const Project = require("./models/Project.js");

    const projects = [
      {
        title: "Portfolio Website",
        description:
          "A full-stack portfolio website showcasing projects, skills, and contact form with admin dashboard for content management.",
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
        tech: ["Node.js", "Express", "MongoDB", "HTML", "CSS", "JavaScript"],
        liveDemo: "https://www.krushnrajsinhjadeja.com/",
        github: "https://github.com/jadejakrushnrajsinh/portfolio",
      },
      {
        title: "Amazon Clone",
        description:
          "A full-stack e-commerce website clone of Amazon, featuring user authentication, product listings, shopping cart, and order management.",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
        tech: ["Node.js", "Express", "MongoDB", "HTML", "CSS", "JavaScript"],
        liveDemo: "",
        github: "https://github.com/jadejakrushnrajsinh/amazon-clone",
      },
      {
        title: "Blog CMS Fullstack",
        description:
          "A full-stack blog content management system with user authentication, post creation, and admin panel.",
        image: "https://nicetwo.com/uploads/f21aa-whatisblog.png",
        tech: ["Node.js", "Express", "MongoDB", "HTML", "CSS", "JavaScript"],
        liveDemo: "",
        github: "https://github.com/jadejakrushnrajsinh/blog-cms-fullstack",
      },
      {
        title: "Task Manager",
        description:
          "A simple task management application to organize and track daily tasks.",
        image:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
        tech: ["HTML", "CSS", "JavaScript"],
        liveDemo: "",
        github: "https://github.com/jadejakrushnrajsinh/task-manager",
      },
      {
        title: "Weather Sphere",
        description:
          "A weather application that displays current weather and forecasts using API integration.",
        image:
          "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400",
        tech: ["HTML", "CSS", "JavaScript"],
        liveDemo: "",
        github: "https://github.com/jadejakrushnrajsinh/weather-sphere",
      },
    ];

    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log("Sample projects added");
    res.json({
      message: "Database seeded successfully",
      count: projects.length,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({ error: "Failed to seed database" });
  }
});

// Admin route removed, served by separate server

// Error handling middleware
const errorHandler = require("./middleware/errorHandler.js");
app.use(errorHandler);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`MongoDB URI: ${process.env.MONGO_URI ? "Set" : "Not set"}`);
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
});
