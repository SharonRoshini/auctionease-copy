import axios from 'axios';

// Base Axios instance configuration
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enables sending cookies and credentials with requests
});

// Export Axios instance
export default api;
