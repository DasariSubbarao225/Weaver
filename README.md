# Weaver Interiors

A modern, responsive interior design website showcasing services, portfolio, and contact information.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Interactive Navigation**: Mobile-friendly hamburger menu with smooth scrolling
- **Portfolio Gallery**: Showcase of interior design projects with hover effects
- **Contact Form**: Functional contact form with validation
- **Services Section**: Comprehensive list of interior design services
- **About Section**: Company information with key features
- **GitHub Pages Deployment**: Automated deployment workflow
- **🆕 Admin Panel**: Configurable admin dashboard for content management

## 🔧 Admin Panel

### Accessing the Admin Panel

1. Navigate to `/admin/` or click "Admin Panel" in the footer
2. Login with default credentials:
   - **Username**: admin
   - **Password**: password

### Admin Features

- **📊 Dashboard**: Overview of all site content with quick access buttons
- **📝 Content Editor**: Edit site info, hero section, about section, and contact details
- **🛠️ Services Manager**: Add, edit, and delete services
- **🖼️ Portfolio Manager**: Manage portfolio items with image/video support
- **📷 Media Library**: Upload and manage images and videos (supports file uploads!)
- **⚙️ Settings**: Configure theme colors and admin credentials

### Configuration Storage

The admin panel now uses **server-side file-based storage**:
- All content is saved to `backend/data/content.json` via REST API
- Changes persist across browser sessions and devices
- File uploads (images/videos) are stored in `backend/uploads/`
- You can still export/import configuration as JSON for backup/migration

**Note:** The backend server must be running for the admin panel to function.

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/DasariSubbarao225/Weaver.git
   cd Weaver
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm install
   npm start
   ```
   
   The backend server will start on `http://localhost:3000` and provide:
   - REST API for content management
   - File upload handling for images and videos
   - Static file serving for uploaded media

3. **Start the Frontend Server (in a new terminal)**
   ```bash
   # From the Weaver root directory
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js (http-server)
   npx http-server -p 8000
   ```

4. **Access the website**
   - Main site: `http://localhost:8000`
   - Admin panel: `http://localhost:8000/admin/`
   - Default credentials: username `admin`, password `password`

**Note:** Both backend (port 3000) and frontend (port 8000) servers must be running simultaneously for the admin panel to work properly.

## 🔌 Backend API

The backend server provides a REST API for managing site content and media uploads.

### API Endpoints

#### `GET /api/content`
Retrieves the current site configuration.

**Response:**
```json
{
  "site": { "name": "...", "tagline": "...", "description": "..." },
  "hero": { "title": "...", "subtitle": "...", ... },
  "about": { ... },
  "services": { ... },
  "portfolio": { ... },
  "contact": { ... },
  "media": { "images": [...], "videos": [...] }
}
```

#### `POST /api/content`
Saves site configuration.

**Request Body:** Complete configuration object (JSON)

**Response:**
```json
{
  "success": true,
  "message": "Content saved successfully"
}
```

#### `POST /api/upload`
Uploads an image or video file.

**Request:** `multipart/form-data` with `file` field

**Response:**
```json
{
  "success": true,
  "url": "/uploads/filename.jpg",
  "filename": "filename.jpg",
  "originalName": "original.jpg",
  "mimetype": "image/jpeg",
  "size": 12345
}
```

**Supported file types:**
- Images: JPEG, PNG, GIF, WebP
- Videos: MP4, WebM, OGG

**File size limit:** 10MB

#### `GET /uploads/:filename`
Serves uploaded media files statically.

#### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-04T18:15:00.000Z"
}
```

### Data Storage

- **Content:** Stored in `backend/data/content.json`
- **Uploads:** Stored in `backend/uploads/` directory
- All changes persist to disk immediately

### Future Improvements

The current implementation uses file-based storage for simplicity. Future enhancements could include:

- **Authentication:** Add JWT-based authentication for API endpoints
- **Database:** Migrate from file storage to MongoDB or PostgreSQL
- **Cloud Storage:** Integrate AWS S3 or similar for media uploads
- **Rate Limiting:** Add request rate limiting for security
- **Image Processing:** Add automatic image optimization and thumbnail generation

## 📁 Project Structure

```
Weaver/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Stylesheet with responsive design
├── js/
│   └── script.js          # JavaScript for interactivity (fetches from API)
├── admin/                  # Admin panel
│   ├── index.html         # Admin login page
│   ├── dashboard.html     # Admin dashboard
│   ├── admin-styles.css   # Admin panel styles
│   ├── admin-auth.js      # Authentication logic
│   └── admin-dashboard.js # Dashboard functionality (uses API)
├── backend/                # Backend server (NEW)
│   ├── server.js          # Express.js server
│   ├── package.json       # Node.js dependencies
│   ├── data/
│   │   └── content.json   # Site configuration storage
│   └── uploads/           # Uploaded media files
├── data/                   # Legacy configuration files
│   ├── site-config.json   # Default site configuration
│   └── admin-config.json  # Admin settings
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment workflow
└── README.md              # Project documentation
```

## 🎨 Customization

### Using Admin Panel (Recommended)
1. Login to the admin panel at `/admin/`
2. Navigate to different sections to edit content
3. Use the Settings page to change theme colors
4. Save changes to see them reflected on the main site

### Manual Customization

#### Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-dark: #333;
    --text-light: #666;
    --bg-light: #f8f9fa;
    --white: #ffffff;
}
```

#### Content
- **Company Information**: Edit the text in `index.html`
- **Services**: Modify the services section in `index.html`
- **Portfolio Items**: Update the portfolio grid in `index.html`
- **Contact Details**: Change contact information in the contact section

### Adding Images
Replace the gradient backgrounds in portfolio items with actual images:
```html
<div class="portfolio-image" style="background-image: url('images/your-image.jpg');"></div>
```

## 🌐 Deployment

### GitHub Pages (Automatic)

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch
   - Save the settings

2. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy website"
   git push origin main
   ```

3. **Automated Deployment**
   - The GitHub Actions workflow will automatically deploy to GitHub Pages
   - Your site will be available at: `https://DasariSubbarao225.github.io/Weaver/`

### Manual Deployment

#### Netlify
1. Sign up at [Netlify](https://www.netlify.com/)
2. Drag and drop the project folder
3. Your site is live!

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

#### Traditional Web Hosting
1. Upload all files to your web server via FTP
2. Ensure `index.html` is in the root directory
3. Access your domain

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (ES6+)**: Interactive features
- **GitHub Actions**: CI/CD automation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Features Breakdown

### Navigation
- Fixed navigation bar
- Smooth scroll to sections
- Mobile-responsive hamburger menu
- Active link highlighting

### Hero Section
- Eye-catching gradient background
- Call-to-action button
- Animated entrance

### About Section
- Company overview
- Feature highlights with icons
- Clean, readable layout

### Services
- Grid layout of services
- Hover effects
- Comprehensive service descriptions

### Portfolio
- Project showcase with gradient placeholders
- Hover animations
- Click interactions

### Contact
- Contact information display
- Business hours
- Functional contact form with validation
- Success/error message feedback

## 🔧 Development

### Testing
Open the website in multiple browsers and devices to ensure compatibility:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS, Android)
- Tablet devices
- Different screen sizes

### Performance
The website is optimized for performance:
- Minimal external dependencies
- Optimized CSS and JavaScript
- Fast loading times
- Efficient animations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For any inquiries about Weaver Interiors:
- **Email**: info@weaverinteriors.com
- **Phone**: (555) 123-4567
- **Address**: 123 Design Street, Creative City, ST 12345

## 🙏 Acknowledgments

- Modern web design best practices
- CSS Grid and Flexbox layouts
- Responsive design principles
- GitHub Pages hosting

---

**Weaver Interiors** - Transforming spaces, enriching lives.