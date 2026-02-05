# Vercel Deployment Guide

This guide explains how to deploy both the frontend and API to Vercel directly from GitHub.

## Why Vercel?

Vercel provides:
- ✅ **Automatic deployment** from GitHub
- ✅ **Serverless API functions** (no need for separate backend hosting)
- ✅ **Static frontend hosting** (like GitHub Pages)
- ✅ **Free tier** with generous limits
- ✅ **HTTPS/SSL** automatic
- ✅ **Custom domains** support
- ✅ **One deployment** for both frontend and API

## Quick Deployment Steps

### 1. Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub repositories

### 2. Import Your Repository

1. After signing in, click "Add New..." → "Project"
2. Import `DasariSubbarao225/Weaver` repository
3. Vercel will automatically detect the project settings

### 3. Configure Project (Optional)

The project is pre-configured with `vercel.json`, but you can verify:
- **Framework Preset**: Other (or leave as detected)
- **Build Command**: Leave empty (static site)
- **Output Directory**: Leave as `.` (root)
- **Install Command**: Leave default

### 4. Deploy

1. Click "Deploy"
2. Wait for deployment to complete (usually 1-2 minutes)
3. You'll get a URL like: `https://weaver-interiors.vercel.app`

### 5. Test Your Deployment

1. **Test the website**: Visit your Vercel URL
2. **Test the API**:
   ```bash
   curl https://your-project.vercel.app/api/health
   curl https://your-project.vercel.app/api/content
   ```
3. **Test the admin panel**: Visit `https://your-project.vercel.app/admin/`
   - Login with default credentials (admin/password)
   - Make a content change
   - Verify it saves and displays correctly

### 6. Update GitHub Pages (Optional)

If you want to keep using GitHub Pages for the frontend:

1. Edit `/js/config.js` line 24:
   ```javascript
   return 'https://your-project.vercel.app';
   ```
2. Commit and push to GitHub
3. GitHub Pages will use Vercel for API calls

## Architecture

### Deployment Structure
```
Vercel Deployment
├── Frontend (Static Files)
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── admin/
└── API (Serverless Functions)
    └── /api
        ├── health.js      → /api/health
        └── content.js     → /api/content
```

### How It Works

1. **Frontend**: Vercel serves static HTML/CSS/JS files (like GitHub Pages)
2. **API**: Serverless functions in `/api` directory automatically become API endpoints
3. **Requests**: 
   - `https://your-site.vercel.app/` → Static frontend
   - `https://your-site.vercel.app/api/health` → Serverless function
   - `https://your-site.vercel.app/api/content` → Serverless function

## API Endpoints

After deployment, these endpoints are available:

### Health Check
```bash
GET https://your-project.vercel.app/api/health
```

### Get Content
```bash
GET https://your-project.vercel.app/api/content
```

### Save Content
```bash
POST https://your-project.vercel.app/api/content
Content-Type: application/json
```

## Continuous Deployment

Once set up, Vercel automatically deploys:
- ✅ Every push to `main` branch
- ✅ Every pull request (preview deployments)
- ✅ Instant rollbacks available

### Deployment Process
1. Push changes to GitHub
2. Vercel detects the push
3. Automatic build and deploy
4. Live in 1-2 minutes

## Environment Variables (Optional)

If you need to configure environment variables:

1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add variables (e.g., for API keys, database URLs)

Example:
- `NODE_ENV`: `production`
- `MAX_FILE_SIZE`: `10485760`

## Custom Domain Setup

### Add Custom Domain

1. Go to project Settings → Domains
2. Add your domain (e.g., `weaverinteriors.com`)
3. Configure DNS with your domain provider:
   - **A Record**: Points to Vercel's IP
   - **CNAME Record**: Points to `cname.vercel-dns.com`
4. Vercel automatically provisions SSL certificate

### DNS Configuration

Vercel provides specific DNS records after you add your domain. Typically:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

## Data Persistence Note

⚠️ **Important**: Serverless functions use `/tmp` storage which is ephemeral.

**Implications**:
- Content changes persist only during the function's lifetime
- On cold starts (after inactivity), data resets to defaults
- For production use, consider:
  - Vercel KV (Redis-like storage)
  - Vercel Postgres database
  - External database (MongoDB Atlas, Firebase)
  - External storage (AWS S3, Cloudinary)

