// API Configuration
// This file manages the API base URL configuration for different environments

/**
 * Get the API base URL based on the current environment
 * 
 * Priority order:
 * 1. Window config (set via config override in index.html)
 * 2. Environment detection
 * 3. Default to localhost for local development
 */
function getApiBaseUrl() {
    // Check for explicit configuration override
    if (window.WEAVER_CONFIG && window.WEAVER_CONFIG.API_BASE_URL) {
        return window.WEAVER_CONFIG.API_BASE_URL;
    }
    
    // Detect if running on GitHub Pages or production domain
    const hostname = window.location.hostname;
    
    // Vercel deployment - API is on same domain
    if (hostname.includes('vercel.app')) {
        return window.location.origin;
    }
    
    // GitHub Pages detection - can use either Vercel API or Render fallback
    if (hostname.includes('github.io')) {
        // Use Vercel deployment for API (update this URL after Vercel deployment)
        return 'https://weaver-interiors.vercel.app';
    }
    
    // Custom domain detection (add your production domain here)
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.startsWith('192.168.')) {
        // Production environment - use same origin for Vercel or custom domain
        return window.location.origin;
    }
    
    // Local development - use localhost
    return 'http://localhost:3000';
}

// Export the API base URL
const API_BASE_URL = getApiBaseUrl();

// Log configuration for debugging (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Weaver API Configuration:', {
        hostname: window.location.hostname,
        apiBaseUrl: API_BASE_URL
    });
}
