import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Change this to your backend URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
