# Weaver Backend Server

This is the backend server for the Weaver Interiors website admin panel. It provides REST API endpoints for content management and file uploads.

## Features

- **Content Management API**: Save and retrieve site configuration via REST API
- **File Upload**: Upload images and videos with automatic file storage
- **Static File Serving**: Serve uploaded media files
- **CORS Support**: Configured for local development
- **File-based Storage**: Simple JSON file storage for easy deployment

## Installation

```bash
cd backend
npm install
```

## Running the Server

```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### GET /api/content
Retrieves the current site configuration.

**Response Example:**
```json
{
  "site": {
    "name": "Weaver Interiors",
    "tagline": "Transforming spaces, enriching lives.",
    "description": "..."
  },
  "hero": { ... },
  "about": { ... },
  "services": { ... },
  "portfolio": { ... },
  "contact": { ... },
  "media": {
    "images": [],
    "videos": []
  }
}
```

### POST /api/content
Saves the site configuration.

**Request Body:** Complete configuration object (JSON)

**Response:**
```json
{
  "success": true,
  "message": "Content saved successfully"
}
```

### POST /api/upload
Uploads an image or video file.

**Request:** `multipart/form-data` with `file` field

**Supported File Types:**
- Images: JPEG, PNG, GIF, WebP
- Videos: MP4, WebM, OGG

**File Size Limit:** 10MB

**Response:**
```json
{
  "success": true,
  "url": "/uploads/filename-1234567890.jpg",
  "filename": "filename-1234567890.jpg",
  "originalName": "original.jpg",
  "mimetype": "image/jpeg",
  "size": 12345
}
```

### GET /uploads/:filename
Serves uploaded media files statically.

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-04T18:15:00.000Z"
}
```

## File Structure

```
backend/
├── server.js           # Express server with all API routes
├── package.json        # Dependencies and scripts
├── data/
│   └── content.json   # Site configuration storage
└── uploads/           # Uploaded media files (gitignored)
```

## Environment Variables

- `PORT`: Server port (default: 3000)

Example:
```bash
PORT=4000 npm start
```

## Development

The server uses:
- **Express.js** for the web server
- **Multer** for file upload handling
- **CORS** for cross-origin requests

## Security Notes

⚠️ **Current Implementation:**
- No authentication on API endpoints
- Simple file-based storage
- Suitable for local development or trusted environments

🔐 **Recommended for Production:**
- Add JWT-based authentication for all API endpoints
- Implement rate limiting to prevent abuse
- Add input validation and sanitization
- Use a proper database (MongoDB, PostgreSQL)
- Integrate cloud storage (AWS S3, Google Cloud Storage)
- Add HTTPS support
- Implement request logging and monitoring

## Testing

You can test the API endpoints using curl:

```bash
# Health check
curl http://localhost:3000/api/health

# Get content
curl http://localhost:3000/api/content

# Upload a file
curl -X POST -F "file=@image.jpg" http://localhost:3000/api/upload

# Save content
curl -X POST -H "Content-Type: application/json" \
  -d @content.json \
  http://localhost:3000/api/content
```

## Troubleshooting

**Port already in use:**
```bash
# Change the port
PORT=4000 npm start
```

**CORS errors:**
- The server is configured to allow all origins in development
- In production, configure CORS to only allow your domain

**File upload fails:**
- Check file size (max 10MB)
- Verify file type is supported
- Ensure `backend/uploads/` directory exists

## License

MIT
