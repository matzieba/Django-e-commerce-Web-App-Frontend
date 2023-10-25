import {Product} from "../types/product";
import {ProductInCart} from "../types/cart";

export const transformCart = (cart: Array<Product>): Array<ProductInCart> => {
    const productMap: Record<number | string, ProductInCart> = {};

    cart.forEach(product => {
        if (productMap[product.id]) {
            productMap[product.id].quantity += 1;
        } else {
            productMap[product.id] = {
                product: product,
                quantity: 1
            };
        }
    });

    return Object.values(productMap);
};