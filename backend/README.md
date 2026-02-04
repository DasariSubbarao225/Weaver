# Weaver Interiors Backend Server

Backend REST API server for the Weaver Interiors admin panel content management system.

## Features

- **REST API Endpoints** for content management
- **File-based Storage** using JSON
- **CORS Enabled** for development
- **Static File Serving** for media uploads

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

```bash
cd backend
npm install
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### GET /api/content
Retrieves all site content and configuration from the backend storage.

**Response:**
```json
{
  "site": { ... },
  "hero": { ... },
  "about": { ... },
  "services": { ... },
  "portfolio": { ... },
  "contact": { ... },
  "media": { ... },
  "settings": { ... },
  "admin": { ... }
}
```

### POST /api/content
Saves updated content and configuration to the backend storage.

**Request Body:**
```json
{
  "site": { ... },
  "hero": { ... },
  // ... other configuration sections
}
```

**Response:**
```json
{
  "success": true,
  "message": "Content saved successfully"
}
```

### GET /health
Health check endpoint to verify server status.

**Response:**
```json
{
  "status": "ok",
  "message": "Weaver Backend Server is running"
}
```

## Directory Structure

```
backend/
├── server.js           # Main Express server
├── package.json        # Node.js dependencies
├── data/
│   └── content.json   # Content storage (JSON format)
├── uploads/           # Static files directory for future media uploads
└── README.md          # This file
```

## Data Storage

All content and configuration is stored in `data/content.json`. This file contains:

- **site**: Site name, tagline, and description
- **hero**: Hero section content
- **about**: About section with paragraphs and features
- **services**: List of services with titles and descriptions
- **portfolio**: Portfolio items with images, videos, and gradients
- **contact**: Contact information and business hours
- **media**: Media library (images and videos)
- **settings**: Theme settings (colors)
- **admin**: Admin credentials (username and password hash)

## Content Structure Example

```json
{
  "site": {
    "name": "Weaver Interiors",
    "tagline": "Transforming spaces, enriching lives.",
    "description": "Interior design services description"
  },
  "services": {
    "title": "Our Services",
    "items": [
      {
        "id": 1,
        "title": "Service Name",
        "description": "Service description"
      }
    ]
  },
  "settings": {
    "primaryColor": "#667eea",
    "secondaryColor": "#764ba2"
  }
}
```

## CORS Configuration

CORS is enabled for all origins in development mode. For production, update the CORS configuration in `server.js` to restrict origins:

```javascript
app.use(cors({
  origin: 'https://your-domain.com'
}));
```

## Environment Variables

- `PORT`: Server port (default: 3000)

Example:
```bash
PORT=8080 npm start
```

## Future Enhancements

The `uploads/` directory is prepared for future media file upload functionality. Currently, the system stores media URLs only.

## Security Notes

⚠️ **IMPORTANT SECURITY WARNINGS**

- **Admin password is stored as MD5 hash** - This is for DEMO/DEVELOPMENT purposes ONLY
- **NEVER use MD5 in production** - MD5 is cryptographically broken and should never be used for password hashing
- For production deployments:
  - Implement proper authentication using bcrypt, argon2, or scrypt for password hashing
  - Use JWT tokens or OAuth for session management
  - Add rate limiting and request validation middleware
  - Implement proper user roles and permissions
  - Use HTTPS/TLS for all communications
  - Update CORS settings to restrict allowed origins
  - Add input validation and sanitization
  - Implement CSRF protection for state-changing operations

This demo authentication is intentionally simple for learning purposes but would be trivial to bypass in a real-world scenario.

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change it:
```bash
PORT=3001 npm start
```

### Permission Errors
Ensure the backend has write permissions for the `data/` directory:
```bash
chmod -R 755 data/
```

## License

MIT
