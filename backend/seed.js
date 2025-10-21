const mongoose = require("mongoose");
const Project = require("./models/Project.js");

mongoose
  .connect(
    process.env.MONGO_URL ||
      process.env.DATABASE_URL ||
      process.env.MONGODB_URI ||
      process.env.MONGO_URI ||
      "mongodb://localhost:27017/portfolio",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log("Seeding projects...");

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
        liveDemo: "https://jadejakrushnrajsinh.github.io/amazon-clone/",
        github: "https://github.com/jadejakrushnrajsinh/amazon-clone",
      },
      {
        title: "Blog CMS Fullstack",
        description:
          "A full-stack blog content management system with user authentication, post creation, and admin panel.",
        image:
          "https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=400",
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
        liveDemo: "https://jadejakrushnrajsinh.github.io/task-manager/",
        github: "https://github.com/jadejakrushnrajsinh/task-manager",
      },
      {
        title: "Weather Sphere",
        description:
          "A weather application that displays current weather and forecasts using API integration.",
        image:
          "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400",
        tech: ["HTML", "CSS", "JavaScript"],
        liveDemo: "https://jadejakrushnrajsinh.github.io/weather-sphere/",
        github: "https://github.com/jadejakrushnrajsinh/weather-sphere",
      },
    ];

    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log("Sample projects added");
    process.exit();
  })
  .catch((err) => console.log(err));
