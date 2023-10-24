import { useCallback, useContext } from 'react';


import { AuthContext } from '../contexts/AuthContext/AuthContext'



export const useLogIn = () => {

    const { login } = useContext(AuthContext);

    const logIn = useCallback(async (username: string, password: string) => {
        try {
            const result = await login(username, password);
            return result;
        } catch (e) {
            return Promise.reject(e);
        }
    }, [login]);

    return {
        logIn,
    };
};
