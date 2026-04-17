# 📦 Create New Repository & Redeploy Checklist

Complete guide for creating a new GitHub repository and deploying to Render + Vercel.

---

## 🎯 Overview

This process takes about 60 minutes total:
- 10 min: Create GitHub repo
- 15 min: Deploy to Render
- 10 min: Deploy to Vercel  
- 25 min: Testing and verification

---

## Step 1: Create GitHub Repository (10 minutes)

### 1.1 Create on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name**: `food-donation-app`
   - **Description**: Smart Food Donation Application with Authentication
   - **Visibility**: Public (required for free Render/Vercel)
3. **DO NOT** check "Initialize this repository with:"
4. Click "Create repository"

### 1.2 Copy Repository URL

After creation, you'll see an empty repo with:
```
https://github.com/YOUR_USERNAME/food-donation-app.git
```

Copy this URL for next step.

### 1.3 Push Code to GitHub

In your terminal, navigate to project folder:

```bash
# Navigate to your project
cd "d:\FOOD DONATION"

# Initialize git (if not already done)
git init

# Add all files (the .gitignore will exclude .env files automatically)
git add .

# Verify .env files are NOT included
git status
# You should NOT see:
#   .env
#   server/.env
# You SHOULD see:
#   .env.example
#   server/.env.example

# Commit with descriptive message
git commit -m "Initial commit: Food donation app with authentication, API, and email notifications"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/food-donation-app.git

# Change branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### 1.4 Verify on GitHub

1. Go to your repository URL: `https://github.com/YOUR_USERNAME/food-donation-app`
2. Verify:
   - ✅ All folders are present (client, server, etc.)
   - ✅ All documentation files are present (QUICK_START.md, etc.)
   - ✅ `.env` file is NOT visible (only `.env.example`)
   - ✅ No node_modules folder

**Status**: ✅ Code successfully uploaded to GitHub

---

## Step 2: Deploy Backend to Render (15 minutes)

### 2.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Sign up with GitHub"
3. Authorize Render to access your GitHub account
4. Verify email

### 2.2 Create Web Service

1. In Render dashboard, click "New +" → "Web Service"
2. Click "Deploy from GitHub repository"
3. Click "Connect account" and authorize Render

### 2.3 Select Repository

1. Search for `food-donation-app`
2. Click "Connect" next to your repository
3. You should see your repo in the list

### 2.4 Configure Service

Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `food-donation-backend` |
| **Environment** | `Node` |
| **Region** | Select closest to your location |
| **Branch** | `main` |
| **Build Command** | `cd server && npm install` |
| **Start Command** | `cd server && npm start` |
| **Runtime** | `node-18` or `node-20` |

### 2.5 Add Environment Variables

Scroll down to "Environment" section and click "Add Environment Variable"

Add each one individually:

```
PORT = 5000
NODE_ENV = production
MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/foodDonationDB
JWT_SECRET = your_generated_secret_here
EMAIL_USER = your_email@gmail.com
EMAIL_PASS = your_16_char_app_password
FRONTEND_URL = (leave empty for now, update after Vercel deployment)
```

⚠️ **Important**: Replace the values with your actual credentials

### 2.6 Deploy

1. Click "Create Web Service"
2. Wait for deployment (usually 2-3 minutes)
3. You'll see logs in real-time
4. When done, you'll get a URL like:
   ```
   https://food-donation-xxxxxx.onrender.com
   ```

### 2.7 Verify Backend

1. Visit: `https://food-donation-xxxxxx.onrender.com/`
2. Should see: `Smart Food Donation Backend Running`
3. Visit: `https://food-donation-xxxxxx.onrender.com/api/donations/stats`
4. Should return JSON with donation statistics

**Status**: ✅ Backend successfully deployed

**Copy this URL** - You'll need it for Vercel!

---

## Step 3: Deploy Frontend to Vercel (10 minutes)

### 3.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com/signup)
2. Click "Continue with GitHub"
3. Authorize Vercel to access GitHub
4. Verify email

### 3.2 Import Project

1. In Vercel dashboard, click "Add New" → "Project"
2. Click "Import Git Repository"
3. Under "GitHub Account", click "Add GitHub App"
4. Search for `food-donation-app`
5. Click "Import"

### 3.3 Configure Project

In the configuration screen:

| Setting | Value |
|---------|-------|
| **Project Name** | `food-donation-client` |
| **Framework Preset** | `Create React App` |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |
| **Install Command** | `npm install` |

