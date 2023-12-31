import axios from "axios";
import { User } from "../types/user";

export const getUserMe = async (): Promise<User> => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            const api = axios.create({
                headers: {'Authorization': `Token ${token}`}
            });
            const response = await api.get('http://127.0.0.1:8000/userme/');

            return response.data;
        }
        throw new Error('No token found');
    } catch (error: any) {
        throw new Error(error.response.data.detail);
    }
};

