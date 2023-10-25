import  { ProductInCart } from "./product";

export type Order = {
    products: ProductInCart[];
    delivery_address: string;
    client: User;
}

type OrderStatsParams = {
    date_from: Date | null;
    date_to: Date | null;
    num_products: number;
};