### 3.4 Add Environment Variables

Click "Environment Variables" and add:

```
REACT_APP_API_BASE_URL = https://food-donation-xxxxxx.onrender.com/api
REACT_APP_ENV = production
```

⚠️ **Important**: Replace the Render URL with your actual backend URL from Step 2

### 3.5 Deploy

1. Click "Deploy"
2. Wait for build and deployment (usually 3-5 minutes)
3. When done, you'll get a URL like:
   ```
   https://food-donation-client-xxx.vercel.app
   ```

### 3.6 Verify Frontend

1. Visit: `https://food-donation-client-xxx.vercel.app`
2. Page should load without errors
3. No red errors in browser console (F12)
4. Theme toggle should work
5. Navigation menu should work

**Status**: ✅ Frontend successfully deployed

**Copy this URL** - You need it for CORS configuration

---

## Step 4: Update CORS Configuration

Now that both are deployed, update backend CORS:

### 4.1 In Render Dashboard

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click on your `food-donation-backend` service
3. Go to "Environment" tab
4. Find `FRONTEND_URL` variable
5. Set value to your Vercel URL:
   ```
   https://food-donation-client-xxx.vercel.app
   ```
6. Click "Save Changes"
7. Service will auto-restart (takes 1-2 minutes)

### 4.2 Verify Update

1. Check the logs to see restart message
2. Look for: `Server running on port 5000`

**Status**: ✅ CORS configured for production

---

## Step 5: Complete End-to-End Testing (25 minutes)

### Test 1: Frontend Loading (2 minutes)

```
✅ Visit https://your-vercel-url.vercel.app
✅ Page loads in under 5 seconds
✅ No console errors (F12 → Console tab)
✅ All images and CSS load properly
✅ Navigation menu visible
✅ Theme toggle works
```

### Test 2: Registration Flow (5 minutes)

```bash
1. Click "Register" on home page
2. Fill in form:
   - Name: Test User
   - Email: testuser@example.com (use a real email)
   - Password: Test@12345
   - Role: Donor
3. Click "Register"
4. Should redirect to login page
5. Check your email for welcome message ✅
6. Email should contain:
   - Greeting with your name
   - Role confirmation
   - Call to action
```

### Test 3: Login Flow (3 minutes)

```bash
1. On login page, enter:
   - Email: testuser@example.com
   - Password: Test@12345
2. Click "Login"
3. Should redirect to dashboard
4. Check browser localStorage (F12 → Application → localStorage)
5. Should see:
   - token (JWT token)
   - user (JSON with user data)
```

### Test 4: Profile Access (2 minutes)

```bash
1. In navbar, click "Profile"
2. Should show your user information:
   - Name: Test User
   - Email: testuser@example.com
   - Role: Donor
3. Try updating name
4. Should show success message
5. Refresh page - change should persist
```

### Test 5: Add Donation (8 minutes)

```bash
1. In navbar, click "Add Donation"
2. Fill form:
   - Food Name: Rice and Vegetables
   - Quantity: 50 kg
   - Expiry Date: (tomorrow)
   - Location: Your Address
3. Upload an image (location photo)
4. Click "Add Donation"
5. Should show success message
6. Check email for donation confirmation ✅
7. Email should contain:
   - Food details
   - Location with Google Maps link
   - Status (Pending)
8. Click "Dashboard" in navbar
9. Your donation should be listed
10. Status should be "Pending"
```

### Test 6: API Verification (5 minutes)

Open browser Console (F12 → Network tab) and:

```bash
1. Perform any action (login, add donation)
2. Look at Network requests
3. Find API calls to: https://your-render-url.onrender.com/api/*
4. Verify:
   - Status: 200 or 201 (success)
   - Response: Valid JSON
   - No CORS errors
```

### Test 7: Mobile Responsiveness (Optional, 2 minutes)

```bash
1. Open DevTools (F12)
2. Click responsive mode (Ctrl+Shift+M)
3. Test on mobile size (375px width)
4. Verify:
   - Navigation collapses
   - Forms are readable
   - No horizontal scroll
   - Images resize properly
```

---

## ✅ Verification Checklist

### Frontend Deployment
- [ ] Page loads at Vercel URL
- [ ] No console errors
- [ ] No 404 errors in Network tab
- [ ] CSS and images load
- [ ] Navigation works
- [ ] Theme toggle works

