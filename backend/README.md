# Weaver Backend Server

This is the backend server for the Weaver Interiors website. It provides REST API endpoints for managing site content and media uploads.

## Features

- File-based storage using JSON
- REST API for content management
- Image and video upload support
- CORS enabled for development
- Static file serving for uploaded media

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

Start the server:
```bash
npm start
```

The server will run on port 3000 by default. You can change this by setting the PORT environment variable:
```bash
PORT=8080 npm start
```

## API Endpoints

### Content Management

- `GET /api/content` - Get all site content
- `POST /api/content` - Update site content (send full content object as JSON)

### Media Uploads

- `POST /api/upload/image` - Upload an image file (multipart/form-data with field name 'image')
- `POST /api/upload/video` - Upload a video file (multipart/form-data with field name 'video')
- `GET /api/uploads` - List all uploaded files

### Utility

- `GET /api/health` - Health check endpoint
- `GET /uploads/:filename` - Serve uploaded files

## Data Storage

- **Content**: Stored in `backend/data/content.json`
- **Uploads**: Stored in `backend/uploads/`

## Configuration

The server automatically initializes with default content if `content.json` doesn't exist.

Default admin credentials:
- Username: `admin`
- Password: `password`

Change these after first login in the admin panel settings.
