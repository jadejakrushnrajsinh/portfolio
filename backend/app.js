const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contact.js");
const projectRoutes = require("./routes/projects.js");
const authRoutes = require("./routes/auth.js");
const dashboardRoutes = require("./routes/dashboard.js");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://new-portfolio-p3n7hi67h-jadejakrushnrajsinhs-projects.vercel.app",
      "https://www.krushnrajsinhjadeja.com",
      "https://krushnrajsinhjadeja.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Route mounting
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Portfolio backend is running...");
});

// Connect to MongoDB
const mongoUrl =
  process.env.MONGO_URL ||
  process.env.DATABASE_URL ||
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://mongo:jrRQUutvvEAcMcecEXOziUSSKFVIETNg@mongodb.railway.internal:27017/portfolio";

mongoose
  .connect(mongoUrl, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log("Falling back to local MongoDB for development");
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
