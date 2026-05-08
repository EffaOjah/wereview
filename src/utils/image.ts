import { getApiUrl } from './api';

/**
 * Returns the full URL for a gadget image.
 * Handles:
 * 1. Absolute URLs (starts with http)
 * 2. Backend uploads (starts with /uploads)
 * 3. Local public assets (starts with /img)
 */
export const getImageUrl = (path: string | undefined): string => {
  if (!path) return '/img/placeholder.png';
  
  if (path.startsWith('http')) {
    return path;
  }
  
  if (path.startsWith('/uploads')) {
    // If it starts with /uploads, it's a backend file
    const apiBase = getApiUrl('').replace('/api', '');
    // Remove trailing slash from apiBase and leading slash from path to avoid //
    const cleanBase = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;
    return `${cleanBase}${path}`;
  }
  
  // Default: assume it's a local public asset or already correct
  return path;
};