### Adding Persistent Storage (Advanced)

For persistent content storage, you can integrate:

1. **Vercel KV** (Redis):
   ```bash
   npm install @vercel/kv
   ```
   Then use in serverless functions

2. **MongoDB Atlas** (Free tier available):
   - Create account at mongodb.com
   - Add connection string to Vercel environment variables
   - Update API functions to use MongoDB

3. **GitHub as Storage** (Simple option):
   - Use GitHub API to store content.json in repository
   - Add GitHub token to Vercel environment variables
   - API functions commit changes back to repo

## Monitoring and Logs

### View Deployment Logs
1. Go to your project dashboard
2. Click on a deployment
3. View build logs and function logs

### Function Logs
1. Go to project dashboard
2. Click "Logs" or "Functions"
3. See real-time function execution logs

### Analytics
Vercel provides built-in analytics:
- Page views
- Function invocations
- Performance metrics

## Troubleshooting

### API Not Working
1. Check function logs in Vercel dashboard
2. Verify `/api` directory exists with functions
3. Test endpoints directly: `https://your-site.vercel.app/api/health`

### CORS Errors
- Serverless functions include CORS headers
- Check browser console for specific errors
- Verify function is returning proper headers

### Content Not Persisting
- Expected behavior with `/tmp` storage
- Implement persistent storage (see above)
- Or accept that content resets on cold starts

### Build Failures
1. Check build logs in Vercel dashboard
2. Verify `vercel.json` is valid
3. Ensure no build-time dependencies missing

## Local Development

### Test Serverless Functions Locally

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Run local dev server**:
   ```bash
   vercel dev
   ```

3. **Access locally**:
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3000/api/health`

### Test with Backend Server (Alternative)

If you prefer the traditional backend during development:

```bash
cd backend
npm install
npm start
```

Then serve frontend from root:
```bash
python3 -m http.server 8000
```

## Migration from Render

If you were previously using Render:

1. ✅ Frontend now served from Vercel (instead of GitHub Pages)
2. ✅ API now on Vercel serverless functions (instead of Render)
3. ✅ Single deployment for both
4. ✅ No need to maintain separate backend service

### Old vs New Architecture

**Old (Two Deployments)**:
```
GitHub Pages (Frontend) → Render API (Backend)
```

**New (One Deployment)**:
```
Vercel (Frontend + API Serverless Functions)
```

## Cost Comparison

### Vercel Free Tier
- **Bandwidth**: 100 GB/month
- **Serverless Functions**: 100 GB-Hours
- **Invocations**: 12 million/month
- **Build Time**: 6000 minutes/month
- **Price**: FREE

This is more than sufficient for most projects.

### Upgrade Options
- **Hobby**: $20/month (more resources)
- **Pro**: $20/user/month (team features)

## Production Checklist

Before going live:

- [ ] Deploy to Vercel
- [ ] Test all API endpoints
- [ ] Test admin panel functionality
- [ ] Update admin credentials from defaults
- [ ] Configure custom domain (optional)
- [ ] Set up analytics (optional)
- [ ] Consider persistent storage solution
- [ ] Test on multiple devices/browsers
- [ ] Configure production environment variables

## Additional Features

### Preview Deployments
Every pull request gets a unique preview URL:
- Test changes before merging
- Share with team for review
- Automatic cleanup after PR closes

### Rollbacks
Instant rollback to previous deployment:
1. Go to project dashboard
2. Click "Deployments"
3. Find previous deployment
4. Click "Promote to Production"

### Performance
- **Automatic CDN**: Global edge network
- **Image Optimization**: Automatic image optimization
- **Caching**: Smart caching for static assets

## Getting Help

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: Vercel Discord and GitHub Discussions

## Summary

✅ **Single Deployment**: Frontend + API in one place  
✅ **GitHub Integration**: Automatic deploys on push  
✅ **Free Tier**: Generous limits for most projects  
✅ **No Server Management**: Serverless functions  
✅ **HTTPS**: Automatic SSL certificates  
✅ **Fast**: Global CDN distribution  

---

**Weaver Interiors** - Now deployed entirely from GitHub via Vercel!
