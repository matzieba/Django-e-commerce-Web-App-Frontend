import React, { useContext } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';

import { CartContext } from "../../contexts/CartContext/CartContext";
import { transformCart } from "../../helpers/transformCart"
import { ProductInCart } from "../../types/cart";
import { CartRow } from "./CartRow";
import { useOrderCrud } from "../../hooks/useOrders";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Order } from "../../types/order";
import { useMe } from "../../hooks/useMe";


export const CartForm: React.FC = () => {

    const { cart, setCart } = useContext(CartContext);
    const [ products, setProducts ] = React.useState<Array<ProductInCart>>([]);
    const { createOrder } = useOrderCrud();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<Order>();
    const { user } = useMe();

    const onSubmit: SubmitHandler<Order> = async (data: Order) => {
        data.products = products.map((productInCart) => {
            return {
                product: productInCart.product.id,
                quantity: productInCart.quantity
            }
        });
        data.client = user && user.id;
        try {
            await createOrder(data);
            setCart([])
            navigate(`/products/`);
        } catch (error: any) {
            throw new Error(error.response.data.detail);
        }
    };

    React.useEffect(() => {
        if (cart) {
            setProducts(transformCart(cart));
        }
    }, [cart]);

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TableContainer sx={{ overflowX: { xs: 'auto', sm: 'auto', md: 'auto', lg: 'visible' } }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name:</TableCell>
                                <TableCell>Price:</TableCell>
                                <TableCell>Quantity:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <React.Fragment>
                                {products && products.map(product => {
                                    return (
                                        <CartRow
                                            key={product.product.id}
                                            product={product}
                                        />
                                    );
                                })}
                            </React.Fragment>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TextField {...register("delivery_address")} required label="Delivery address" />
                <Button type="submit">Submit Order</Button>
            </form>
        </React.Fragment>
    );
};
