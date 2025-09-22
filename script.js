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

// Form submission
document
  .querySelector(".contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = {
      name: form.querySelector('input[type="text"]').value,
      email: form.querySelector('input[type="email"]').value,
      subject: form.querySelectorAll('input[type="text"]')[1].value,
      message: form.querySelector("textarea").value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Save name and email to localStorage
        localStorage.setItem("contactName", formData.name);
        localStorage.setItem("contactEmail", formData.email);

        alert("Thank you for your message! I'll get back to you soon.");
        form.reset();
        // Repopulate saved data after reset
        const nameInput = form.querySelector('input[placeholder="Name"]');
        const emailInput = form.querySelector('input[placeholder="Email"]');
        nameInput.value = formData.name;
        emailInput.value = formData.email;
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
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

// Load projects statically
function loadProjects() {
  const projects = [
    {
      title: "Amazon Clone",
      description:
        "A full-stack e-commerce website clone of Amazon, featuring user authentication, product listings, shopping cart, and order management.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      tech: ["Node.js", "Express", "MongoDB", "HTML", "CSS", "JavaScript"],
      liveDemo: "",
      github: "https://github.com/jadejakrushnrajsinh/amazon-clone",
    },
    {
      title: "Blog CMS Fullstack",
      description:
        "A full-stack blog content management system with user authentication, post creation, and admin panel.",
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

  displayProjects(projects);
}

// Display projects
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
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">
          ${
            project.tech
              ? project.tech.map((tech) => `<span>${tech}</span>`).join("")
              : ""
          }
        </div>
        <div class="project-links">
          ${
            project.liveDemo
              ? `<a href="${project.liveDemo}" class="project-link" target="_blank">Live Demo</a>`
              : ""
          }
          ${
            project.github
              ? `<a href="${project.github}" class="project-link" target="_blank">View Project</a>`
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
