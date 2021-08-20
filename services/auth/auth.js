
import axios from 'axios';
import { URL } from '../url'

export const register = (name, email, password, password_confirmation) => {
    return axios.post(URL + '/api/register' ,{ name, email, password, password_confirmation });
}             

export const login = (email, password) => {
    return axios.post(URL + '/api/login' ,{ email, password });
}             

export const verifyEmail = () => {
    return axios.get(URL + '/undefined');
}             

export const resetPassword = () => {
    return axios.get(URL + '/undefined');
}             

export const changePassword = () => {
    return axios.get(URL + '/undefined');
}             
