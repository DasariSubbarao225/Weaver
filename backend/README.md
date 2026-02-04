# Weaver Backend Server

This is the backend server for the Weaver Interiors website. It provides REST API endpoints for managing site content and media uploads.

## Features

- File-based storage using JSON
- REST API for content management
- Image and video upload support with file type validation
- CORS enabled for development (configurable for production)
- Static file serving for uploaded media
- Basic authentication middleware (simplified for demo)

## Security Notes

**⚠️ Important for Production:**

This is a demo implementation with simplified security. For production deployments:

1. **Authentication**: Implement proper JWT-based authentication or OAuth2
2. **Password Hashing**: Use bcrypt instead of MD5 for password hashing
3. **CORS**: Set `ALLOWED_ORIGINS` environment variable to restrict origins
4. **File Validation**: Consider adding virus scanning for uploaded files
5. **Rate Limiting**: Add rate limiting middleware to prevent abuse
6. **HTTPS**: Always use HTTPS in production
7. **Input Validation**: Add more comprehensive input validation

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

For production with custom CORS origins:
```bash
NODE_ENV=production ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com npm start
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
