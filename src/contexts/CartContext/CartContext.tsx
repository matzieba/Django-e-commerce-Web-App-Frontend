import React, {Dispatch, SetStateAction} from 'react';
import { Product } from "../../types/product";



export type ContextProps = {
    cart: Product[] | undefined
    addToCart: (product: Product) => void;
    setCart: Dispatch<SetStateAction<Product[]>>
};

export const defaultContext: ContextProps = {
    cart: undefined,
    addToCart: () => {},
    setCart: () => {},
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
                addToCart,
                setCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const AuthConsumer = CartContext.Consumer;