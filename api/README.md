# Serverless API Functions

This directory contains Vercel serverless functions that provide the backend API for Weaver Interiors.

## Files

- **health.js** - Health check endpoint (`/api/health`)
- **content.js** - Content management endpoint (`/api/content`)

## How It Works

When deployed to Vercel, each `.js` file in this directory automatically becomes an API endpoint:

- `api/health.js` → `https://your-site.vercel.app/api/health`
- `api/content.js` → `https://your-site.vercel.app/api/content`

## Endpoints

### GET /api/health
Returns server health status.

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-02-05T01:30:00.000Z"
}
```

### GET /api/content
Retrieves all site content (site info, hero, about, services, portfolio, contact).

**Response**:
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
Saves site content.

**Request Body**:
```json
{
  "site": { ... },
  "hero": { ... },
  // ... other content fields
}
```

**Response**:
```json
{
  "success": true,
  "message": "Content saved successfully"
}
```

## Storage

⚠️ **Important**: These serverless functions use `/tmp` storage which is **ephemeral**.

**What this means**:
- Content persists only during the function's lifetime
- After periods of inactivity (cold starts), data resets to defaults
- Not suitable for production use without external storage

**Solutions for Production**:
1. **Vercel KV** (Redis-like storage) - Recommended
2. **Vercel Postgres** - Full database
3. **MongoDB Atlas** - NoSQL database (free tier available)
4. **Firebase Firestore** - Real-time database
5. **GitHub API** - Use repository as storage

## Local Testing

### Using Vercel CLI:
```bash
npm install -g vercel
vercel dev
```

Then access:
- `http://localhost:3000/api/health`
- `http://localhost:3000/api/content`

### Using Traditional Backend:
Alternatively, use the Express server in `/backend` directory:
```bash
cd backend
npm install
npm start
```

## CORS

All endpoints include CORS headers to allow requests from any origin:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`

## Validation

The content endpoint includes:
- Required field validation
- Data type validation
- Size limits (10MB max)
- Null checks

## Adding New Endpoints

To add a new endpoint:

1. Create a new `.js` file in this directory (e.g., `users.js`)
2. Export a function that handles the request:
   ```javascript
   module.exports = async (req, res) => {
     res.json({ message: 'Hello from users endpoint' });
   };
   ```
3. Deploy - the endpoint will be available at `/api/users`

## Environment Variables

Set in Vercel dashboard under Project Settings → Environment Variables:
- `NODE_ENV` - Set to `production`
- Add any API keys or secrets needed

## Performance

Vercel serverless functions:
- **Cold start**: ~200-500ms (first request after inactivity)
- **Warm request**: ~50-100ms
- **Memory**: 1024 MB (configurable in vercel.json)
- **Timeout**: 10 seconds (configurable in vercel.json)

## Deployment

Functions are automatically deployed when you:
1. Push to GitHub (if connected to Vercel)
2. Run `vercel --prod` from CLI
3. Deploy via Vercel dashboard

No build step required - functions deploy as-is.
