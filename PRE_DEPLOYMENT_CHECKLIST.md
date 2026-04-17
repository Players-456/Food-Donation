# ✅ Pre-Deployment Verification Checklist

This checklist confirms all changes have been made and tested before deploying to Render + Vercel.

---

## 🔧 Changes Applied

### ✅ Code Fixes

- [x] **server/package.json** - Added `start` and `dev` scripts
  ```json
  "start": "node index.js",
  "dev": "nodemon index.js"
  ```

- [x] **client/src/services/api.js** - Made API baseURL configurable
  ```javascript
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api"
  ```

- [x] **server/routes/authRoutes.js** - Removed JWT fallback secret
  ```javascript
  // Before: process.env.JWT_SECRET || "fallback_secret_change_me"
  // After: process.env.JWT_SECRET (required)
  ```

- [x] **server/index.js** - Made MongoDB URI required (no fallback)
  ```javascript
  if (!process.env.MONGO_URI) {
    console.error("ERROR: MONGO_URI not set");
    process.exit(1);
  }
  ```

- [x] **server/index.js** - Added production-ready CORS configuration
  ```javascript
  const allowedOrigins = [
    "http://localhost:3000",
    "https://your-frontend-url.vercel.app"
  ];
  ```

### ✅ Environment Files

- [x] Created `server/.env.example` with all required variables
- [x] Created `client/.env.example` with all required variables
- [x] Created `client/.env.local` for development
- [x] Updated `.gitignore` to properly exclude `.env` files

### ✅ Documentation

- [x] Created `QUICK_START.md` - Local development guide
- [x] Created `TESTING_CHECKLIST.md` - Complete testing guide
- [x] Created `DEPLOYMENT_GUIDE.md` - Render + Vercel deployment guide
- [x] Updated `README.md` - Complete project documentation
- [x] Created this verification checklist

---

## 🧪 Local Testing Checklist

Before pushing to GitHub, test locally:

### Prerequisites
- [ ] Node.js installed (v16+)
- [ ] MongoDB installed or Atlas account ready
- [ ] Git installed
- [ ] Code editor ready

### Backend Testing

```bash
cd server
npm install
```

- [ ] All dependencies installed without errors
- [ ] `.env` file created with actual values
- [ ] Start with `npm run dev`
- [ ] Should see: ✅ MongoDB Connected Successfully
- [ ] Should see: ✅ Email service ready
- [ ] Should see: Server running on port 5000

Test API endpoints:
```bash
curl http://localhost:5000/
# Should return: Smart Food Donation Backend Running

curl http://localhost:5000/api/donations/stats
# Should return JSON with stats
```

### Frontend Testing

```bash
cd ../client
npm install
```

- [ ] All dependencies installed without errors
- [ ] `.env.local` file created
- [ ] Start with `npm start`
- [ ] Browser opens to http://localhost:3000
- [ ] No console errors
- [ ] Page loads without styling issues

### Integration Testing

1. **Registration Flow**
   - [ ] Navigate to /register
   - [ ] Fill in all fields
   - [ ] Click register
   - [ ] Should redirect to /login
   - [ ] Check email for welcome email

2. **Login Flow**
   - [ ] Navigate to /login
   - [ ] Enter credentials
   - [ ] Click login
   - [ ] Should redirect to /dashboard
   - [ ] Token should be in localStorage

3. **Profile Page**
   - [ ] Navigate to /profile
   - [ ] Should show user information
   - [ ] Should allow profile updates

4. **Add Donation**
   - [ ] Navigate to /add-donation
   - [ ] Fill in donation details
   - [ ] Upload image
   - [ ] Submit
   - [ ] Should show success message
   - [ ] Check email for confirmation

5. **API Calls**
   - [ ] Open browser DevTools (F12)
   - [ ] Go to Network tab
   - [ ] Perform actions
   - [ ] Verify API calls are to `http://localhost:5000/api`
   - [ ] All responses should be 200 or 201 (success)

---

## 🔐 Security Verification

- [ ] `.env` file is NOT committed to git
- [ ] `.gitignore` properly configured
- [ ] No hardcoded secrets in code
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] MongoDB credentials are protected
- [ ] Email password is app password (not Gmail password)
- [ ] CORS is configured with specific origins (not *)
- [ ] No console.log of sensitive data

---

## 📦 Build Verification

### Server Build
```bash
cd server
npm install
npm start
# Should start without errors
```

