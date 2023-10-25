import React from 'react';
import { Product } from "../../types/product";



export type ContextProps = {
    cart: Product[] | undefined
    addToCart: (product: Product) => void;
};

export const defaultContext: ContextProps = {
    cart: undefined,
    addToCart: () => {},
};


export const CartContext = React.createContext(defaultContext);

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [cart, setCart] = React.useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart(prevCart => [...prevCart, product]);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const AuthConsumer = CartContext.Consumer;