import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

import api from '../services/config';
import { login, getUser } from '../services/auth/auth';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUserFromCookies = async () => {
            const token = await Cookies.get('token')
            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`
                setIsAuthenticated(true)
                try {
                    const res = await getUser();
                    if (res?.data?.user) setUser(res.data.user);
                } catch (e) { }

            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const loginUser = async (email, password) => {
        const res = await login(email, password)
        console.log(res)
        if (res?.data?.token) {
            return {status: authenticate(res)};
        } else if (res?.data?.status === 'pending_verification') {
            return {status: false, type: 'verification'}
        } else {
            return {status: false, type: 'incorrect'};
        }
    }

    const authenticate = (res) => {
        const token = res.data.token;
        const user = res.data.user
        Cookies.set('token', token, { expires: 60 })
        api.defaults.headers.Authorization = `Bearer ${token}`
        setIsAuthenticated(true);
        if (user) {
            setUser(user);
        }
        return true;
    }

    const logout = (email, password) => {
        Cookies.remove('token')
        setIsAuthenticated(false)
        delete api.defaults.headers.Authorization
        return true
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loginUser, loading, logout, authenticate }}>
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