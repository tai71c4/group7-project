// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export default api;
