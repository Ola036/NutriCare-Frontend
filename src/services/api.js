import axios from 'axios';
import { toast } from 'react-toastify';

const api = ({ method, url, body, onSuccess, onError, onEnd }) => {

    // Retrieve the token from localStorage 
    const token = localStorage.getItem('token');

    // Configure the headers 
    const headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Make the request
    axios({
        method,
        url,
        data: body,
        headers: headers
    })
        .then((response) => {
            if (onSuccess) onSuccess(response.data, toast);
        })
        .catch((error) => {
            const message = error.response?.data?.message || 'An error occurred';
            toast.error(message);

            if (error.response?.status === 422) {
                const errors = error.response?.data?.errors || {};
                if (onError) onError(errors);
            } else if (error.response?.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        })
        .finally(() => {
            if (onEnd) onEnd();
        });
};

export default api;
