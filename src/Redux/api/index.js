import axios from 'axios';
import { getCookie } from '../helpers/auth';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
  const token = getCookie('token');

  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
