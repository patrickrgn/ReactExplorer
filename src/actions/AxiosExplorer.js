import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://patrick-raguin.fr/reactexplorer/api',
  timeout: 2000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
 