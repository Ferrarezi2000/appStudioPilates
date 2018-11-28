import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.98.5.87:8010/'
});

export default api;
