# Quick Setup Guide for Deploying Weaver Interiors

This guide will help you deploy your Weaver Interiors website from scratch.

## Overview

The Weaver application consists of:
1. **Frontend**: Static website (HTML/CSS/JavaScript)
2. **Backend API**: Node.js server for content management

## Step-by-Step Deployment

### Part 1: Deploy Backend API (15 minutes)

#### Option A: Deploy to Render (Recommended)

1. **Create Account**
   - Visit [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Select "Build and deploy from a Git repository"
   - Click "Connect" next to your Weaver repository
   - If not listed, click "Configure account" to grant access

3. **Configure Service**
   Fill in these details:
   - **Name**: `weaver-api` (or your preferred name)
   - **Region**: Choose closest to your target audience
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. **Add Environment Variables**
   Click "Advanced" and add:
   ```
   NODE_ENV = production
   ALLOWED_ORIGINS = https://dasarisubbarao225.github.io
   ```
   (Replace with your actual GitHub Pages URL)

5. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Copy your service URL (e.g., `https://weaver-api.onrender.com`)

#### Option B: Deploy to Railway

1. Visit [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your Weaver repository
5. In settings, set:
   - Root directory: `backend`
   - Environment variables: `NODE_ENV=production`, `ALLOWED_ORIGINS=your-frontend-url`
6. Copy the generated URL

### Part 2: Configure Frontend (5 minutes)

1. **Update API URL**
   - Open your repository in GitHub
   - Navigate to `js/config.js`
   - Click the edit button (pencil icon)
   - Find lines 22-24:
     ```javascript
     if (hostname.includes('github.io')) {
         return 'https://weaver-api.onrender.com';
     }
     ```
   - Replace `https://weaver-api.onrender.com` with YOUR API URL from Part 1
   - Scroll down and commit the change

2. **Verify Configuration**
   - Also check line 29-31 for custom domain configuration if needed
   - Commit changes with message: "Update production API URL"

### Part 3: Deploy Frontend (5 minutes)

1. **Enable GitHub Pages**
   - Go to your repository Settings
   - Click "Pages" in the left sidebar
   - Under "Build and deployment":
     - Source: "Deploy from a branch"
     - Branch: Select `gh-pages`
     - Folder: `/ (root)`
   - Click "Save"

2. **Trigger Deployment**
   - Go to the "Actions" tab
   - The workflow should run automatically after your config change
   - If not, click "Deploy Weaver Interiors Frontend" → "Run workflow"

3. **Wait for Deployment**
   - Watch the workflow run (takes 1-2 minutes)
   - Green checkmark = successful deployment
   - Your site will be live at: `https://dasarisubbarao225.github.io/Weaver/`

### Part 4: Test Everything (5 minutes)

1. **Test Backend**
   Open in browser: `https://your-api-url.com/api/health`
   
   Should show:
   ```json
   {"status":"ok","timestamp":"..."}
   ```

2. **Test Frontend**
   - Visit: `https://dasarisubbarao225.github.io/Weaver/`
   - Open browser console (F12)
   - Look for: "Weaver API Configuration"
   - Should show your production API URL

3. **Test Admin Panel**
   - Go to: `https://dasarisubbarao225.github.io/Weaver/admin/`
   - Login: username `admin`, password `password`
   - Try editing site content
   - Click "Save Changes"
   - Verify changes appear on main site

## Troubleshooting

### Problem: Frontend shows "Failed to load configuration"

**Solution:**
- Check browser console for errors
- Verify backend API is running
- Check CORS settings in backend

### Problem: CORS Error

**Solution:**
- Go to Render dashboard
- Click your service → "Environment"
- Verify `ALLOWED_ORIGINS` includes your GitHub Pages URL
- No trailing slash: `https://dasarisubbarao225.github.io` ✓
- With trailing slash: `https://dasarisubbarao225.github.io/` ✗

### Problem: Changes not appearing

**Solution:**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check GitHub Actions completed successfully
- Wait 2-3 minutes for GitHub Pages CDN to update

### Problem: Backend not responding

**Solution:**
- Render free tier sleeps after inactivity
- First request may take 30-60 seconds to wake up
- Subsequent requests will be fast

## Next Steps

After successful deployment:

1. **Change Admin Password**
   - Login to admin panel
   - Go to Settings
   - Update username and password

2. **Customize Content**
   - Update site name, tagline, contact info
   - Add your own services and portfolio items
   - Upload real images

3. **Optional: Custom Domain**
   - Buy a domain from Namecheap, GoDaddy, etc.
   - Configure DNS settings
   - Update in GitHub Pages settings
   - Update `ALLOWED_ORIGINS` in backend

4. **Monitor Your Site**
   - Bookmark: `https://your-api.onrender.com/api/health`
   - Check regularly to ensure API is responding

## Cost Breakdown

- **Frontend (GitHub Pages)**: FREE forever
- **Backend (Render Free Tier)**: FREE
  - 750 hours/month (enough for one always-on service)
  - Sleeps after 15 minutes of inactivity
  - Wakes up on first request (30-60 second delay)

**Total Monthly Cost: $0** ✨

## Getting Help

If you run into issues:
1. Check `DEPLOYMENT.md` for detailed troubleshooting
2. Check `backend/DEPLOYMENT.md` for backend-specific help
3. Review Render/Railway platform documentation
4. Check GitHub Actions logs for deployment errors

## Architecture

```
Users → GitHub Pages (Frontend) → Render/Railway (Backend API) → JSON Storage
```

## Automatic Updates

Once deployed, any changes you push to the main branch will automatically:
- Update the frontend via GitHub Actions
- Update the backend via Render/Railway auto-deploy

Just edit, commit, and push - no manual deployment needed!

---

**Congratulations!** 🎉 Your Weaver Interiors website is now live!
