# Full Project Check & Live Update Plan for Frontend-Backend Integration

## Overview

Ensure the frontend (admin dashboard, login, contact form) fully communicates with the backend API on Railway, handles JWT authentication, fetches data, and shows proper errors/fallbacks.

## Steps to Complete

### 1. Fix Login Endpoint and Token Storage

- [ ] Update client/admin/login.html to use /api/auth/login instead of /api/admin-login
- [ ] Change token storage key from 'adminToken' to 'authToken' for consistency

### 2. Add Backend Auth Route

- [ ] Create /api/auth/login route in backend/app.js or separate route file
- [ ] Ensure it returns JWT token on successful login

### 3. Add Dashboard Stats Route

- [ ] Create /api/dashboard/stats route that returns { totalUsers, totalRevenue, totalOrders, conversionRate }
- [ ] Protect with JWT authentication

### 4. Add Dashboard Activity Route

- [ ] Create /api/dashboard/activity route that returns [{ user, action, date, status }, ...]
- [ ] Protect with JWT authentication

### 5. Verify Contact Form Integration

- [ ] Ensure contact form in client/index.html posts to /api/contact correctly
- [ ] Check backend/routes/contact.js handles POST properly

### 6. Test Frontend Functionality

- [ ] Test login with correct/incorrect credentials
- [ ] Test dashboard data fetching with token
- [ ] Test contact form submission

### 7. Deploy and Test Live

- [ ] Commit changes to GitHub
- [ ] Deploy frontend to Vercel with rewrites
- [ ] Ensure backend on Railway is running
- [ ] Test live at /admin/login, dashboard, contact form

### 8. Optional Enhancements

- [ ] Add loading spinners for stats & activity
- [ ] Improve error messages
- [ ] Protect dashboard routes (redirect if no token)
