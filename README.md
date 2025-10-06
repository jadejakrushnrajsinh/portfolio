README Template

# Project Title

Brief description of what the project does and its purpose.

---

## 📌 Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## About

Describe the project in detail, why you built it, and what problem it solves.

Example:
This project is a personal portfolio website built to showcase my skills, projects, and contact information. It is designed to be responsive and easy to navigate.

---

## Features

- Feature 1
- Feature 2
- Feature 3

Example:

- Responsive design for mobile and desktop
- Clean and minimal UI
- Smooth animations and transitions

---

## Installation

Step-by-step guide to run the project locally.

Example:

1. Clone the repo

git clone https://github.com/jadejakrushnrajsinh/PROJECT-NAME.git

2. Navigate to the project folder

cd PROJECT-NAME

3. Open `index.html` in your browser or run:

live-server

---

## Usage

How to use the project.  
Example:
Open `index.html` to view the website. Navigate through the sections to see the features and information.

---

## Technologies

List the technologies/frameworks used in the project.

Example:

- HTML5
- CSS3
- JavaScript
- Git & GitHub

---

## Contributing

Guidelines for contributing.  
Example:
Contributions are welcome! Please fork the repo, make your changes, and create a pull request.

---

## License

Include license info if any.  
Example:
Distributed under the MIT License. See `LICENSE` for more information.

---

> > > > > > > # 8e48c077e6c34475211c7efef06fcdf5b475f125

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

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd new-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:

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

5. **Start the server**

   ```bash
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3001
   - Admin: http://localhost:3001/admin

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

### Project Structure

```
new-portfolio/
├── models/          # Database models
├── middleware/      # Custom middleware
├── routes/          # API routes
├── public/          # Static files
├── .env             # Environment variables
├── server.js        # Main server file
└── README.md        # This file
```

## Deployment

### Frontend (Netlify)

1. Build the static files
2. Deploy to Netlify
3. Set environment variables in Netlify dashboard

### Backend

1. Deploy to a cloud provider (Heroku, DigitalOcean, etc.)
2. Set environment variables
3. Update CORS settings if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

# MIT License - see LICENSE file for details

README Template

# Project Title

Brief description of what the project does and its purpose.

---

## 📌 Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## About

Describe the project in detail, why you built it, and what problem it solves.

Example:
This project is a personal portfolio website built to showcase my skills, projects, and contact information. It is designed to be responsive and easy to navigate.

---

## Features

- Feature 1
- Feature 2
- Feature 3

Example:

- Responsive design for mobile and desktop
- Clean and minimal UI
- Smooth animations and transitions

---

## Installation

Step-by-step guide to run the project locally.

Example:

1. Clone the repo

git clone https://github.com/jadejakrushnrajsinh/PROJECT-NAME.git

2. Navigate to the project folder

cd PROJECT-NAME

3. Open `index.html` in your browser or run:

live-server

---

## Usage

How to use the project.  
Example:
Open `index.html` to view the website. Navigate through the sections to see the features and information.

---

## Technologies

List the technologies/frameworks used in the project.

Example:

- HTML5
- CSS3
- JavaScript
- Git & GitHub

---

## Contributing

Guidelines for contributing.  
Example:
Contributions are welcome! Please fork the repo, make your changes, and create a pull request.

---

## License

Include license info if any.  
Example:
Distributed under the MIT License. See `LICENSE` for more information.

---

> > > > > > > 8e48c077e6c34475211c7efef06fcdf5b475f125
