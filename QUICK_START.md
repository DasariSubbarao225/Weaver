# Quick Deployment Guide

Choose your deployment method:

## 🚀 Method 1: Vercel (Recommended - Everything on GitHub/Vercel)

**Deploy both frontend and API from GitHub in one place.**

### Steps:
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Import repository: `DasariSubbarao225/Weaver`
3. Click "Deploy"
4. Done! Your site is live with working API

**Result**: `https://your-project.vercel.app` (both frontend + API)

📖 **Full Guide**: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

---

## 🔧 Method 2: Separate Deployments (Traditional)

**Deploy frontend and backend separately.**

### Steps:
1. Deploy backend to [Render](https://render.com)
   - Create Web Service from GitHub
   - Root directory: `backend`
   - Get API URL: `https://weaver-api.onrender.com`

2. Update frontend config (`js/config.js`) with API URL

3. Deploy frontend to GitHub Pages
   - Enable in repository Settings → Pages
   - Push to main branch

**Result**: 
- Frontend: `https://dasarisubbarao225.github.io/Weaver/`
- Backend: `https://weaver-api.onrender.com`

📖 **Full Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📊 Quick Comparison

| Feature | Vercel | Separate |
|---------|--------|----------|
| Setup Time | 5 minutes | 15-20 minutes |
| Deployments | 1 (combined) | 2 (separate) |
| Maintenance | Low | Medium |
| Data Persistence | Ephemeral* | Persistent |
| Cost (Free Tier) | Excellent | Good |
| Best For | Quick setup, demos | Production apps |

*Vercel can use external databases for persistence

---

## 🎯 Which Should I Choose?

- **New project / Quick demo**: Use Vercel
- **Learning / Portfolio**: Use Vercel  
- **Production with frequent content updates**: Use Separate
- **Need persistent storage**: Use Separate OR Vercel + Database

---

## 📚 More Information

- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Complete Vercel guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Traditional deployment guide
- [README.md](README.md) - Project overview and local setup
- [SETUP.md](SETUP.md) - Development setup

---

## 🆘 Need Help?

1. Check the detailed guides above
2. Review troubleshooting sections
3. Check GitHub Issues
4. Consult platform documentation (Vercel/Render)
