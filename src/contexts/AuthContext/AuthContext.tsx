import React from 'react';
import { User } from "../../types/user";
import { useQueryClient } from "react-query";
import axios from "axios";
import {getUserMe, useMe} from "../../clients/userClient";


export type ContextProps = {
    user: User | undefined
    logout: () => void;
    login: (email: string, password: string) => any;
    isLoggedIn: boolean;
};

export const defaultContext: ContextProps = {
    user: undefined,
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
};

const baseUrl = process.env.REACT_APP_CVT_API_URL;

export const AuthContext = React.createContext(defaultContext);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const user = useMe();

    const login = React.useCallback(async (email: string, password: string) => {
        try {
            const response = await axios.post(`${baseUrl}/api/login`, { email, password });
            if (response.data) {
                localStorage.setItem('access_token', response.data.token);
            }
            return Promise.resolve({
                success: !!response,
                data: response.data,
            });
        } catch (error: any) {
            return Promise.reject({
                error: error.code,
                message: error.message,
            });
        }
    }, []);

    const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('access_token'));

    React.useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('access_token'));
    }, [user]);

    const logout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                logout,
                login,
                isLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const AuthConsumer = AuthContext.Consumer;