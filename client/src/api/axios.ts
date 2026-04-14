import axios from 'axios';

const api = axios.create({
  // Завдяки Vite Proxy, ми пишемо просто /api
  baseURL: '/api', 
  // Це критично для твого ТЗ (робота з cookies/JWT)
  withCredentials: true, 
});

export default api;