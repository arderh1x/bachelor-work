import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn('Session ended - need authorization.');
        // window.location.href = '/login'; 
      }

      if (status === 403) {
        console.error('Access denied.');
      }
    }

    return Promise.reject(error);
  }
);

export default api;