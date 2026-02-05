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
- **📷 Media Library**: Store and manage images and video URLs
- **⚙️ Settings**: Configure theme colors and admin credentials

### Configuration Storage

The admin panel now uses a **backend server** for persistent storage. All configuration changes are:
- **Saved to backend**: Changes are stored in `backend/data/content.json`
- **Shared across users**: All users see the latest updates instantly
- **Persistent**: Data persists across sessions and devices
- **Export/Import**: Download or upload configuration as JSON for backup/migration

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher) - Required for backend server
- **npm** (v6 or higher) - Comes with Node.js

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/DasariSubbarao225/Weaver.git
   cd Weaver
   ```

2. **Start the backend server**
   ```bash
   cd backend
   npm install
   npm start
   ```
   
   The backend server will start on `http://localhost:3000`
   
   **Important**: The backend must be running for the admin panel and site to work properly.

3. **Open the website** (in a separate terminal)
   ```bash
   # Navigate back to project root
   cd ..
   
   # Using Python 3
   python3 -m http.server 8000
   
   # OR using Node.js (http-server)
   npx http-server
   ```

4. **Access the website**
   - Open your browser and navigate to `http://localhost:8000`
   - The website will communicate with the backend at `http://localhost:3000`

## 📁 Project Structure

```
Weaver/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Stylesheet with responsive design
├── js/
│   └── script.js          # JavaScript for interactivity (loads from backend API)
├── admin/                  # Admin panel
│   ├── index.html         # Admin login page
│   ├── dashboard.html     # Admin dashboard
│   ├── admin-styles.css   # Admin panel styles
│   ├── admin-auth.js      # Authentication logic (uses backend API)
│   └── admin-dashboard.js # Dashboard functionality (uses backend API)
├── backend/                # Backend server (NEW)
│   ├── server.js          # Express server with REST API
│   ├── package.json       # Node.js dependencies
│   ├── README.md          # Backend documentation
│   ├── data/
│   │   └── content.json   # Persistent content storage
│   └── uploads/           # Directory for future media file uploads
├── data/                   # Legacy configuration files (deprecated)
│   ├── site-config.json   # (No longer used - migrated to backend)
│   └── admin-config.json  # (No longer used - migrated to backend)
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment workflow
└── README.md              # Project documentation
```

## 🔌 Backend API

The backend server provides a REST API for content management:

### API Endpoints

#### GET /api/content
Retrieves all site content and configuration.

**Example Request:**
```bash
curl http://localhost:3000/api/content
```

**Example Response:**
```json
{
  "site": {
    "name": "Weaver Interiors",
    "tagline": "Transforming spaces, enriching lives.",
    "description": "Interior design services"
  },
  "hero": { ... },
  "services": { ... },
  "portfolio": { ... },
  "contact": { ... },
  "settings": { ... }
}
```

#### POST /api/content
Saves updated content and configuration.

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -d @backend/data/content.json
```

**Example Response:**
```json
{
  "success": true,
  "message": "Content saved successfully"
}
```

#### GET /health
Health check endpoint.

```bash
curl http://localhost:3000/health
```

### Content Storage Format

All content is stored in `backend/data/content.json`. The structure includes:

- **site**: Site metadata (name, tagline, description)
- **hero**: Hero section (title, subtitle, button, background)
- **about**: About section (title, paragraphs, features)
- **services**: Services list with titles and descriptions
- **portfolio**: Portfolio items with images/videos/gradients
- **contact**: Contact information and business hours
- **media**: Media library (images and videos)
- **settings**: Theme settings (colors)
- **admin**: Admin credentials (username and password hash)

See `backend/README.md` for detailed documentation.

## 🎨 Customization

### Using Admin Panel (Recommended)
1. **Start the backend server** (required)
2. Login to the admin panel at `/admin/`
3. Navigate to different sections to edit content
4. Use the Settings page to change theme colors
5. Save changes - they're instantly reflected for all users

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

### Important Note for Production

When deploying to production, you'll need to:
1. Deploy the backend server to a hosting service (Heroku, AWS, DigitalOcean, etc.)
2. Update the `API_BASE_URL` in the following files to point to your backend server:
   - `admin/admin-auth.js`
   - `admin/admin-dashboard.js`
   - `js/script.js`
3. Deploy the frontend to your preferred static hosting service

### GitHub Pages (Frontend Only)

**Note**: GitHub Pages only hosts static files. You'll need a separate backend server.

1. **Deploy backend separately** (Heroku, Railway, etc.)
2. **Update API URLs** in frontend files to point to your backend
3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch
   - Save the settings

4. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy website"
   git push origin main
   ```

5. **Automated Deployment**
   - The GitHub Actions workflow will automatically deploy to GitHub Pages
   - Your site will be available at: `https://DasariSubbarao225.github.io/Weaver/`

### Backend Deployment Options

#### Heroku
```bash
cd backend
heroku create weaver-backend
git push heroku main
```

#### Railway
1. Connect your GitHub repository
2. Select the `backend` directory
3. Deploy automatically

#### DigitalOcean / AWS / Azure
Deploy as a Node.js application on any cloud platform.

### Manual Deployment

#### Netlify (Frontend)
1. Sign up at [Netlify](https://www.netlify.com/)
2. Drag and drop the project folder (excluding backend)
3. Update API URLs to point to your backend server

#### Vercel (Frontend)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts
4. Update API URLs to point to your backend server

#### Traditional Web Hosting
1. Upload frontend files to your web server via FTP
2. Deploy backend to a Node.js hosting service
3. Update API URLs in frontend files
4. Ensure `index.html` is in the root directory

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (ES6+)**: Interactive features with async/await
- **Fetch API**: For backend communication

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework for REST API
- **CORS**: Cross-Origin Resource Sharing middleware
- **File System (fs)**: JSON-based persistent storage

### DevOps
- **GitHub Actions**: CI/CD automation for frontend
- **npm**: Package management

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