# Task: Simplify API Calls by Removing /api Prefix

## Current Status
- Backend URLs are set to da51
- CORS enabled for krushnrajsinhjadeja.com
- Routes currently use /api prefix (/api/projects, /api/contact)
- Frontend calls absolute URLs to backend directly
- Vercel proxies /api/* to backend

## Issue
- Frontend is calling wrong backend URL (0738 instead of da51)
- Getting 404 because routes mismatch (/projects vs /api/projects)

## Plan
1. Update backend routes to remove /api prefix
   - Change /api/projects to /projects
   - Change /api/contact to /contact
   - Update app.js to use new routes
2. Update frontend API calls to use relative URLs
   - client/script.js: Change absolute URLs to relative /projects, /contact
   - client/admin/index.html: Update to relative URLs
   - client/admin/dashboard.html: Update to relative URLs
   - client/login.html: Update to relative URLs
3. Update vercel.json to proxy new routes
   - Change /api/(.*) to proxy /projects and /contact to backend
4. Ensure CORS is enabled
5. Redeploy backend on Railway
6. Redeploy frontend on Vercel
7. Test backend: https://nodejs-production-da51.up.railway.app/projects
8. Test frontend: https://krushnrajsinhjadeja.com

## Dependent Files
- backend/app.js
- backend/routes/projects.js
- backend/routes/contact.js
- client/script.js
- client/admin/index.html
- client/admin/dashboard.html
- client/login.html
- vercel.json

## Followup Steps
- Run backend locally to test routes
- Deploy backend
- Deploy frontend
- Test endpoints
- Verify no "Failed to fetch" errors
