# 🏃 Quick Start Guide - Local Development

Get the Food Donation app running on your local machine in 5 minutes!

---

## 📋 Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Download Local](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended - [Download](https://code.visualstudio.com/)

---

## ⚡ Quick Start (Copy & Paste)

### 1️⃣ Clone & Install

```bash
# Navigate to your projects folder
cd your_projects_folder

# Clone the repository
git clone https://github.com/YOUR_USERNAME/food-donation-app.git
cd food-donation-app

# Install server dependencies
cd server
npm install

# Install client dependencies (open new terminal)
cd client
npm install
```

### 2️⃣ Set Up Environment Variables

**For Server:**

```bash
# In server folder, create .env file
# Copy content from .env.example and update with:

# server/.env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/foodDonationDB
JWT_SECRET=your_test_secret_key_change_in_production
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**For Client:**

```bash
# In client folder, create .env.local file
# Copy content from .env.example

# client/.env.local
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### 3️⃣ Start MongoDB

**Option A: Local MongoDB**

```bash
# Make sure MongoDB is running
# On Windows: mongod command in terminal
# On Mac: brew services start mongodb-community
# On Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGO_URI` in `.env` with your connection string

### 4️⃣ Start Both Servers

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
# Should show: ✅ MongoDB Connected Successfully
#             ✅ Email service ready
#             Server running on port 5000
```

**Terminal 2 - Frontend:**

```bash
cd client
npm start
# Should open http://localhost:3000 in browser
```

---

## 🧪 Test the App

### Register New User

1. Click "Register" on home page
2. Fill in details with role "donor"
3. Should receive welcome email
4. Redirect to login page

### Login

1. Use registered email and password
2. Should redirect to donor dashboard
3. Token stored in localStorage

### Add Donation

1. Click "Add Donation" in navbar
2. Fill in food details
3. Upload location image
4. Submit
5. Should receive confirmation email

### Check API

Test API endpoints:

```bash
# Get donation stats (public)
curl http://localhost:5000/api/donations/stats

# Get profile (requires token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:5000/api/auth/profile
```

---

## 📂 Project Structure

```
food-donation-app/
├── client/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API calls (api.js)
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example          # Environment template
│   ├── .env.local            # Your local env (not in git)
│   └── package.json
│
├── server/                    # Node.js Backend
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth, uploads, etc.
│   ├── utils/                # Helper functions
│   ├── uploads/              # Uploaded images
│   ├── .env.example          # Environment template
│   ├── .env                  # Your env (not in git)
│   ├── index.js              # Server entry point
│   └── package.json
│
├── TESTING_CHECKLIST.md      # Testing guide
├── DEPLOYMENT_GUIDE.md       # Deploy to Render + Vercel
├── QUICK_START.md            # This file
└── README.md
```

---

## 🔑 API Endpoints Summary

### Authentication
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
GET    /api/auth/profile         - Get user profile (requires auth)
PUT    /api/auth/profile         - Update profile (requires auth)
```

### Donations
```
POST   /api/donations/add        - Add donation (donor only, requires auth)
GET    /api/donations/stats      - Get donation stats (public)
GET    /api/donations/pending    - Get pending donations (ngo, volunteer)
PUT    /api/donations/:id        - Update donation status (admin, ngo)
```

### Feedback
```
POST   /api/feedback/submit      - Submit feedback (requires auth)
GET    /api/feedback/all         - Get all feedback (admin only)
```

### Contact
```
POST   /api/contact/submit       - Submit contact form (public)
```

---

## ❌ Common Issues & Fixes

### "MongoDB connection failed"

```bash
# Make sure MongoDB is running
# Local: mongod should be running in terminal
# Atlas: Check MONGO_URI in .env
# Test connection:
mongo mongodb://127.0.0.1:27017/foodDonationDB
```

### "Cannot find module 'express'"

```bash
# Dependencies not installed
cd server && npm install
cd client && npm install
```

### "EADDRINUSE: Port 5000 already in use"

```bash
# Port 5000 is already being used
# Option 1: Kill the process using port 5000
# Option 2: Change PORT in server/.env to 5001
```

### "Frontend can't reach backend API"

```bash
# Check REACT_APP_API_BASE_URL in client/.env.local
# Should be: http://localhost:5000/api
# Make sure backend is running on port 5000
```

### "Email not sending"

```bash
# Check EMAIL_USER and EMAIL_PASS in server/.env
# For Gmail:
# 1. Enable 2FA
# 2. Generate App Password
# 3. Use 16-char app password (not your Gmail password)
```

---

## 🛠️ Useful Commands

```bash
# Start server in development (auto-reload)
cd server && npm run dev

# Start frontend
cd client && npm start

# Build frontend for production
cd client && npm run build

# Run tests
cd client && npm test

# See server console logs
# Just check terminal where you ran "npm run dev"

# Clear npm cache (if having issues)
npm cache clean --force
```

---

## 🚀 Next Steps

1. ✅ Get app running locally
2. ✅ Test all features (register, login, add donation)
3. ✅ Review [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)
4. ✅ Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) to deploy

---

## 💡 Tips

- Use **VS Code REST Client** extension to test API endpoints
- Use **MongoDB Compass** to view database data visually
- Check **browser DevTools** (F12) → Network tab to debug API calls
- Keep both terminal windows visible while developing
- Use `.gitignore` to prevent `.env` from being committed

---

**Happy Coding! 🎉**
