// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or from Redux
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
