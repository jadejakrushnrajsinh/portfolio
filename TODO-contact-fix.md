# Contact Form Fix TODO

## Issue

Contact form fails to send messages, showing "Failed to send message."

## Changes Made

- Moved backend API functions to `functions/` directory for Netlify deployment.
- Updated frontend scripts to use correct API_BASE_URL for Netlify functions.
- Kept full-stack approach with backend and database.

## Next Steps

1. **Set up database in Railway:**

   - In Railway dashboard, go to your app's environment variables.
   - Set DATABASE_URL = mongodb://mongo:JRgUgPgOgpfABlDJMmvxHiCtFrtqSYYX@mongodb.railway.internal:27017
   - Redeploy the Railway app.

2. **Set environment variables in Netlify:**

   - In Netlify dashboard, go to Site settings > Environment variables.
   - Add:
     - MONGO_URL = mongodb://mongo:JRgUgPgOgpfABlDJMmvxHiCtFrtqSYYX@mongodb.railway.internal:27017
     - JWT_SECRET = your_jwt_secret_key
     - ADMIN_EMAIL = your_admin_email
     - ADMIN_PASSWORD_HASH = bcrypt_hash_of_your_password

3. **Deploy to Netlify:**

   - Push changes to GitHub repo: https://github.com/jadejakrushnrajsinh/portfolio
   - Netlify will auto-deploy from the repo.
   - Test the contact form on the live site.

4. **For Local Testing:**

   - Install Netlify CLI: `npm install -g netlify-cli`
   - Run `netlify dev` in the project directory.
   - Open browser to `http://localhost:8888` and test the contact form.

5. **If still failing:**
   - Check browser console for errors (network tab).
   - Ensure the Netlify functions are deployed and accessible.
   - Check Netlify function logs for errors.

## Benefits

- Full-stack application with database storage.
- Messages are saved and can be viewed in admin panel.
- Scalable and professional setup using Netlify functions.

## Testing

- Fill the contact form and submit.
- Should show "Message sent successfully!" in green.
- Messages should be saved in the database.
