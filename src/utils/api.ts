const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (endpoint: string): string => {
  // If endpoint already starts with http, return as is
  if (endpoint.startsWith('http')) return endpoint;
  
  // Ensure endpoint starts with /
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  return `${API_BASE_URL}${path}`;
};
