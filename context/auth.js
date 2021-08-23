import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

import api from '../services/config';
import { login } from '../services/auth/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromCookies = async () => {
            const token = await Cookies.get('token')
            if (token) {
                // console.log("Got a token in the cookies, let's see if it is valid")
                api.defaults.headers.Authorization = `Bearer ${token}`
                setIsAuthenticated(true)
                // const { data: user } = await api.get('users/me')
                // if (user) setUser(user);

                // setUser(true)
            }
            setLoading(false)
        }
        loadUserFromCookies()
    })

    const loginUser = async (email, password) => {
        const res = await login(email, password)

        if (res?.data?.token) {
            // Cookies.set('token', res.data.token, { expires: 60 })
            // api.defaults.headers.Authorization = `Bearer ${res.data.token}`
            // setIsAuthenticated(true)
            // setUser(res.data.user)
            // return true;
            return authenticate(res.data.token);
        } else {
            return false;
        }
    }

    const authenticate = (token) => {
        Cookies.set('token', token, { expires: 60 })
        api.defaults.headers.Authorization = `Bearer ${token}`
        setIsAuthenticated(true);
        return true;
    }

    const logout = (email, password) => {
        Cookies.remove('token')
        setIsAuthenticated(false)
        delete api.defaults.headers.Authorization
        return true
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginUser, loading, logout, authenticate }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    console.log('isAuth', isAuthenticated)
    // if (isLoading || (!isAuthenticated && window.location.pathname !== '/login')){
    // //   return <LoadingScreen />; 
    // }
    return children;
};