const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext);
        cb(null, nameWithoutExt + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept images and videos
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'video/mp4',
            'video/webm',
            'video/ogg'
        ];
        
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images and videos are allowed.'));
        }
    }
});

// Paths
const CONTENT_FILE = path.join(__dirname, 'data', 'content.json');

// Helper function to read content
async function readContent() {
    try {
        const data = await fs.readFile(CONTENT_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading content file:', error);
        // Return default config if file doesn't exist
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
                paragraphs: [],
                features: []
            },
            services: {
                title: "Our Services",
                items: []
            },
            portfolio: {
                title: "Our Portfolio",
                items: []
            },
            contact: {
                title: "Get In Touch",
                phone: "",
                email: "",
                address: "",
                businessHours: {
                    title: "Business Hours",
                    hours: []
                }
            },
            media: {
                images: [],
                videos: []
            }
        };
    }
}

// Helper function to write content
async function writeContent(content) {
    try {
        await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing content file:', error);
        throw error;
    }
}

// API Routes

// GET /api/content - Fetch current site content
app.get('/api/content', async (req, res) => {
    try {
        const content = await readContent();
        res.json(content);
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({ error: 'Failed to fetch content' });
    }
});

// POST /api/content - Save site content
app.post('/api/content', async (req, res) => {
    try {
        const content = req.body;
        
        // Validate that we have content
        if (!content || typeof content !== 'object') {
            return res.status(400).json({ error: 'Invalid content format' });
        }
        
        await writeContent(content);
        res.json({ success: true, message: 'Content saved successfully' });
    } catch (error) {
        console.error('Error saving content:', error);
        res.status(500).json({ error: 'Failed to save content' });
    }
});

// POST /api/upload - Upload image or video file
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // Return the URL path to access the uploaded file
        const fileUrl = `/uploads/${req.file.filename}`;
        
        res.json({
            success: true,
            url: fileUrl,
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
        }
        return res.status(400).json({ error: err.message });
    }
    
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Weaver Backend Server running on http://localhost:${PORT}`);
    console.log(`📁 Content file: ${CONTENT_FILE}`);
    console.log(`📤 Uploads directory: ${path.join(__dirname, 'uploads')}`);
    console.log(`🌐 API endpoints:`);
    console.log(`   - GET  /api/content`);
    console.log(`   - POST /api/content`);
    console.log(`   - POST /api/upload`);
    console.log(`   - GET  /api/health`);
});
