import { useQuery } from "react-query";


import { getProducts } from "../clients/productClient";
import { ProductQueryResponse } from "../types/product";


export const useProducts = () => {
    const { data } = useQuery<ProductQueryResponse>('products', getProducts, {});

    return data ? data.results : [];
};