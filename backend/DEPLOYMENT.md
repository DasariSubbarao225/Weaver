# Backend Deployment Guide

This guide covers deploying the Weaver Interiors backend API to various cloud platforms.

## Prerequisites

- GitHub account with repository access
- Cloud platform account (Render, Railway, or Heroku)

## Option 1: Deploy to Render (Recommended)

Render provides free hosting for web services with automatic deployments from GitHub.

### Step 1: Create a Render Account
1. Go to [render.com](https://render.com/)
2. Sign up using your GitHub account

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `DasariSubbarao225/Weaver`
3. Configure the service:
   - **Name**: `weaver-api` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Configure Environment Variables
1. In the service settings, add environment variables:
   - `NODE_ENV`: `production`
   - `ALLOWED_ORIGINS`: `https://dasarisubbarao225.github.io,https://yourdomain.com`
   - `PORT`: (leave empty, Render sets this automatically)

### Step 4: Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy your API
3. Your API URL will be: `https://weaver-api.onrender.com` (or your service name)

### Step 5: Update Frontend Configuration
1. Open `/js/config.js` in your repository
2. Update the production API URLs to match your Render service URL
3. Commit and push the changes

## Option 2: Deploy to Railway

Railway offers a simple deployment process with a free tier.

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app/)
2. Sign up with GitHub

### Step 2: Deploy from GitHub
1. Click "New Project" → "Deploy from GitHub repo"
2. Select `DasariSubbarao225/Weaver`
3. Railway will detect the Node.js backend automatically

### Step 3: Configure
1. Go to project settings
2. Set the root directory to `backend`
3. Add environment variables:
   - `NODE_ENV`: `production`
   - `ALLOWED_ORIGINS`: Your frontend URL(s)

### Step 4: Get URL
1. Railway generates a public URL
2. Update your frontend config with this URL

## Option 3: Deploy to Heroku

Heroku is a mature platform with good Node.js support.

### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

### Step 2: Create Heroku App
```bash
cd backend
heroku create weaver-api
```

### Step 3: Configure
```bash
heroku config:set NODE_ENV=production
heroku config:set ALLOWED_ORIGINS=https://dasarisubbarao225.github.io
```

### Step 4: Deploy
```bash
git subtree push --prefix backend heroku main
```

## Testing Your Deployment

After deployment, test your API:

### Health Check
```bash
curl https://your-api-url.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-02-05T01:00:00.000Z"
}
```

### Content Endpoint
```bash
curl https://your-api-url.com/api/content
```

Should return your site configuration JSON.

## Updating Frontend Configuration

After deploying the backend, update the frontend to use the production API URL:

1. Edit `/js/config.js`
2. Replace the production API URL:
   ```javascript
   // GitHub Pages detection
   if (hostname.includes('github.io')) {
       return 'https://your-actual-api-url.onrender.com'; // Update this
   }
   ```

3. Commit and push:
   ```bash
   git add js/config.js
   git commit -m "Update production API URL"
   git push origin main
   ```

## Continuous Deployment

All platforms support automatic deployments:

- **Render**: Automatically deploys when you push to the main branch
- **Railway**: Automatically deploys on push
- **Heroku**: Set up automatic deployments via GitHub integration

## Monitoring

### Check API Status
Visit your API root URL (e.g., `https://weaver-api.onrender.com/`) to see API information.

### View Logs
- **Render**: Dashboard → Your Service → Logs
- **Railway**: Project → Deployments → Logs  
- **Heroku**: `heroku logs --tail`

## Troubleshooting

### CORS Errors
If you see CORS errors:
1. Verify `ALLOWED_ORIGINS` includes your frontend URL
2. Check the URL has no trailing slashes
3. Ensure protocol matches (https://)

### API Not Responding
1. Check deployment logs for errors
2. Verify the service is running
3. Test the health endpoint

### Data Not Persisting
Note: The current backend uses file-based storage, which may not persist on some platforms during deployments. For production, consider:
- Using a database (MongoDB, PostgreSQL)
- Using cloud storage (AWS S3, Cloudinary)
- Using a managed CMS

## Cost Estimates

- **Render Free Tier**: 750 hours/month (enough for one service running 24/7)
- **Railway Free Tier**: $5 credit/month
- **Heroku Free Tier**: Deprecated (paid plans start at $7/month)

## Next Steps

1. Deploy backend to your chosen platform
2. Update frontend configuration with production API URL
3. Test the full integration
4. Monitor for any issues
5. Set up custom domain (optional)

## Security Recommendations

1. **Environment Variables**: Never commit sensitive data to Git
2. **CORS**: Always restrict origins in production
3. **Rate Limiting**: Consider adding rate limiting for production
4. **HTTPS**: All platforms provide HTTPS by default
5. **Authentication**: Consider adding API authentication for admin operations

## Support

For issues:
- Check platform documentation
- Review application logs
- Test endpoints individually
- Verify environment variables

---

After deployment, your architecture will be:
```
Frontend (GitHub Pages)
    ↓
Backend API (Render/Railway/Heroku)
    ↓
JSON Data Storage
```
