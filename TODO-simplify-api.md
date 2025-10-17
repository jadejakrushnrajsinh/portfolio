# Simplify API by Removing /api Prefix

## Tasks

- [ ] Update backend/app.js: Change route mounts from /api/contact and /api/projects to /contact and /projects
- [ ] Update client/script.js: Change API calls from /api/projects and /api/contact to /projects and /contact
- [ ] Update client/admin/index.html: Change admin login call to /admin/login
- [ ] Update client/admin/dashboard.html: Change API calls to /projects and /contact
- [ ] Update client/login.html: Change admin login call to /admin/login
- [ ] Update vercel.json: Change proxy rules from /api/\* to /projects, /contact, /admin/login
- [ ] Update backend/middleware/security.js: Update skip paths for rate limiting
- [ ] Test backend locally with new routes
- [ ] Redeploy backend on Railway
- [ ] Redeploy frontend on Vercel
- [ ] Test frontend functionality
