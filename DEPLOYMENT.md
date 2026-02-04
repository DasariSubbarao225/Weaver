# Weaver Interiors - Deployment Guide

## Quick Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Merge the Pull Request**
   - Review and merge the PR into the `main` branch
   - The GitHub Actions workflow will automatically deploy the website

2. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: Deploy from a branch
     - Branch: `gh-pages` / `root`
   - Click **Save**

3. **Access Your Website**
   - Your site will be live at: `https://DasariSubbarao225.github.io/Weaver/`
   - Initial deployment may take 2-3 minutes

### Manual Deployment Options

#### Option 1: Netlify (Easiest)
1. Go to [Netlify](https://www.netlify.com/)
2. Sign up or log in
3. Drag and drop the entire project folder
4. Your site is live instantly!

#### Option 2: Vercel
```bash
npm i -g vercel
cd /path/to/Weaver
vercel
```

#### Option 3: Traditional Web Hosting
1. Upload all files via FTP to your web server
2. Ensure `index.html` is in the root directory
3. Access your domain

## Local Development

### Run Locally
```bash
# Clone the repository
git clone https://github.com/DasariSubbarao225/Weaver.git
cd Weaver

# Start a local server (choose one):

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

## Customization Guide

### Update Contact Information
Edit `index.html` around line 152:
```html
<p>📞 Phone: YOUR-PHONE</p>
<p>📧 Email: YOUR-EMAIL</p>
<p>📍 Address: YOUR-ADDRESS</p>
```

### Change Colors
Edit `css/styles.css` lines 7-13:
```css
:root {
    --primary-color: #667eea;    /* Main brand color */
    --secondary-color: #764ba2;  /* Secondary color */
    --text-dark: #333;
    --text-light: #666;
}
```

### Add Real Images
Replace gradient backgrounds in portfolio section with images:
```html
<div class="portfolio-image" style="background-image: url('images/project1.jpg');"></div>
```

### Modify Services
Edit `index.html` around line 75-102 to add/remove/change services.

## Troubleshooting

### Website Not Showing After Deployment
- Wait 2-3 minutes for GitHub Pages to build
- Check Actions tab for deployment status
- Ensure `gh-pages` branch is selected in Settings → Pages

### Contact Form Not Working
- The form currently shows success message (demo mode)
- To make it functional, integrate with:
  - [Formspree](https://formspree.io/)
  - [Netlify Forms](https://www.netlify.com/products/forms/)
  - Backend API endpoint

### Mobile Menu Not Working
- Ensure JavaScript is enabled in browser
- Check browser console for errors
- Clear browser cache

## File Structure
```
Weaver/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styles
├── js/
│   └── script.js          # All JavaScript
├── .github/
│   └── workflows/
│       └── deploy.yml     # Deployment workflow
├── .gitignore             # Git ignore rules
└── README.md              # Documentation
```

## Support

For issues or questions:
- Create an issue in the GitHub repository
- Check the README.md for detailed documentation
- Review commit history for recent changes

## Next Steps

1. ✅ Merge the PR to `main` branch
2. ✅ Enable GitHub Pages in repository settings
3. ✅ Verify deployment at your GitHub Pages URL
4. ✨ Customize content and colors to match your brand
5. 🖼️ Add real project images to portfolio
6. 📧 Configure contact form backend (optional)
7. 🚀 Share your website!

---

**Note**: This is a static website. For dynamic features (database, user authentication, etc.), you'll need to integrate with backend services or upgrade to a full-stack framework.
