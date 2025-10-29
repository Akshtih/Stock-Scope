# Render Deployment Guide

## Step 1: Prepare Your Repository
✅ Already done - your code is pushed to GitHub!

## Step 2: Sign Up for Render
1. Go to https://render.com/
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

## Step 3: Create a New Web Service
1. Click **"New +"** button in the Render dashboard
2. Select **"Web Service"**
3. Connect your GitHub repository
4. Select the repository containing your StockScope project

## Step 4: Configure the Web Service

### Basic Settings:
- **Name**: `stockscope-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., Oregon, Frankfurt, Singapore)
- **Branch**: `main` or `master` (whichever you're using)
- **Root Directory**: `stockscope-backend`

### Build Settings:
- **Environment**: Select **"Docker"**
- **Dockerfile Path**: `stockscope-backend/Dockerfile` (or just `Dockerfile` if root directory is set)
- Render will automatically detect and use your Dockerfile

### Instance Type:
- Select **"Free"** tier (512 MB RAM, sleeps after 15 minutes of inactivity)

## Step 5: Add Environment Variables

Click **"Advanced"** and add these environment variables:

| Key | Value |
|-----|-------|
| `JAVA_OPTS` | `-Xmx512m` |
| `SPRING_PROFILES_ACTIVE` | `production` |
| `PORT` | `8080` (Render will auto-assign, but this is default) |
| `MONGODB_URI` | `mongodb+srv://admin:1234@cluster0.dfamrvc.mongodb.net/stockscope?retryWrites=true&w=majority&appName=Cluster0` |
| `CORS_ORIGINS` | `https://your-frontend-domain.netlify.app,https://your-custom-domain.com` |

**Important**: After you deploy your frontend, come back and update the `CORS_ORIGINS` with your actual frontend URL!

## Step 6: Deploy!
1. Click **"Create Web Service"**
2. Render will start building your application
3. Wait for the build to complete (5-10 minutes for first deployment)
4. Once deployed, you'll get a URL like: `https://stockscope-backend.onrender.com`

## Step 7: Test Your Backend
Once deployed, test these endpoints:

```bash
# Health check
https://stockscope-backend.onrender.com/api/users

# Test registration (use Postman or curl)
POST https://stockscope-backend.onrender.com/api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "mobile": "9876543210",
  "password": "test123",
  "userType": "Investor"
}
```

## Step 8: Update Frontend API Configuration

In your frontend code, update the API base URL:

**File**: `frontend/js/api-service.js`

Change:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

To:
```javascript
const API_BASE_URL = 'https://stockscope-backend.onrender.com/api';
```

Or better yet, make it environment-aware:
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080/api' 
  : 'https://stockscope-backend.onrender.com/api';
```

## Important Notes for Free Tier:

### 1. Cold Starts
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Solution: Use a service like UptimeRobot to ping your API every 10 minutes

### 2. Memory Limits
- Free tier has 512 MB RAM
- The `-Xmx512m` flag ensures Java doesn't exceed this

### 3. Build Time
- Free tier has limited build minutes per month (750 minutes)
- Each deployment takes 5-10 minutes
- Don't deploy too frequently

### 4. Database
- Your MongoDB Atlas is already set up ✅
- No changes needed there

## Monitoring Your Application

### View Logs:
1. Go to your Render dashboard
2. Click on your service
3. Go to **"Logs"** tab
4. Monitor real-time logs

### Check Health:
- Render provides a dashboard showing:
  - Service status (Running/Sleeping)
  - Memory usage
  - CPU usage
  - Request metrics

## Troubleshooting

### Build Fails:
- Check that Java version matches (Java 17 in pom.xml)
- Ensure Maven can download dependencies
- Check build logs for specific errors

### Service Won't Start:
- Check Start Command is correct
- Verify JAR file name matches: `target/stockscope-backend-1.0.0.jar`
- Check environment variables are set

### Application Errors:
- Check logs in Render dashboard
- Verify MongoDB connection string is correct
- Ensure CORS_ORIGINS includes your frontend domain

### Connection Refused:
- Wait for service to fully start (check logs)
- If sleeping, first request will wake it (takes 30-60 seconds)
- Check if service is in "Running" state

## Next Steps

After backend is deployed:

1. ✅ Deploy frontend to Netlify/Vercel
2. ✅ Update CORS_ORIGINS environment variable with frontend URL
3. ✅ Update frontend API_BASE_URL to point to Render backend
4. ✅ Test full application flow
5. ✅ Set up UptimeRobot to prevent cold starts (optional)

## Cost Information

**Free Tier Includes:**
- 750 hours/month of runtime
- 512 MB RAM
- Automatic HTTPS
- Automatic deploys from GitHub
- Custom domains (optional)

**To Prevent Sleeping** (requires paid plan):
- Upgrade to Starter plan ($7/month)
- Gets 1 GB RAM + always-on service

---

Your backend URL will be: **https://stockscope-backend.onrender.com**

Remember to update this in your frontend after deployment! 🚀
