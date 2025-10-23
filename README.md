# Portfolio

A modern, responsive portfolio website showcasing my work and skills as a full-stack developer.

## 🚀 Live Demo

[View Portfolio](https://new-portfolio-j9sghs09q-jadejakrushnrajsinhs-projects.vercel.app/)

## 📋 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Contact Form**: Functional contact form with backend integration
- **Admin Dashboard**: Secure admin panel for content management
- **Project Showcase**: Display of featured projects and work samples
- **Resume Section**: Detailed resume and skills presentation

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel
- **Version Control**: Git, GitHub

## 📁 Project Structure

```
portfolio/
├── client/                 # Frontend static files
│   ├── index.html         # Main portfolio page
│   ├── resume.html        # Resume page
│   ├── admin-dashboard.html # Admin dashboard
│   ├── styles.css         # Main stylesheet
│   ├── script.js          # Main JavaScript
│   └── admin/             # Admin pages
├── backend/                # Backend API
│   ├── api/               # API handlers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── app.js             # Main server file
├── vercel.json            # Vercel deployment config
└── README.md              # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Local Development

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

3. **Environment Setup**
   Create a `.env` file in the `backend/` directory:

   ```env
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=admin@portfolio.com
   ADMIN_PASSWORD=your_admin_password
   ```

4. **Start the backend server**

   ```bash
   npm start
   ```

5. **Open the frontend**
   Open `client/index.html` in your browser or serve it locally.

## 🚀 Deployment

The project is configured for deployment on Vercel with the following setup:

- **Frontend**: Served from the `client/` directory
- **Backend**: API routes proxied through Vercel rewrites
- **Database**: Connected to MongoDB Atlas

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set the root directory to the project root
3. Configure environment variables in Vercel dashboard
4. Deploy!

## 📡 API Endpoints

### Public Endpoints

- `GET /api/projects` - Fetch all projects
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Protected)

- `POST /api/auth/login` - Admin authentication
- `GET /api/dashboard/messages` - Get contact messages
- `POST /api/dashboard/projects` - Create new project
- `PUT /api/dashboard/projects/:id` - Update project
- `DELETE /api/dashboard/projects/:id` - Delete project

## 🔒 Security Features

- JWT-based authentication
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Secure headers with Helmet

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Feel free to reach out through the contact form on the website or connect with me on:

- [LinkedIn](https://linkedin.com/in/your-profile)
- [GitHub](https://github.com/jadejakrushnrajsinh)
- [Email](mailto:your.email@example.com)

---

⭐ If you like this project, please give it a star on GitHub!
