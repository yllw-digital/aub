import axios from 'axios';
import Cookies from 'js-cookie'


const api = axios.create({
    headers: {
        'Accpet': 'application/json',
        'Content-type': 'application/json',
    }
})


    // Add a request interceptor
api.interceptors.request.use( async function(config) {
    // Do something before request is sent
        const token = await Cookies.get('token')

    if (token)
        config.headers.Authorization = `Bearer ${token}`
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});



export default api;