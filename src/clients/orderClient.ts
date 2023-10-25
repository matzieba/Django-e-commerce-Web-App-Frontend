import { Order } from "../types/order";
import axios from "axios";

export const createOrder = async (newOrder: Order): Promise<void> => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            const api = axios.create({
                headers: {'Authorization': `Token ${token}`}
            });
            await api.post('http://127.0.0.1:8000/ecommerce/orders/', newOrder);
        } else {
            throw new Error('No token found');
        }
    } catch (error: any) {
        throw new Error(error.response.data.detail);
    }
};