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

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/DasariSubbarao225/Weaver.git
   cd Weaver
   ```

2. **Open the website**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. **Access the website**
   - Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
Weaver/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Stylesheet with responsive design
├── js/
│   └── script.js          # JavaScript for interactivity
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment workflow
└── README.md              # Project documentation
```

## 🎨 Customization

### Colors
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

### Content
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