// src/api.js
import axios from "axios";

// Cambia la URL al endpoint de tu backend
const api = axios.create({
  baseURL: "http://localhost:3000"  // Por ejemplo, tu NestJS corre en 3001
});

export default api;