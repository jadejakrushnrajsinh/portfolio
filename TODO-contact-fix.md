# Contact Form Fix TODO

## Issue

Contact form fails to send messages, showing "Failed to send message."

## Changes Made

- Modified `functions/contact.js` to handle database connection errors gracefully.
- Updated `script.js` to use configurable API_BASE_URL for backend URL.
- Kept full-stack approach with backend and database.

## Next Steps

1. **Set up database in Railway:**

   - In Railway dashboard, go to your app's environment variables.
   - Set DATABASE_URL = mongodb://mongo:JRgUgPgOgpfABlDJMmvxHiCtFrtqSYYX@mongodb.railway.internal:27017
   - Redeploy the Railway app.

2. **Get Railway App URL:**

   - Find your Railway app URL (e.g., `https://your-app-name.railway.app`).

3. **For Production (Frontend on Netlify):**

   - In `index.html`, add a script tag before the closing `</body>`:
     ```html
     <script>
       window.API_BASE_URL = "https://your-app-name.railway.app";
     </script>
     ```
   - Redeploy the frontend to Netlify.
   - Test the contact form on the live site.

4. **For Local Testing:**

   - Run the server locally: Open terminal, navigate to `new-portfolio` directory, run `npm start`.
   - Open browser to `http://localhost:3002` and test the contact form.

5. **If still failing:**
   - Check browser console for errors (network tab).
   - Ensure the backend is running and accessible.
   - If using Railway, check Railway logs for errors.

## Benefits

- Full-stack application with database storage.
- Messages are saved and can be viewed in admin panel.
- Scalable and professional setup.

## Testing

- Fill the contact form and submit.
- Should show "Message sent successfully!" in green.
- Messages should be saved in the database.
