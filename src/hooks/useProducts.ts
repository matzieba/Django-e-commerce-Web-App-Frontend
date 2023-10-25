import { useMutation, useQuery, useQueryClient } from 'react-query';
import {deleteProduct, getProducts, createProduct, updateProduct } from '../clients/productClient'
import {Product, ProductQueryResponse} from "../types/product";

export const useProductCrud = () => {

    const queryClient = useQueryClient();

    const { data } = useQuery<ProductQueryResponse>('products', getProducts);

    const createProductMutation = useMutation(createProduct,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('products');
            },
        });

    const updateProductMutation = useMutation(({productId, updatedProduct}: {productId: number, updatedProduct: Product}) => updateProduct(productId, updatedProduct),{
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        }
    });

    const deleteProductMutation = useMutation(deleteProduct,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('products');
            },
        });


    return {
        products: data ? data.results : [],
        createProduct: createProductMutation.mutate,
        updateProduct: updateProductMutation.mutate,
        deleteProduct: deleteProductMutation.mutate,
    };
};