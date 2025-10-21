// Active navigation highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-menu a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

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

// Update active nav on scroll
window.addEventListener("scroll", updateActiveNav);

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
  const email = localStorage.getItem("contactEmail");

  if (savedName) nameInput.value = savedName;
  if (email) emailInput.value = email;
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

  // Use full backend URL for direct API calls
  const url = "https://portfolio-production-8eed.up.railway.app/api/projects";

  // Define fallback projects (same as seeded data)
  const fallbackProjects = [
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
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
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

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    // Handle empty project array gracefully by using fallback
    if (projects.length === 0) {
      displayProjects(fallbackProjects);
    } else {
      displayProjects(projects);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Fallback to hardcoded projects if API fails
    displayProjects(fallbackProjects);
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

    // Truncate description if too long
    const truncatedDesc =
      project.description.length > 150
        ? project.description.substring(0, 150) + "..."
        : project.description;

    projectCard.innerHTML = `
      <div class="project-image">
        <img src="${project.image}?w=400" srcset="${
      project.image
    }?w=400 400w, ${
      project.image
    }?w=800 800w" sizes="(max-width: 600px) 400px, 800px" alt="Screenshot of ${
      project.title
    } project" loading="lazy">
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${truncatedDesc}</p>
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
          ${
            project.liveDemo && project.liveDemo.trim() !== ""
              ? `<a href="${project.liveDemo}" class="project-link live-demo" target="_blank" rel="noopener noreferrer">Live Demo</a>`
              : '<span class="project-link coming-soon">Live Demo Coming Soon</span>'
          }
          ${
            project.github
              ? `<a href="${project.github}" class="project-link github-link" target="_blank" rel="noopener noreferrer">GitHub</a>`
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
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const messageDiv = document.getElementById("form-message");

    // Clear previous messages
    messageDiv.textContent = "";
    messageDiv.style.color = "";

    // Validate form data before sending
    const { name, email, subject, message } = data;
    if (!name || !email || !subject || !message) {
      messageDiv.textContent = "All fields are required.";
      messageDiv.style.color = "red";
      messageDiv.style.backgroundColor = "#f8d7da";
      messageDiv.style.padding = "10px";
      messageDiv.style.borderRadius = "5px";
      messageDiv.style.border = "1px solid #f5c6cb";
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
      submitButton.style.backgroundColor = "";
      return;
    }

    // Additional client-side validation matching backend
    if (name.trim().length < 2) {
      messageDiv.textContent = "Name must be at least 2 characters long.";
      messageDiv.style.color = "red";
      messageDiv.style.backgroundColor = "#f8d7da";
      messageDiv.style.padding = "10px";
      messageDiv.style.borderRadius = "5px";
      messageDiv.style.border = "1px solid #f5c6cb";
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
      submitButton.style.backgroundColor = "";
      return;
    }

    if (subject.trim().length < 3) {
      messageDiv.textContent = "Subject must be at least 3 characters long.";
      messageDiv.style.color = "red";
      messageDiv.style.backgroundColor = "#f8d7da";
      messageDiv.style.padding = "10px";
      messageDiv.style.borderRadius = "5px";
      messageDiv.style.border = "1px solid #f5c6cb";
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
      submitButton.style.backgroundColor = "";
      return;
    }

    if (message.trim().length < 10) {
      messageDiv.textContent = "Message must be at least 10 characters long.";
      messageDiv.style.color = "red";
      messageDiv.style.backgroundColor = "#f8d7da";
      messageDiv.style.padding = "10px";
      messageDiv.style.borderRadius = "5px";
      messageDiv.style.border = "1px solid #f5c6cb";
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
      submitButton.style.backgroundColor = "";
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      messageDiv.textContent = "Please provide a valid email address.";
      messageDiv.style.color = "red";
      messageDiv.style.backgroundColor = "#f8d7da";
      messageDiv.style.padding = "10px";
      messageDiv.style.borderRadius = "5px";
      messageDiv.style.border = "1px solid #f5c6cb";
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
      submitButton.style.backgroundColor = "";
      return;
    }

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    submitButton.style.backgroundColor = "#666";

    // Use proxied API endpoint to avoid CORS
    try {
      const response = await fetch("/api/contact", {
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
        messageDiv.style.backgroundColor = "#d4edda";
        messageDiv.style.padding = "10px";
        messageDiv.style.borderRadius = "5px";
        messageDiv.style.border = "1px solid #c3e6cb";
        form.reset();

        // Reset button to success state
        submitButton.textContent = "Message Sent!";
        submitButton.style.backgroundColor = "#28a745";
        submitButton.disabled = false;

        // Reset button text after 3 seconds
        setTimeout(() => {
          submitButton.textContent = "Send Message";
          submitButton.style.backgroundColor = "";
        }, 3000);
      } else {
        // Handle validation errors from backend
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors.map((err) => err.msg).join(" ");
          messageDiv.textContent = errorMessages;
        } else {
          messageDiv.textContent = result.error || "Failed to send message.";
        }
        messageDiv.style.color = "red";
        messageDiv.style.backgroundColor = "#f8d7da";
        messageDiv.style.padding = "10px";
        messageDiv.style.borderRadius = "5px";
        messageDiv.style.border = "1px solid #f5c6cb";

        // Reset button to error state
        submitButton.textContent = "Failed - Try Again";
        submitButton.style.backgroundColor = "#dc3545";
        submitButton.disabled = false;

        // Reset button text after 3 seconds
        setTimeout(() => {
          submitButton.textContent = "Send Message";
          submitButton.style.backgroundColor = "";
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      messageDiv.textContent = "Failed to send message. Please try again.";
      messageDiv.style.color = "red";
      messageDiv.style.backgroundColor = "#f8d7da";
      messageDiv.style.padding = "10px";
      messageDiv.style.borderRadius = "5px";
      messageDiv.style.border = "1px solid #f5c6cb";

      // Reset button to error state
      submitButton.textContent = "Failed - Try Again";
      submitButton.style.backgroundColor = "#dc3545";
      submitButton.disabled = false;

      // Reset button text after 3 seconds
      setTimeout(() => {
        submitButton.textContent = "Send Message";
        submitButton.style.backgroundColor = "";
      }, 3000);
    }
  });
