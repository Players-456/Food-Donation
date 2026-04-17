# 🚀 Deployment Guide: Render + Vercel

This guide will help you deploy the Food Donation app to **Render** (backend) and **Vercel** (frontend).

---

## 📋 Prerequisites

Before deploying, make sure you have:

1. **GitHub Account** - Code repository
2. **Render Account** - Backend hosting ([render.com](https://render.com))
3. **Vercel Account** - Frontend hosting ([vercel.com](https://vercel.com))
4. **MongoDB Atlas Account** - Database ([mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
5. **Gmail Account** - For email notifications (with 2FA & App Password)

---

## 🔐 Step 1: Prepare Environment Variables

### 1.1 Generate JWT Secret

Open your terminal and run:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output - this will be your `JWT_SECRET`.

### 1.2 Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster or use existing one
3. Click "Connect" → "Drivers" → Copy Connection String
4. It should look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

### 1.3 Gmail App Password for Emails

1. Go to [Gmail Security Settings](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer" (or your device)
5. Copy the 16-character password (without spaces)

---

## 📦 Step 2: Create New GitHub Repository

### 2.1 Create repository on GitHub

1. Go to [GitHub](https://github.com/new)
2. Create a new public repository: `food-donation-app`
3. **DO NOT** initialize with README (we already have one)
4. Copy the repository URL

### 2.2 Push code to GitHub

```bash
cd "d:\FOOD DONATION"

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Food donation app with authentication and API"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/food-donation-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

⚠️ **IMPORTANT**: Make sure `.env` is in `.gitignore` before pushing!

---

## 🎯 Step 3: Deploy Backend to Render

### 3.1 Connect GitHub to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Select "Deploy from GitHub repository"
4. Connect your GitHub account
5. Select `food-donation-app` repository
6. Click "Connect"

### 3.2 Configure Render Service

Fill in the following:

| Field | Value |
|-------|-------|
| **Name** | `food-donation-backend` |
| **Environment** | `Node` |
| **Region** | Select closest to you |
| **Branch** | `main` |
| **Build Command** | `cd server && npm install` |
| **Start Command** | `cd server && npm start` |
| **Runtime** | `node-18` (or latest) |

### 3.3 Add Environment Variables

In Render dashboard, click "Environment" and add:

```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/foodDonationDB
JWT_SECRET=YOUR_GENERATED_JWT_SECRET_HERE
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
```

⚠️ **Replace with actual values!**

### 3.4 Deploy

Click "Deploy Service" and wait for deployment to complete.

When deployed, you'll get a URL like: `https://food-donation-backend-xxxx.onrender.com`

Copy this URL - you'll need it for Vercel!

---

## 🎨 Step 4: Deploy Frontend to Vercel

### 4.1 Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Find your `food-donation-app` repo and click "Import"

### 4.2 Configure Vercel

In the "Configure Project" screen:

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Create React App` |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |
| **Install Command** | `npm install` |

### 4.3 Add Environment Variables

Click "Environment Variables" and add:

```
REACT_APP_API_BASE_URL=https://food-donation-backend-xxxx.onrender.com/api
REACT_APP_ENV=production
```

⚠️ **Replace `food-donation-backend-xxxx.onrender.com` with your actual Render URL!**

### 4.4 Deploy

Click "Deploy" and wait for deployment to complete.

You'll get a URL like: `https://food-donation-client.vercel.app`

---

## ✅ Step 5: Verify Deployment

### Test Backend API

Open browser and visit:
- `https://your-render-backend.onrender.com/` - Should show "Smart Food Donation Backend Running"
- `https://your-render-backend.onrender.com/api/donations/stats` - Should return donation statistics

### Test Frontend

Visit your Vercel URL: `https://your-vercel-frontend.vercel.app`

- Should load without errors
- Try logging in with test credentials
- Check browser console for any errors
- Verify API calls are hitting the correct backend URL

### Test Complete Flow

1. Register new user
2. Login
3. Add a donation
4. Check if confirmation email is sent
5. View donations in dashboard

---

## 🔄 Step 6: Update Render CORS Configuration

Go back to Render and update the .env variable:

```
FRONTEND_URL=https://your-vercel-frontend.vercel.app
```

Then restart the backend service for CORS changes to take effect.

---

## 🐛 Troubleshooting

### "Cannot GET /api/donations"

**Problem**: Backend API routes not found
**Solution**: 
- Check Render logs: `https://dashboard.render.com/services/YOUR_SERVICE`
- Verify MONGO_URI is correct in .env
- Make sure build command is: `cd server && npm install`

### "API is not responding"

**Problem**: Frontend can't reach backend
**Solution**:
- Check `REACT_APP_API_BASE_URL` in Vercel env variables
- Verify Render backend is running
- Check browser Network tab to see actual request URL

### "MongoDB connection failed"

**Problem**: MONGO_URI is incorrect
**Solution**:
- Verify MongoDB Atlas IP whitelist allows Render IP
- Check username/password in connection string
- Make sure `foodDonationDB` database exists

### "Email not sending"

**Problem**: Gmail credentials invalid
**Solution**:
- Verify 2FA is enabled on Gmail
- Regenerate App Password
- Check if app password was copied correctly (remove spaces)

---

## 📝 Environment Variables Reference

### Server (.env)

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/foodDonationDB
JWT_SECRET=your_generated_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
FRONTEND_URL=https://your-vercel-url.vercel.app
```

### Client (.env.local for development)

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Client (Vercel environment)

```env
REACT_APP_API_BASE_URL=https://your-render-backend.onrender.com/api
REACT_APP_ENV=production
```

---

## 🔄 Re-deployment Steps

After making changes locally:

```bash
# Commit changes
git add .
git commit -m "Updated: [describe changes]"

# Push to GitHub
git push origin main

# Render auto-deploys on push
# Vercel also auto-deploys on push

# Monitor deployments:
# Render: https://dashboard.render.com
# Vercel: https://vercel.com/dashboard
```

---

## 🔒 Security Best Practices

✅ **Done in this project:**
- JWT authentication
- Password hashing with bcrypt
- Protected routes

✅ **To do after deployment:**
- [ ] Enable HTTPS (both services provide free SSL)
- [ ] Set up MongoDB Atlas IP whitelist
- [ ] Rotate JWT_SECRET periodically
- [ ] Monitor error logs regularly
- [ ] Set up automated backups for MongoDB
- [ ] Use strong, unique passwords

---

## 📞 Support

If you encounter issues:

1. Check **Render Logs**: Dashboard → Your Service → Logs
2. Check **Vercel Logs**: Dashboard → Your Project → Deployments → Logs
3. Check **Browser Console**: Press F12 in browser
4. Check **Network Tab**: Look at API request/response details

---

**Estimated Time: 30-45 minutes for complete deployment**
