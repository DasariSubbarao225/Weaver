// Weaver Interiors Backend Server
// Provides REST API for admin panel content management

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CONTENT_FILE = path.join(__dirname, 'data', 'content.json');

// Middleware
app.use(cors()); // Enable CORS for all routes (for development)
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies with larger limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Weaver Backend Server is running' });
});

// GET /api/content - Retrieve all site content and configuration
app.get('/api/content', (req, res) => {
    try {
        // Check if content file exists
        if (!fs.existsSync(CONTENT_FILE)) {
            // Return default configuration if file doesn't exist
            const defaultConfig = getDefaultConfig();
            return res.json(defaultConfig);
        }

        // Read content from file
        const content = fs.readFileSync(CONTENT_FILE, 'utf8');
        const data = JSON.parse(content);
        
        res.json(data);
    } catch (error) {
        console.error('Error reading content:', error);
        res.status(500).json({ 
            error: 'Failed to read content',
            message: error.message 
        });
    }
});

// POST /api/content - Save updated content and configuration
app.post('/api/content', (req, res) => {
    try {
        const content = req.body;
        
        // Validate that content is provided
        if (!content || typeof content !== 'object') {
            return res.status(400).json({ 
                error: 'Invalid content',
                message: 'Content must be a valid JSON object'
            });
        }

        // Ensure data directory exists
        const dataDir = path.dirname(CONTENT_FILE);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Write content to file
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf8');
        
        res.json({ 
            success: true,
            message: 'Content saved successfully'
        });
    } catch (error) {
        console.error('Error saving content:', error);
        res.status(500).json({ 
            error: 'Failed to save content',
            message: error.message 
        });
    }
});

// Default configuration function
function getDefaultConfig() {
    return {
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
}

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not found',
        message: 'The requested endpoint does not exist'
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log('=================================================');
    console.log('  Weaver Interiors Backend Server');
    console.log('=================================================');
    console.log(`  Server running on: http://localhost:${PORT}`);
    console.log(`  Health check: http://localhost:${PORT}/health`);
    console.log(`  API endpoints:`);
    console.log(`    GET  /api/content - Retrieve content`);
    console.log(`    POST /api/content - Save content`);
    console.log(`  Static files: http://localhost:${PORT}/uploads`);
    console.log('=================================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});
