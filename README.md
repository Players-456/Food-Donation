# 🍲 Smart Food Donation Application

A full-stack web application for connecting food donors with NGOs and volunteers for food donation and distribution.

## ✨ Features

- **User Authentication** - Secure registration and login with JWT
- **Role-Based Access** - Donor, NGO, Volunteer, and Admin roles
- **Donation Management** - Add, approve, and track food donations
- **Real-time Notifications** - Email alerts for donors, NGOs, and admins
- **Image Upload** - Upload location images for donations
- **Google Maps Integration** - Map links for donation locations
- **Responsive Design** - Works on desktop and mobile devices
- **Dark/Light Theme** - Theme toggle for better UX

---

## 📁 Project Structure

```
food-donation-app/
├── client/                # React Frontend (Vercel-ready)
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API integration
│   │   └── App.js        # Main app component
│   └── package.json
│
├── server/               # Node.js Backend (Render-ready)
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & file upload
│   ├── utils/           # Email service
│   └── index.js         # Server entry point
│
├── QUICK_START.md         # 👈 Start here for local development
├── TESTING_CHECKLIST.md   # Testing & validation guide
├── DEPLOYMENT_GUIDE.md    # Deploy to Render + Vercel
└── README.md
```

---

## 🚀 Quick Start

### For Local Development:
See [QUICK_START.md](./QUICK_START.md) for step-by-step instructions

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Set up environment variables
# Copy .env.example to .env in both folders and fill in values

# Start servers
# Terminal 1: cd server && npm run dev
# Terminal 2: cd client && npm start
```

### For Testing:
See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for comprehensive testing guide

### For Deployment:
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deploying to Render + Vercel

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.3 - UI framework
- **React Router** 7.11.0 - Client-side routing
- **Axios** 1.13.5 - HTTP client
- **Framer Motion** 12.34.0 - Animations
- **Recharts** 3.7.0 - Data visualization

### Backend
- **Express** 5.2.1 - Server framework
- **MongoDB** - Database
- **Mongoose** 9.2.0 - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Nodemailer** - Email service
- **CORS** - Cross-origin requests

---

## 🔐 Security Features

✅ Password hashing with bcryptjs
✅ JWT-based authentication
✅ Role-based access control
✅ Protected API routes
✅ Environment variable protection
✅ CORS origin whitelist
✅ Input validation

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (auth required)
- `PUT /api/auth/profile` - Update profile (auth required)

### Donations
- `POST /api/donations/add` - Create donation (donor only)
- `GET /api/donations/stats` - Get donation statistics
- `GET /api/donations/pending` - Get pending donations

### Feedback
- `POST /api/feedback/submit` - Submit feedback (auth required)
- `GET /api/feedback/all` - Get all feedback (admin only)

### Contact
- `POST /api/contact/submit` - Submit contact form

---

## 🌍 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create Render Web Service
3. Set environment variables
4. Deploy (auto-deploys on push)

### Frontend (Vercel)
1. Connect GitHub repository
2. Set `REACT_APP_API_BASE_URL` environment variable
3. Deploy (auto-deploys on push)

**For detailed instructions**, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📝 Environment Variables

### Server (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=your_frontend_url
```

### Client (.env.local)
```
REACT_APP_API_BASE_URL=http://localhost:5000/api (development)
REACT_APP_API_BASE_URL=https://your-backend.onrender.com/api (production)
```

See `.env.example` files for complete templates.

---

## ✅ Pre-Deployment Checklist

- [x] Environment variables configured
- [x] .env files excluded from git via .gitignore
- [x] JWT secret removed from code
- [x] MongoDB URI properly set
- [x] CORS configured for production
- [x] API baseURL configurable (environment variable)
- [x] Start scripts added to package.json
- [x] Authentication tested
- [x] API endpoints tested
- [x] File uploads working
- [x] Email notifications working

For complete testing checklist, see [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)

---

## 🐛 Troubleshooting

### "API is not responding"
- Check if backend server is running on port 5000
- Verify `REACT_APP_API_BASE_URL` in frontend .env
- Check browser Network tab for error details

### "MongoDB connection failed"
- Verify MongoDB is running (local) or check Atlas connection string
- Ensure `MONGO_URI` is correct in .env

### "Email not sending"
- Enable 2FA on Gmail account
- Generate App Password and update `EMAIL_PASS` in .env
- Verify `EMAIL_USER` is correct

For more troubleshooting, see [QUICK_START.md](./QUICK_START.md#common-issues--fixes)

---

## 📚 Documentation

- [QUICK_START.md](./QUICK_START.md) - Local development setup
- [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) - Testing guide
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Production deployment

---

## 👨‍💻 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the ISC License.

---

## 🤝 Support

If you encounter issues:
1. Check [QUICK_START.md](./QUICK_START.md) troubleshooting section
2. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment issues
3. Review error logs in console and browser DevTools
4. Check server logs in Render dashboard

---

**Last Updated**: April 2026
**Version**: 1.0.0 (Pre-deployment)

🎉 Ready to deploy? Start with [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)!
