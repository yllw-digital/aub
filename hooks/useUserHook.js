import React, {useState, useEffect, useContext} from 'react';
import Cookies from 'js-cookie'

/**
 * Returns the user that was saved in the cookies on login and register
 * @returns an object with the user's details
 */
const useUserHook = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const retrieveUser = async () => {
            let userStr =  await Cookies.get('user');
            if(userStr){
                setUser(JSON.parse(userStr));
            }
        }

        retrieveUser()
    }, [])

    return user;
}

export default useUserHook;