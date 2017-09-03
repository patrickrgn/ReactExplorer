const axiosInstance = axios.create({
  baseURL: 'http://localhost/explorerreact/',
  timeout: 2000,
  headers: { 'X-Custom-Header': 'foobar' }
});
 