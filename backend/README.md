# Weaver Interiors Backend API

Backend server for Weaver Interiors website content management.

## Features

- RESTful API for content management
- CORS enabled for local development
- JSON file-based storage
- Automatic initialization with default content
- Error handling and logging

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

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

### Development Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

### Custom Port

```bash
PORT=8080 npm start
```

## API Endpoints

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET /api/content
Retrieve all site content

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
  "settings": { ... }
}
```

### POST /api/content
Save site content

**Request Body:**
```json
{
  "site": { ... },
  "hero": { ... },
  ...
}
```

**Response:**
```json
{
  "success": true,
  "message": "Content saved successfully"
}
```

## Data Storage

Content is stored in `backend/data/content.json`. This file is automatically created with default content on first run.

## CORS Configuration

The server is configured with CORS enabled for all origins to support local development. For production deployment, you should configure CORS to only allow your specific domain.

## Error Handling

All endpoints include comprehensive error handling and return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request
- 500: Internal Server Error

## Future Enhancements

The backend is structured to support future features:
- File upload handling for images and videos
- Authentication and authorization
- Database integration
- Caching layer
- Rate limiting
