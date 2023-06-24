import axios from 'axios';

export const API_URL = 'http://localhost:5001';
export const API_AUTH_URL = 'https://atsybulskiy.com/api';
// export const API_AUTH_URL = 'https://node-server-i0x2.onrender.com/api';
// export const API_AUTH_URL = 'http://localhost:5000/api';

const $api = axios.create({
  baseURL: API_URL
});

export default $api;
