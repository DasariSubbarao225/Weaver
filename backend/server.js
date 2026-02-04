const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'content.json');

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies with size limit

// Ensure data directory exists
async function ensureDataDirectory() {
    const dataDir = path.join(__dirname, 'data');
    try {
        await fs.access(dataDir);
    } catch (error) {
        await fs.mkdir(dataDir, { recursive: true });
        console.log('Created data directory');
    }
}

// Initialize content file with default data if it doesn't exist
async function initializeContentFile() {
    try {
        await fs.access(DATA_FILE);
        console.log('Content file exists');
    } catch (error) {
        // File doesn't exist, create it with default content
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
            }
        };
        
        await fs.writeFile(DATA_FILE, JSON.stringify(defaultContent, null, 2));
        console.log('Created content file with default data');
    }
}

// GET /api/content - Retrieve site content
app.get('/api/content', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const content = JSON.parse(data);
        res.json(content);
        console.log('Content retrieved successfully');
    } catch (error) {
        console.error('Error reading content:', error);
        res.status(500).json({ error: 'Failed to retrieve content', message: error.message });
    }
});

// POST /api/content - Save site content
app.post('/api/content', async (req, res) => {
    try {
        const content = req.body;
        
        // Validate that content is not empty
        if (!content || Object.keys(content).length === 0) {
            return res.status(400).json({ error: 'Content cannot be empty' });
        }
        
        // Write content to file
        await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2));
        res.json({ success: true, message: 'Content saved successfully' });
        console.log('Content saved successfully');
    } catch (error) {
        console.error('Error saving content:', error);
        res.status(500).json({ error: 'Failed to save content', message: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Weaver Interiors API',
        version: '1.0.0',
        endpoints: {
            health: 'GET /api/health',
            content: 'GET /api/content',
            saveContent: 'POST /api/content'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Initialize and start server
async function startServer() {
    try {
        await ensureDataDirectory();
        await initializeContentFile();
        
        app.listen(PORT, () => {
            console.log(`🚀 Weaver Interiors API server running on port ${PORT}`);
            console.log(`📁 Data file: ${DATA_FILE}`);
            console.log(`🌐 CORS enabled for all origins (development mode)`);
            console.log(`\nAPI Endpoints:`);
            console.log(`  GET  http://localhost:${PORT}/api/health`);
            console.log(`  GET  http://localhost:${PORT}/api/content`);
            console.log(`  POST http://localhost:${PORT}/api/content`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