### Backend Deployment
- [ ] API responds at Render URL
- [ ] Database connection works
- [ ] Email service initialized
- [ ] All endpoints accessible

### Integration
- [ ] Frontend can reach backend
- [ ] Authentication flow works end-to-end
- [ ] Emails send successfully
- [ ] Data persists in database
- [ ] File uploads work
- [ ] CORS is configured

### User Experience
- [ ] Registration → Email → Login flow works
- [ ] Profile page displays user data
- [ ] Can add donations
- [ ] Can see dashboard
- [ ] Email notifications received
- [ ] No error messages to users

---

## 🐛 Troubleshooting During Testing

### "Cannot reach API"
**Problem**: Frontend can't reach backend
**Solution**:
- Check `REACT_APP_API_BASE_URL` in Vercel env variables
- Make sure Render backend is running (check logs)
- Try visiting backend URL directly in browser
- Clear browser cache and reload (Ctrl+Shift+Delete)

### "Email not sending"
**Problem**: Welcome emails not received
**Solution**:
- Check email address is correct
- Check spam/junk folder
- Verify EMAIL_USER and EMAIL_PASS in Render env
- Make sure Gmail account has 2FA enabled
- Regenerate Gmail App Password

### "Database connection failed"
**Problem**: Backend can't reach MongoDB
**Solution**:
- Verify MONGO_URI in Render env is correct
- Check MongoDB Atlas IP whitelist includes Render IPs
- Test connection string locally first
- Make sure database name is correct

### "Login not working"
**Problem**: Can't login after registration
**Solution**:
- Check that registration email was received
- Verify user was saved to database
- Check password is typed correctly
- Check browser console for JWT errors

---

## 📊 Final Status Check

Create a table of what's deployed:

| Component | URL | Status |
|-----------|-----|--------|
| **Frontend** | https://food-donation-client-xxx.vercel.app | ✅ Live |
| **Backend API** | https://food-donation-xxxxxx.onrender.com | ✅ Live |
| **Database** | MongoDB Atlas | ✅ Connected |
| **GitHub Repo** | https://github.com/YOUR_USERNAME/food-donation-app | ✅ Code backed up |

---

## 📝 Documentation for Team

Share these URLs with anyone who needs them:

```markdown
## Production URLs

**Frontend**: https://food-donation-client-xxx.vercel.app
**Backend API**: https://food-donation-xxxxxx.onrender.com
**GitHub Repo**: https://github.com/YOUR_USERNAME/food-donation-app

## Accessing Dashboards

**Render Dashboard**: https://dashboard.render.com
**Vercel Dashboard**: https://vercel.com/dashboard
**MongoDB Atlas**: https://cloud.mongodb.com

## Making Changes

1. Clone repo: `git clone https://github.com/YOUR_USERNAME/food-donation-app.git`
2. Make changes
3. Commit: `git commit -m "Description"`
4. Push: `git push origin main`
5. Both services auto-deploy on push
```

---

## 🎓 Next Steps for Maintenance

### Regular Monitoring
- [ ] Check Render logs daily for errors
- [ ] Monitor Vercel deployments
- [ ] Watch for failed email deliveries
- [ ] Monitor database performance

### Security
- [ ] Rotate JWT_SECRET monthly
- [ ] Review MongoDB access logs
- [ ] Update dependencies when possible
- [ ] Monitor for vulnerabilities

### Backups
- [ ] Set up MongoDB Atlas backup (automatic)
- [ ] Export important data regularly
- [ ] Keep GitHub as source of truth

---

## 🎉 Success!

Your Food Donation application is now live in production!

### What You've Accomplished

✅ Tested all functionality locally
✅ Deployed backend to Render
✅ Deployed frontend to Vercel
✅ Configured production environment variables
✅ Verified end-to-end user flow
✅ Set up continuous deployment from GitHub

### URLs to Save

- **Frontend**: `https://food-donation-client-xxx.vercel.app`
- **Backend**: `https://food-donation-xxxxxx.onrender.com`
- **GitHub**: `https://github.com/YOUR_USERNAME/food-donation-app`

### For Updates

Just push to GitHub main branch - both Render and Vercel automatically redeploy!

```bash
git push origin main
# Wait 2-3 minutes for auto-deployment
```

---

**Status**: 🚀 DEPLOYMENT COMPLETE
**Date**: April 2026
**Version**: 1.0.0 (Production)

Congratulations! Your app is live! 🎊
