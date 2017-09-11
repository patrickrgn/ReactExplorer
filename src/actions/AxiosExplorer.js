import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost/reactexplorer/api',
  timeout: 2000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});