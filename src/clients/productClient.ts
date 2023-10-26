import axios from "axios";
import { Product, ProductQueryResponse } from "../types/product";



export const getProducts = async (): Promise<ProductQueryResponse> => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            const api = axios.create({
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

export const deleteProduct = async (productId: number): Promise<void> => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            const api = axios.create({
                headers: {'Authorization': `Token ${token}`}
            });
            await api.delete(`http://127.0.0.1:8000/ecommerce/products/${productId}/`);
        } else {
            throw new Error('No token found');
        }
    } catch (error: any) {
        throw new Error(error.response.data.detail);
    }
};
export const createProduct = async (newProduct: Product): Promise<void> => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            const api = axios.create({
                headers: {'Authorization': `Token ${token}`}
            });
            await api.post('http://127.0.0.1:8000/ecommerce/products/', newProduct);
        } else {
            throw new Error('No token found');
        }
    } catch (error: any) {
        throw new Error(error.response.data.detail);
    }
};

export const updateProduct = async (productId: number, updatedProduct: Product): Promise<void> => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            const api = axios.create({
                headers: {'Authorization': `Token ${token}`}
            });
            await api.put(`http://127.0.0.1:8000/ecommerce/products/${productId}/`, updatedProduct);
        } else {
            throw new Error('No token found');
        }
    } catch (error: any) {
        throw new Error(error.response.data.detail);
    }
};

export const getProduct = async (productId: string): Promise<Product> => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            const api = axios.create({
                headers: {'Authorization': `Token ${token}`}
            });
            const response = await api.get(`http://127.0.0.1:8000/ecommerce/products/${productId}`);

            return response.data;
        }
        throw new Error('No token found');
    } catch (error: any) {
        throw new Error(error.response.data.detail);
    }
};


