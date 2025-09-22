const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/projects
router.post("/", async (req, res) => {
  try {
    const { title, description, image, tech, liveDemo, github } = req.body;

    // Validate input
    if (!title || !description || !image) {
      return res
        .status(400)
        .json({ error: "Title, description, and image are required" });
    }

    // Save project to database
    const newProject = new Project({
      title,
      description,
      image,
      tech,
      liveDemo,
      github,
    });
    await newProject.save();

    res
      .status(201)
      .json({ message: "Project added successfully!", project: newProject });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/projects/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, tech, liveDemo, github } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, image, tech, liveDemo, github },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/projects/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
