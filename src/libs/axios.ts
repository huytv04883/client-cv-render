import axios from 'axios';
import { ENV } from '@/config/env';

const instance = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: ENV.TIMEOUT,
});

// Request interceptor
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
