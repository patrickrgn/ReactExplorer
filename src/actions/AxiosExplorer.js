import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/reactexplorer',
  timeout: 2000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
 