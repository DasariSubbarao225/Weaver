# Weaver Interiors - Deployment Guide

This guide covers deploying both the frontend (static site) and backend (API) for production use.

## 🚀 Recommended Approach: Vercel (All-in-One)

**Deploy everything from GitHub in one place!**

👉 **See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for complete Vercel deployment guide**

### Quick Vercel Deployment (3 Steps)

1. **Sign up** at [vercel.com](https://vercel.com) with GitHub
2. **Import** `DasariSubbarao225/Weaver` repository  
3. **Deploy** - Done! Frontend + API live in 2 minutes

✅ **Benefits**:
- Single deployment for both frontend and API
- Automatic deployments on every push to GitHub
- Free tier with generous limits
- Built-in serverless functions (no backend server needed)
- HTTPS/SSL automatic
- Custom domains supported

---

## Alternative Approaches

### Option 1: Separate Deployments (Traditional)

If you prefer separate hosting for frontend and backend:

## Architecture Overview

The application consists of two parts:
1. **Frontend**: Static HTML/CSS/JavaScript hosted on GitHub Pages
2. **Backend API**: Node.js/Express server for content management

## Quick Start - Complete Deployment

### Step 1: Deploy Backend API

Choose one of these platforms for hosting the backend:

#### Option A: Render (Recommended - Easiest)

1. **Sign up** at [render.com](https://render.com/) using GitHub
2. **Create New Web Service**: 
   - Click "New +" → "Web Service"
   - Connect repository: `DasariSubbarao225/Weaver`
   - Configure:
     - Name: `weaver-api`
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Plan: Free
3. **Set Environment Variables**:
   - `NODE_ENV`: `production`
   - `ALLOWED_ORIGINS`: `https://dasarisubbarao225.github.io`
4. **Deploy**: Click "Create Web Service"
5. **Note your API URL**: e.g., `https://weaver-api.onrender.com`

#### Option B: Railway

1. Go to [railway.app](https://railway.app/), sign up with GitHub
2. New Project → Deploy from GitHub → Select this repository
3. Set root directory to `backend` in settings
4. Add environment variables (same as above)
5. Get the generated URL

#### Option C: Other Platforms
- See `backend/DEPLOYMENT.md` for Heroku and other options

### Step 2: Update Frontend Configuration

After deploying the backend, update the frontend to use your production API:

1. Edit `js/config.js`
2. Find these lines (around line 22-24):
   ```javascript
   if (hostname.includes('github.io')) {
       return 'https://weaver-api.onrender.com';
   }
   ```
3. Replace `https://weaver-api.onrender.com` with your actual API URL
4. Commit and push:
   ```bash
   git add js/config.js
   git commit -m "Update production API URL"
   git push origin main
   ```

### Step 3: Deploy Frontend (GitHub Pages)

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Click Save

2. **Automatic Deployment**:
   - Push to main branch triggers automatic deployment
   - GitHub Actions workflow handles the deployment
   - Site available at: `https://dasarisubbarao225.github.io/Weaver/`

### Step 4: Test Your Deployment

1. **Test Backend API**:
   ```bash
   curl https://your-api-url.com/api/health
   ```

2. **Test Frontend**:
   - Visit `https://dasarisubbarao225.github.io/Weaver/`
   - Check browser console for API connection
   - Try the admin panel at `/admin/`

3. **Verify Integration**:
   - Login to admin panel (admin/password)
   - Make a change to site content
   - Verify change appears on main site

## Local Development

### Frontend Setup

## Local Development

### Running the Complete Application Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DasariSubbarao225/Weaver.git
   cd Weaver
   ```

2. **Start the Backend API**:
   ```bash
   cd backend
   npm install
   npm start
   ```
   Backend runs on `http://localhost:3000`

3. **Start the Frontend** (in a new terminal):
   ```bash
   cd ..  # Back to project root
   
   # Option 1: Python
   python3 -m http.server 8000
   
   # Option 2: Node.js
   npx http-server -p 8000
   ```
   Frontend runs on `http://localhost:8000`

4. **Access the Application**:
   - Main site: `http://localhost:8000`
   - Admin panel: `http://localhost:8000/admin/`
   - API health: `http://localhost:3000/api/health`

### Configuration for Local Development

The application automatically detects localhost and uses `http://localhost:3000` for the API. No configuration changes needed for local development.

## Environment-Based Configuration

The API URL is automatically determined based on the environment:

- **Local Development** (`localhost`): Uses `http://localhost:3000`
- **GitHub Pages** (`*.github.io`): Uses production API URL
- **Custom Domain**: Uses production API URL

This is configured in `js/config.js`.

## Manual Deployment Options

### Frontend Alternatives to GitHub Pages

#### Netlify (Drop-and-Deploy)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the project folder
3. Set environment variable if needed:
   - Key: `API_BASE_URL`
   - Value: Your backend API URL

#### Vercel
```bash
npm i -g vercel
cd /path/to/Weaver
vercel
```

Follow prompts and set the backend API URL when asked.

## Custom Domain Setup

### For GitHub Pages
1. Go to Settings → Pages
2. Add your custom domain
3. Configure DNS with your domain provider:
   - Add CNAME record pointing to `dasarisubbarao225.github.io`
4. Update `ALLOWED_ORIGINS` in backend to include your domain

### For Backend (Render)
1. Go to service Settings → Custom Domain
2. Add your domain
3. Configure DNS:
   - Add CNAME record pointing to Render's domain

## Configuration Override

You can override the API URL without changing code by setting it in `index.html`:

```html
<script>
window.WEAVER_CONFIG = {
    API_BASE_URL: 'https://your-custom-api-url.com'
};
</script>
<script src="js/config.js"></script>
```

## Monitoring and Maintenance

### Backend Monitoring
- **Render**: Dashboard shows service status and logs
- **Railway**: Monitor deployments and view logs
- Health check endpoint: `https://your-api/api/health`

### Frontend Monitoring  
- GitHub Pages: Check Actions tab for deployment status
- Browser console: Check for API connection errors

## Troubleshooting

### CORS Errors
If you see "CORS policy" errors in the browser console:
1. Add your frontend URL to `ALLOWED_ORIGINS` environment variable in backend
2. Format: `https://domain1.com,https://domain2.com` (comma-separated, no spaces)
3. Redeploy backend after changing environment variables

### API Connection Failed
1. Check backend is running: visit API URL in browser
2. Verify API URL in `js/config.js` matches your backend
3. Check browser console for exact error
4. Test API endpoints directly with curl

### Changes Not Appearing
1. **Frontend**: Clear browser cache or hard refresh (Ctrl+Shift+R)
2. **Backend**: Redeploy or restart the service
3. Check GitHub Actions for deployment status

### Data Not Persisting
The backend uses file-based storage. On platforms like Render's free tier:
- Files may reset on service restart
- Consider using external storage or database for production

## Production Checklist

Before going live:

- [ ] Backend deployed and accessible
- [ ] Frontend API URL updated to production backend
- [ ] CORS configured with correct origins
- [ ] Admin credentials changed from defaults
- [ ] Health endpoint returns "ok"
- [ ] Test content changes via admin panel
- [ ] SSL/HTTPS enabled (automatic on all platforms)
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up

## Continuous Deployment

The repository is configured for continuous deployment:

**GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
- Triggers on push to `main` branch
- Automatically deploys frontend to GitHub Pages

**Backend Auto-Deploy**:
- Render: Automatically redeploys on push to main
- Railway: Automatically redeploys on push
- Configure in platform settings

## Cost Summary

**Free Tier Hosting**:
- Frontend: GitHub Pages (free, unlimited)
- Backend Options:
  - Render: 750 hours/month free
  - Railway: $5 credit/month
  - Vercel: Free tier available

## Getting Help

For deployment issues:
1. Check platform documentation
2. Review application logs
3. Test API endpoints individually
4. Check browser console for errors
5. Verify environment variables

## Next Steps After Deployment

1. **Change Admin Credentials**: Login and update in Settings
2. **Customize Content**: Use admin panel to update site content
3. **Add Real Images**: Upload images for portfolio
4. **Configure Analytics**: Add Google Analytics if desired
5. **SEO Optimization**: Update meta tags and descriptions
6. **Test on Devices**: Check mobile and tablet layouts

---

## Architecture Diagram

```
┌─────────────────────────────────────────┐
│  Users' Browsers                        │
└────────────┬────────────────────────────┘
             │
             ├──────────────────┬──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
┌─────────────────────┐ ┌──────────────┐ ┌──────────────┐
│ GitHub Pages        │ │ Netlify      │ │ Vercel       │
│ (Static Frontend)   │ │ (Frontend)   │ │ (Frontend)   │
└─────────┬───────────┘ └──────┬───────┘ └──────┬───────┘
          │                    │                │
          └────────────────────┴────────────────┘
                               │
                               │ API Requests
                               ▼
                    ┌──────────────────────┐
                    │ Backend API Server   │
                    │ (Render/Railway)     │
                    │                      │
                    │ - Express.js         │
                    │ - CORS enabled       │
                    │ - JSON storage       │
                    └──────────────────────┘
```

## Support

For deployment questions and issues:
- Check this deployment guide
- Review backend deployment guide: `backend/DEPLOYMENT.md`
- Check GitHub repository issues
- Review platform-specific documentation

---

**Weaver Interiors** - Transforming spaces, enriching lives.

---

## Comparison: Vercel vs Separate Deployments

### Vercel (All-in-One)
✅ **Pros**:
- Single deployment from GitHub
- Serverless API (no server to manage)
- Automatic deployments on push
- Free tier generous enough for most projects
- Preview deployments for PRs
- Built-in CDN

❌ **Cons**:
- Data storage is ephemeral (resets on cold starts)
- Requires persistent storage solution for production
- Learning serverless paradigm

### Separate Deployments (GitHub Pages + Render)
✅ **Pros**:
- Traditional backend server approach
- Persistent file storage on Render
- Familiar Express.js patterns
- Independent scaling

❌ **Cons**:
- Two separate deployments to manage
- More complex setup process
- Render free tier has limitations (spins down after inactivity)
- Need to coordinate frontend/backend updates

### Recommendation by Use Case

| Use Case | Recommended Approach |
|----------|---------------------|
| **Quick demo/portfolio** | Vercel (fastest setup) |
| **Learning/experimentation** | Vercel (free tier generous) |
| **Production with frequent content updates** | Separate (Render + GitHub Pages) |
| **Production requiring persistent data** | Vercel + database (MongoDB/Postgres) |
| **Low traffic, occasional updates** | Either approach works |
| **High traffic** | Vercel (better CDN and scaling) |

---

**Current Repository**: Supports both approaches! Choose what works best for your needs.