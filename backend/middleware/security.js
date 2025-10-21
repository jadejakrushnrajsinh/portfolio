const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  trustProxy: 1, // Trust proxy to correctly identify client IP
  skip: (req) => {
    // Skip rate limiting for Railway's health checks or internal requests
    return (
      req.headers["x-forwarded-for"] === undefined ||
      req.ip === "127.0.0.1" ||
      req.path === "/" ||
      req.path === "/test" ||
      req.path.startsWith("/projects") ||
      req.path.startsWith("/admin")
    );
  },
});

const securityMiddleware = [
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
        ],
        scriptSrc: ["'self'", "'unsafe-eval'"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com",
        ],
        connectSrc: [
          "'self'",
          "https://portfolio-production-8eed.up.railway.app",
          "https://krushnrajsinhjadeja.com",
          "https://www.krushnrajsinhjadeja.com",
          "https://new-portfolio-rce5vpi2c-jadejakrushnrajsinhs-projects.vercel.app",
        ],
      },
    },
  }),
  limiter,
  (req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  },
];

module.exports = securityMiddleware;
