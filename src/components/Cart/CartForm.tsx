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
    Box,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { CartContext } from "../../contexts/CartContext/CartContext";
import { transformCart } from "../../helpers/transformCart"
import { ProductInCart } from "../../types/cart";
import { CartRow } from "./CartRow";
import { useOrderCrud } from "../../hooks/useOrders";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Order } from "../../types/order";
import { useMe } from "../../hooks/useMe";



export const CartForm: React.FC = () => {

    const { cart, setCart } = useContext(CartContext);
    const [ products, setProducts ] = React.useState<Array<ProductInCart>>([]);
    const { createOrder } = useOrderCrud();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<Order>();
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
        <Box display='flex' width='100%' alignItems='center' flexDirection='column'>
            <Paper p={4} component={Box} width={{ xs: '100%', sm: 500 }}>
                <Typography variant='body2' align='center' color='grey.500'>Please fill in delivery information</Typography>
                <Box pt={2}>
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
                        <Grid container direction='column' spacing={3} pt={3}>
                            <Grid item xs={12}>
                                <Controller
                                    name='delivery_address'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) =>
                                        <TextField {...field} fullWidth variant='outlined' label='Delivery address' />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton fullWidth type='submit' loading={isSubmitting} size='large' variant='contained' color='primary'>
                                    Submit Order
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};
