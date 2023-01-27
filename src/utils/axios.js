import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3001/api'
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://localhost:3002/api'
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
})

export default instance;