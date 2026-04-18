# Production Deployment Checklist

## For Vercel (Frontend) Deployment

### 1. Add Environment Variables to Vercel
- Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
- Add:
  ```
  Key: REACT_APP_API_BASE_URL
  Value: https://your-backend.onrender.com/api
  ```
  
  (Replace `https://your-backend.onrender.com` with your actual Render backend URL)

### 2. Rebuild After Adding Env Variables
- Click **Redeploy** in the Deployments tab
- **Do NOT skip this step** - the app must rebuild with the new env variables

### 3. Verify Deployment
- Open your deployed Vercel app
- Open DevTools → **Network** tab
- Try login/register
- Check that API calls go to:
  ✅ `https://your-backend.onrender.com/api/auth/login`
  ✅ `https://your-backend.onrender.com/api/auth/register`
  
  NOT ❌ `localhost:5000`

---

## For Render (Backend) Deployment

Your backend CORS in `server/index.js` should allow your Vercel domain:
```javascript
const allowedOrigins = [
  "https://your-vercel-domain.vercel.app",
  "http://localhost:3000"
];
```

---

## Local Development

Your `.env` file is already set for local development:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

No changes needed for local testing.

---

## Quick Troubleshooting

If you see localhost:5000 errors in production:

1. ✅ Check Vercel env variables are set correctly
2. ✅ Click "Redeploy" (app must rebuild)
3. ✅ Clear browser cache (Ctrl+Shift+Delete)
4. ✅ Wait 1-2 minutes after redeploy for CDN refresh
5. ✅ Check DevTools Network tab for actual API URL being called
