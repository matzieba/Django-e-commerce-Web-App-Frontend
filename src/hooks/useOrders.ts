import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getProducts } from '../clients/productClient'
import { ProductQueryResponse} from "../types/product";
import { createOrder } from "../clients/orderClient";

export const useOrderCrud = () => {

    const queryClient = useQueryClient();

    const { data } = useQuery<ProductQueryResponse>('products', getProducts);

    const createOrderMutation = useMutation(createOrder,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('orders');
            },
        });

    return {
        products: data ? data.results : [],
        createOrder: createOrderMutation.mutate,

    };
};