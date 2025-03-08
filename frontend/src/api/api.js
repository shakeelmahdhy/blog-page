// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blog-page-mdy9.onrender.com',
});

export default api;
