import axios from "axios";
import {ProductQueryResponse} from "../types/product";



export const getProducts = async (): Promise<ProductQueryResponse> => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            const api = axios.create({
                baseURL: ``,
                headers: {'Authorization': `Token ${token}`}
            });
            const response = await api.get('http://127.0.0.1:8000/ecommerce/products/');

            return response.data;
        }
        throw new Error('No token found');
    } catch (error: any) {
        throw new Error(error.response.data.detail);
    }
};

