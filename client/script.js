// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const yOffset = -80; // navbar height
      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Navbar background is always gradient, no change on scroll

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Load saved form data on page load
window.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.querySelector('input[placeholder="Name"]');
  const emailInput = document.querySelector('input[placeholder="Email"]');

  const savedName = localStorage.getItem("contactName");
  const savedEmail = localStorage.getItem("contactEmail");

  if (savedName) nameInput.value = savedName;
  if (savedEmail) emailInput.value = savedEmail;
});

// Add loading animation to CTA button
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });
});

// Load projects on page load
window.addEventListener("DOMContentLoaded", () => {
  loadProjects();
});

async function loadProjects() {
  const currentYear = new Date().getFullYear();
  // Update footer year dynamically
  const footer = document.querySelector(".footer p");
  if (footer) {
    footer.innerHTML = `&copy; ${currentYear} Krushnraj Sinh Jadeja. All rights reserved.`;
  }

  const API_BASE_URL =
    import.meta.env?.VITE_API_URL ||
    "https://nodejs-production-da51.up.railway.app";
  const url = `${API_BASE_URL}/api/projects`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Fallback to hardcoded projects if API fails
    const projects = [
      {
        title: "Amazon Clone",
        description:
          "A full-stack e-commerce website clone of Amazon, featuring user authentication, product listings, shopping cart, and order management.",
        summary:
          "Problem: Need for scalable online shopping platform. Solution: Built MERN stack app with secure auth, real-time cart, and admin dashboard.",
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
        summary:
          "Problem: Managing blog content efficiently. Solution: Full-stack CMS with JWT auth, CRUD operations, and responsive UI for drafts/published posts.",
        image:
          "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tech: ["Node.js", "Express", "MongoDB", "HTML", "CSS", "JavaScript"],
        liveDemo: "",
        github: "https://github.com/jadejakrushnrajsinh/blog-cms-fullstack",
      },
      {
        title: "Task Manager",
        description:
          "A simple task management application to organize and track daily tasks.",
        summary:
          "Problem: Tracking personal tasks without tools. Solution: Vanilla JS app with add/edit/delete functionality, local storage persistence.",
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
        summary:
          "Problem: Accessing weather data intuitively. Solution: JS app with OpenWeather API, 5-day forecasts, and admin search tracking via charts.",
        image:
          "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400",
        tech: ["HTML", "CSS", "JavaScript"],
        liveDemo: "https://jadejakrushnrajsinh.github.io/weather-sphere/",
        github: "https://github.com/jadejakrushnrajsinh/weather-sphere",
      },
    ];
    displayProjects(projects);
  }
}

function displayProjects(projects) {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = "";

  if (projects.length === 0) {
    projectsGrid.innerHTML = "<p>No projects available.</p>";
    return;
  }

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";
    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="Screenshot of ${
      project.title
    } project" loading="lazy">
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${
          project.summary
            ? `<p class="project-summary"><strong>Problem → Solution:</strong> ${project.summary}</p>`
            : ""
        }
        <div class="project-tech">
          ${
            project.tech
              ? project.tech
                  .map((tech) => `<span class="tech-badge">${tech}</span>`)
                  .join("")
              : ""
          }
        </div>
        <div class="project-links">
          <a href="portfolio-single.html?id=${
            project._id
          }" class="project-link">View Details</a>
    <span class="project-link coming-soon">Live Demo Coming Soon</span>
          ${
            project.github
              ? `<a href="${project.github}" class="project-link" target="_blank">GitHub</a>`
              : ""
          }
        </div>
      </div>
    `;
    projectsGrid.appendChild(projectCard);
  });
}

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  }
});

// Handle contact form submission
document
  .getElementById("contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const messageDiv = document.getElementById("form-message");

    const API_BASE_URL =
      import.meta.env?.VITE_API_URL ||
      "https://nodejs-production-da51.up.railway.app";

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message || "Message sent successfully!";
        messageDiv.style.color = "green";
        form.reset();
      } else {
        messageDiv.textContent = result.error || "Failed to send message.";
        messageDiv.style.color = "red";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      messageDiv.textContent = "Failed to send message. Please try again.";
      messageDiv.style.color = "red";
    }
  });
