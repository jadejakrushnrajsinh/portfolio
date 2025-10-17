# Task: Simplify API Calls by Removing /api Prefix

## Current Status
- Backend URLs are set to da51
- CORS enabled for krushnrajsinhjadeja.com
- Routes currently use /api prefix (/api/projects, /api/contact)
- Frontend calls /api/projects and /api/contact
- Vercel proxies /api/* to backend

## Plan
1. Update backend routes to remove /api prefix
   - Change /api/projects to /projects
   - Change /api/contact to /contact
   - Update app.js to use new routes
2. Update frontend API calls
   - client/script.js: Change /api/projects to /projects, /api/contact to /contact
   - client/admin/index.html: Update API_BASE_URL calls
   - client/admin/dashboard.html: Update API_BASE_URL calls
   - client/login.html: Update API_BASE_URL calls
3. Update vercel.json to proxy new routes
   - Change /api/(.*) to proxy /projects and /contact
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
