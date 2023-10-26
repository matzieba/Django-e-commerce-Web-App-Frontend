import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createOrder } from "../clients/orderClient";

export const useOrderCrud = () => {

    const queryClient = useQueryClient();

    const createOrderMutation = useMutation(createOrder,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('orders');
            },
        });

    return {
        createOrder: createOrderMutation.mutate,

    };
};