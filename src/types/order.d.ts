import  {ProductInCart } from "./product";



export type Order = {
    products: ProductInCart[];
    delivery_address: string;
    client: User;
}