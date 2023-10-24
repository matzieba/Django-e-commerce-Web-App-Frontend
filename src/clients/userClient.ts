import axios from "axios";
import { User } from "../types/user";
import {useQuery} from "react-query";

const baseUrl = process.env.REACT_APP_CVT_API_URL;

export const getUserMe = async (): Promise<User> => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            const api = axios.create({
                baseURL: `${baseUrl}`,
                headers: {'Authorization': `Token ${token}`}
            });
            const response = await api.get('userme');

            return response.data;
        }
        throw new Error('No token found');
    } catch (error: any) {
        throw new Error(error.response.data.detail);
    }
};

export const useMe = () => {
    getUserMe()
    const { data: user } = useQuery<User>('userMe', getUserMe, {
    });
    return user

};