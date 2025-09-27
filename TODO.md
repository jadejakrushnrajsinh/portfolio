# Portfolio Improvement TODO

## High Priority (Do these first)

- [x] Fix broken project demo links: Updated in script.js to empty liveDemo and add "Coming Soon".
- [ ] Deploy each project on Netlify or GitHub Pages:
  - Amazon Clone: Run `cd amazon-clone && npm install && netlify deploy --prod --dir=public` (or setup gh-pages branch: `git subtree push --prefix public origin gh-pages`).
  - Blog CMS Fullstack: Adapt for static/Netlify functions; deploy public/ folder.
  - Task Manager: Static site; `cd task-manager && netlify deploy --prod --dir=.`.
  - Weather Sphere: Static with JS; `cd weather-sphere && netlify deploy --prod --dir=.`.
  - Update netlify.toml in each if needed for builds.
- [x] Update portfolio links OR replace with screenshots: Placeholders added in script.js; screenshots pending (create images/ folder).
- [x] Add SEO + social metadata: Added to index.html <head>.
- [x] Fix content consistency: Dynamic year added for footer in script.js; experience dates updated to "2024 - Present" in index.html.
- [x] Add clear CTA in hero: Added "Contact Me" button in hero-content.

## Medium Priority

- [x] Accessibility improvements:
  - [x] Add alt text to all images (e.g., project images: alt="Screenshot of Amazon Clone e-commerce interface"). Updated in script.js for dynamic projects.
  - [x] Use semantic HTML: Wrapped sections in <main role="main"> in index.html.
  - [x] Add lang="en" (already present, confirm).
  - [x] Ensure keyboard navigation & visible focus states: Added :focus-visible in styles.css.
- [x] Responsive design check:
  - [x] Test on mobile (≤480px) & tablet (768px): Added 480px media query in styles.css; verified layout.
  - [x] Fix layout breaks: Adjusted .projects-grid for 480px in styles.css.
- [x] Performance optimization:
  - [ ] Compress/convert images to WebP: Use command `cwebp -q 80 images/*.png -o images/*.webp` (create images/ folder first).
  - [x] Add loading="lazy" to all <img> in index.html. Added dynamically in script.js.
  - [ ] Remove unused JS/CSS: Audit with browser dev tools; minify script.js/styles.css.
- [x] Contact improvements:
  - [x] Add working contact form: Added Netlify attributes to form in index.html; fetch already in script.js.

## Low Priority (Polish)

- [x] Enhance project cards:
  - [x] Add tech stack badges: In script.js, add tech array; generate <span class="tech-badge">Node.js</span> in project-content.
  - [x] Add short "Problem → Solution" summary: Updated project data in script.js.
  - [ ] Add screenshots or demo GIFs: Create images/project1-ss.webp; set as img src in project-image.
- [x] Improve design consistency:
  - [x] Choose 1–2 fonts: Keep Inter (body) + Oswald (headings); remove extras if any.
  - [x] Pick color palette: Blues (#0c6285-#00ddfa), accents (#ff4500 orange, red highlights); apply to buttons/headings consistently.
  - [x] Add hover effects & spacing consistency: Enhanced .project-link:hover in styles.css.
- [ ] Analytics & tracking:
  - [ ] Add Google Analytics: Insert GA4 script in index.html <head> (user to provide tracking ID).
- [ ] Downloadable resume link: Add PDF button in nav/hero: <a href="resume.pdf" download>Download Resume</a> (create placeholder resume.pdf).
- [x] Micro-interactions: Add scroll animations in script.js (e.g., IntersectionObserver to add .fade-in class); define @keyframes in styles.css.

## General Followups

- [ ] After each major edit: Test with `npm run dev` and browser_action (launch http://localhost:3000).
- [ ] Update this TODO.md after completing steps (mark [x]).
- [ ] Final verification: Run accessibility/performance audits; deploy portfolio site itself via Netlify.
