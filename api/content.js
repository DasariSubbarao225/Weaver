// Serverless function for content management
// GET /api/content - Retrieve site content
// POST /api/content - Save site content

const fs = require('fs').promises;
const path = require('path');

// Vercel uses /tmp for temporary storage
// Note: This storage is ephemeral and resets on cold starts
// For production, consider using a database or external storage
const DATA_FILE = path.join('/tmp', 'content.json');

// Default content structure
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

// Initialize content file if it doesn't exist
async function ensureContentFile() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        await fs.writeFile(DATA_FILE, JSON.stringify(defaultContent, null, 2));
    }
}

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        await ensureContentFile();

        if (req.method === 'GET') {
            // Retrieve content
            const data = await fs.readFile(DATA_FILE, 'utf8');
            const content = JSON.parse(data);
            res.status(200).json(content);
            return;
        }

        if (req.method === 'POST') {
            // Save content
            const content = req.body;

            // Validate that content is not empty
            if (!content || Object.keys(content).length === 0) {
                res.status(400).json({ error: 'Content cannot be empty' });
                return;
            }

            // Validate required top-level fields
            const requiredFields = ['site', 'hero', 'about', 'services', 'portfolio', 'contact', 'media'];
            const missingFields = requiredFields.filter(field => !content.hasOwnProperty(field));

            if (missingFields.length > 0) {
                res.status(400).json({ 
                    error: 'Invalid content structure', 
                    message: `Missing required fields: ${missingFields.join(', ')}` 
                });
                return;
            }

            // Validate data types for critical fields
            if (content.site === null || typeof content.site !== 'object' || 
                content.hero === null || typeof content.hero !== 'object' || 
                content.about === null || typeof content.about !== 'object' ||
                content.services === null || typeof content.services !== 'object' || 
                content.portfolio === null || typeof content.portfolio !== 'object' || 
                content.contact === null || typeof content.contact !== 'object' ||
                content.media === null || typeof content.media !== 'object') {
                res.status(400).json({ 
                    error: 'Invalid content structure', 
                    message: 'Required fields must be objects and cannot be null' 
                });
                return;
            }

            // Validate content size
            const contentJson = JSON.stringify(content, null, 2);
            const contentSizeInMB = Buffer.byteLength(contentJson, 'utf8') / (1024 * 1024);

            if (contentSizeInMB > 10) {
                res.status(413).json({ 
                    error: 'Content too large', 
                    message: `Content size (${contentSizeInMB.toFixed(2)}MB) exceeds maximum allowed size of 10MB` 
                });
                return;
            }

            // Write content to file
            await fs.writeFile(DATA_FILE, contentJson);
            res.status(200).json({ success: true, message: 'Content saved successfully' });
            return;
        }

        // Method not allowed
        res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
