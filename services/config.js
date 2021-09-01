import axios from 'axios';

const api = axios.create({
    headers: {
        'Accpet' : 'application/json',
        'Content-type' : 'application/json',
    }
})

export default api;