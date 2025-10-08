# Portfolio Full-Stack Application

A full-stack portfolio website with admin functionality, built with Node.js, Express, MongoDB, and vanilla HTML/CSS/JavaScript.

## Features

- **Frontend**: Static portfolio pages (index, resume, admin)
- **Backend**: RESTful API for contact messages and project management
- **Admin Dashboard**: Secure admin panel for managing projects and messages
- **Authentication**: JWT-based authentication for admin access
- **Database**: MongoDB for storing messages and projects
- **Security**: Helmet, rate limiting, input validation, error handling

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, express-rate-limit, express-validator
- **Deployment**: Netlify (frontend), custom server (backend)

## Project Structure

```
portfolio/
├── client/          # Frontend files (HTML, CSS, JS)
│   ├── admin/       # Admin pages
│   ├── index.html   # Main portfolio page
│   ├── resume.html  # Resume page
│   └── ...
├── backend/         # Backend code
│   ├── api/         # API handlers
│   ├── middleware/  # Custom middleware
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── app.js       # Main server file
│   └── ...
├── functions/       # Netlify functions (moved from backend/api)
├── .env             # Environment variables
├── netlify.toml     # Netlify config
├── vercel.json      # Vercel config
└── README.md        # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jadejakrushnrajsinh/portfolio.git
   cd portfolio
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend/ directory with the following variables:

   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_jwt_secret_here
   ADMIN_EMAIL=admin@portfolio.com
   ADMIN_PASSWORD_HASH=hashed_password_here (use 'jadeja.kirtiba' as password)
   ```

4. **Seed the database (optional)**

   ```bash
   node seed.js
   ```

5. **Start the backend server**

   ```bash
   npm start
   ```

6. **Access the application**
   - Frontend: Open `client/index.html` in browser or serve statically
   - Admin: http://localhost:3001/admin (if backend serves frontend)

## API Endpoints

### Authentication

- `POST /api/admin/login` - Admin login

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin only)
- `DELETE /api/contact/:id` - Delete message (admin only)

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **Rate Limiting**: Limits requests to prevent abuse
- **Input Validation**: Validates all input data
- **Error Handling**: Comprehensive error handling and logging
- **CORS**: Configured for cross-origin requests

## Development

### Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

## Deployment

### Frontend (Netlify)

1. Deploy the `client/` folder to Netlify
2. Set build command if needed
3. Set environment variables in Netlify dashboard

### Backend

1. Deploy backend/ to a cloud provider (Heroku, DigitalOcean, etc.)
2. Set environment variables
3. Update CORS settings if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
