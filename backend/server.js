const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure required directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Initialize content.json if it doesn't exist
const contentPath = path.join(dataDir, 'content.json');
if (!fs.existsSync(contentPath)) {
    const defaultContent = {
        site: {
            name: "Weaver Interiors",
            tagline: "Transforming spaces, enriching lives.",
            description: "Weaver Interiors - Transform your space with exceptional interior design services"
        },
        hero: {
            title: "Transform Your Space",
            subtitle: "Expert interior design that brings your vision to life",
            buttonText: "Get Started",
            buttonLink: "#contact",
            backgroundImage: ""
        },
        about: {
            title: "About Us",
            paragraphs: [
                "Weaver Interiors is a premier interior design firm dedicated to creating beautiful, functional spaces that reflect your unique style and personality.",
                "With years of experience and a passion for design excellence, we transform ordinary spaces into extraordinary environments that inspire and delight."
            ],
            features: [
                { icon: "✨", title: "Creative Design", description: "Innovative solutions tailored to your needs" },
                { icon: "🎯", title: "Professional Service", description: "Expert guidance from concept to completion" },
                { icon: "💎", title: "Quality Materials", description: "Premium selections for lasting beauty" }
            ]
        },
        services: {
            title: "Our Services",
            items: [
                { id: 1, title: "Residential Design", description: "Complete home interior design services including living rooms, bedrooms, kitchens, and more." },
                { id: 2, title: "Commercial Spaces", description: "Professional office and retail space design that enhances productivity and customer experience." },
                { id: 3, title: "Space Planning", description: "Optimize your space layout for maximum functionality and aesthetic appeal." },
                { id: 4, title: "Color Consultation", description: "Expert color selection to create the perfect mood and atmosphere in your space." },
                { id: 5, title: "Furniture Selection", description: "Curated furniture choices that blend style, comfort, and durability." },
                { id: 6, title: "Project Management", description: "End-to-end project coordination ensuring timely and budget-friendly completion." }
            ]
        },
        portfolio: {
            title: "Our Portfolio",
            items: [
                { id: 1, title: "Modern Living Room", description: "Contemporary design with clean lines", image: "", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", videoUrl: "" },
                { id: 2, title: "Luxury Bedroom", description: "Elegant and serene retreat", image: "", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", videoUrl: "" },
                { id: 3, title: "Gourmet Kitchen", description: "Functional and stylish cooking space", image: "", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", videoUrl: "" },
                { id: 4, title: "Office Space", description: "Productive work environment", image: "", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", videoUrl: "" },
                { id: 5, title: "Dining Area", description: "Perfect for entertaining guests", image: "", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", videoUrl: "" },
                { id: 6, title: "Bathroom Oasis", description: "Spa-like relaxation at home", image: "", gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)", videoUrl: "" }
            ]
        },
        contact: {
            title: "Get In Touch",
            phone: "(555) 123-4567",
            email: "info@weaverinteriors.com",
            address: "123 Design Street, Creative City, ST 12345",
            businessHours: {
                title: "Business Hours",
                hours: [
                    "Monday - Friday: 9:00 AM - 6:00 PM",
                    "Saturday: 10:00 AM - 4:00 PM",
                    "Sunday: Closed"
                ]
            }
        },
        media: {
            images: [],
            videos: []
        },
        settings: {
            primaryColor: "#667eea",
            secondaryColor: "#764ba2"
        },
        admin: {
            username: "admin",
            passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99" // MD5 of "password"
        }
    };
    fs.writeFileSync(contentPath, JSON.stringify(defaultContent, null, 2));
}

// API Routes

// Get all content
app.get('/api/content', (req, res) => {
    try {
        const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
        res.json(content);
    } catch (error) {
        console.error('Error reading content:', error);
        res.status(500).json({ error: 'Failed to load content' });
    }
});

// Update content
app.post('/api/content', (req, res) => {
    try {
        const content = req.body;
        fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
        res.json({ success: true, message: 'Content updated successfully' });
    } catch (error) {
        console.error('Error saving content:', error);
        res.status(500).json({ error: 'Failed to save content' });
    }
});

// Upload image
app.post('/api/upload/image', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ 
            success: true, 
            url: imageUrl,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Upload video
app.post('/api/upload/video', upload.single('video'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const videoUrl = `/uploads/${req.file.filename}`;
        res.json({ 
            success: true, 
            url: videoUrl,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Failed to upload video' });
    }
});

// Get uploaded files list
app.get('/api/uploads', (req, res) => {
    try {
        const files = fs.readdirSync(uploadsDir);
        const fileList = files.map(filename => ({
            filename,
            url: `/uploads/${filename}`,
            path: path.join(uploadsDir, filename)
        }));
        res.json(fileList);
    } catch (error) {
        console.error('Error listing uploads:', error);
        res.status(500).json({ error: 'Failed to list uploads' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Weaver Backend Server running on port ${PORT}`);
    console.log(`Content storage: ${contentPath}`);
    console.log(`Uploads directory: ${uploadsDir}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});
