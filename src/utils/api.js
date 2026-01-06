// Utility to get API URL - works on both desktop and mobile
export const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  // If accessing from phone, use computer's IP
  const hostname = window.location.hostname
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    // On mobile/network, use same hostname with port 8000
    return `http://${hostname}:8000`
  }
  return 'http://localhost:8000'
}

export const API_BASE_URL = getApiUrl()

