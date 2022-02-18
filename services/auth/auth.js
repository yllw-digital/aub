
import axios from 'axios';
import { URL } from '../url'
import api from '../config';

export const register = (firstname, lastname, mobile = null , email, password, password_confirmation) => {
    return axios.post(URL + '/api/register' ,{ firstname, lastname, email, mobile, password, password_confirmation });
}             

export const login = (email, password) => {
    return axios.post(URL + '/api/login' ,{ email, password });
}             

export const getUser = () => {
    return api.get(URL + '/api/user');
}

export const resetPassword = (email) => {
    return api.post(URL + '/api/reset-password', {email});
}

export const verifyEmail = () => {
    return axios.get(URL + '/undefined');
}                    

export const changePassword = (password, password_confirmation, token) => {
    return axios.post(URL + '/api/forgot-password', {password, password_confirmation, token});
}             
