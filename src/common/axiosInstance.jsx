import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Base URL of your backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor for global error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                console.error("Unauthorized access. Logging out...");
                // localStorage.removeItem("authToken");
                // window.location.href = "/auth/signin";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
