const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
const JWT_SECRET = process.env.JWT_SECRET;

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tech: [String],
  liveDemo: String,
  github: String,
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

exports.handler = async (event, context) => {
  try {
    // Connect to MongoDB if not connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    const { httpMethod, path, headers, body, queryStringParameters } = event;

    if (httpMethod === "GET") {
      // Public: View projects
      const projects = await Project.find().sort({ createdAt: -1 });
      return {
        statusCode: 200,
        body: JSON.stringify(projects),
      };
    }

    // Admin only for POST, PUT, DELETE
    const authHeader = headers.authorization || headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized" }),
      };
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid token" }),
      };
    }

    if (httpMethod === "POST") {
      const { title, description, image, tech, liveDemo, github } = JSON.parse(
        body || "{}"
      );

      if (!title || !description || !image) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: "Title, description, and image are required",
          }),
        };
      }

      const newProject = new Project({
        title,
        description,
        image,
        tech,
        liveDemo,
        github,
      });
      await newProject.save();

      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "Project added successfully!",
          project: newProject,
        }),
      };
    }

    if (httpMethod === "PUT") {
      const id = queryStringParameters.id;
      if (!id) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Project ID required" }),
        };
      }

      const { title, description, image, tech, liveDemo, github } = JSON.parse(
        body || "{}"
      );

      const updatedProject = await Project.findByIdAndUpdate(
        id,
        { title, description, image, tech, liveDemo, github },
        { new: true }
      );

      if (!updatedProject) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Project not found" }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Project updated successfully",
          project: updatedProject,
        }),
      };
    }

    if (httpMethod === "DELETE") {
      const id = queryStringParameters.id;
      if (!id) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Project ID required" }),
        };
      }

      const deletedProject = await Project.findByIdAndDelete(id);
      if (!deletedProject) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Project not found" }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Project deleted successfully" }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (error) {
    console.error("Projects function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
