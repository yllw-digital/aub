
import axios from 'axios';
import { URL } from '../url'

export const register = (firstname, lastname, mobile = null , email, password, password_confirmation) => {
    return axios.post(URL + '/api/register' ,{ firstname, lastname, email, mobile, password, password_confirmation });
}             

export const login = (email, password) => {
    return axios.post(URL + '/api/login' ,{ email, password });
}             

export const getUser = () => {
    return axios.get(URL + '/api/user');
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
