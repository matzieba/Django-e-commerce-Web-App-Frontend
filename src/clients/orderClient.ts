import {Order, OrderStatsParams} from "../types/order";
import axios from "axios";
import { format } from 'date-fns';

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


export const getOrdersStats = async (params: OrderStatsParams) => {
    try {
        const token = localStorage.getItem('access_token');
        const formattedParams = {
            ...params,
            date_from: params.date_from && format(params.date_from, 'yyyy-MM-dd'),
            date_to: params.date_to && format(params.date_to, 'yyyy-MM-dd'),
        };
        if (token) {
            const api = axios.create({
                headers: {'Authorization': `Token ${token}`}
            });
            const response = await api.get('http://127.0.0.1:8000/ecommerce/order-stats/', { params: formattedParams });
            return response.data;
        } else {
            throw new Error('No token found');
        }
    } catch (error: any) {
        throw new Error(error.response.data.detail);
    }
};