- [ ] Starts successfully
- [ ] Connects to MongoDB
- [ ] Email service initializes
- [ ] All routes registered

### Client Build
```bash
cd ../client
npm install
npm run build
# Should create /build folder
```

- [ ] Build completes without errors
- [ ] No warnings
- [ ] Build folder created
- [ ] Size is reasonable (<500KB)

---

## 📋 GitHub Setup

Before pushing:

- [ ] Create new GitHub repository
- [ ] Verify `.gitignore` has `.env` files
- [ ] Do NOT push actual `.env` file
- [ ] Add informative commit message
- [ ] Push to main branch

```bash
git init
git add .
git commit -m "Initial commit: Food donation app with full authentication and API"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/food-donation-app.git
git push -u origin main
```

---

## 🚀 Render Deployment Readiness

- [ ] GitHub repository is public
- [ ] Code is pushed to main branch
- [ ] Render account created
- [ ] Have JWT_SECRET ready (generated)
- [ ] Have MONGO_URI ready
- [ ] Have EMAIL_USER and EMAIL_PASS ready
- [ ] Server build command is: `cd server && npm install`
- [ ] Server start command is: `cd server && npm start`

Expected after deployment:
- [ ] Backend URL like: https://food-donation-xxxx.onrender.com
- [ ] Status shows "Live"
- [ ] Can access: https://food-donation-xxxx.onrender.com/

---

## 🎨 Vercel Deployment Readiness

- [ ] GitHub repository is connected
- [ ] Vercel account created
- [ ] Root directory set to: `client`
- [ ] Build command: `npm run build`
- [ ] Have REACT_APP_API_BASE_URL ready (from Render URL)

Expected after deployment:
- [ ] Frontend URL like: https://food-donation-xxx.vercel.app
- [ ] Status shows "Ready"
- [ ] Can access frontend and see home page

---

## 🔗 Post-Deployment Verification

After deploying both services:

### Render Backend
- [ ] Visit https://food-donation-xxxx.onrender.com/
- [ ] Should show: "Smart Food Donation Backend Running"
- [ ] Visit https://food-donation-xxxx.onrender.com/api/donations/stats
- [ ] Should return JSON data

### Vercel Frontend
- [ ] Visit https://food-donation-xxx.vercel.app
- [ ] Page loads without errors
- [ ] No red console errors
- [ ] Logo and theme toggle work
- [ ] Navigation menu works

### End-to-End Testing
- [ ] Complete registration on live site
- [ ] Login with registered account
- [ ] Check email for confirmation
- [ ] View profile
- [ ] Add a donation
- [ ] Check email for donation confirmation
- [ ] All API calls use correct backend URL

---

## 🔄 CORS Configuration

In Render Dashboard, set:
```
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
```

This ensures CORS allows requests from your Vercel frontend.

---

## 📊 Environment Variables Summary

### For Render (Server)
```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/foodDonationDB
JWT_SECRET=your_generated_32_char_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
FRONTEND_URL=https://your-vercel-frontend.vercel.app
```

### For Vercel (Client)
```
REACT_APP_API_BASE_URL=https://your-render-backend.onrender.com/api
REACT_APP_ENV=production
```

---

## ⚠️ Common Mistakes to Avoid

- ❌ Pushing `.env` file to GitHub
- ❌ Using localhost URLs in production
- ❌ Not updating FRONTEND_URL in Render after Vercel deployment
- ❌ Using Gmail password instead of App Password
- ❌ Forgetting to enable 2FA on Gmail for App Passwords
- ❌ Using weak JWT_SECRET
- ❌ Not checking MongoDB IP whitelist in Atlas
- ❌ Not verifying CORS configuration matches deployed URLs

---

## ✨ Success Criteria

Your deployment is successful when:

1. ✅ Backend is live at https://your-render-url.onrender.com
2. ✅ Frontend is live at https://your-vercel-url.vercel.app
3. ✅ User can register and receive email
4. ✅ User can login with JWT token
5. ✅ User can add donations
6. ✅ NGO can view and approve donations
7. ✅ Email notifications are sent
8. ✅ File uploads work
9. ✅ No console errors
10. ✅ No broken API calls

---

## 📞 Troubleshooting Guide

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#troubleshooting) for:
- API endpoint not found errors
- MongoDB connection failures
- CORS errors
- Email delivery issues
- Authentication token errors

---

**Status**: ✅ All changes applied and documented
**Date**: April 2026
**Next Step**: Follow local testing checklist, then push to GitHub

🎉 **Ready to deploy!**
