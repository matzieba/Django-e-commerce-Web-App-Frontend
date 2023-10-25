import React from 'react';
import { Paper, TableRow, TableCell, Typography } from '@mui/material';
import { ProductInCart } from "../../types/cart";

interface Props {
    product: ProductInCart;
}

export const CartRow: React.FC<Props> = ({ product}) => {

    return (
        <Paper component={TableRow} elevation={1}>
            <TableCell>
                <Typography variant="body2">
                    {product.product.name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">
                    {product.product.price}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">
                    {product.quantity}
                </Typography>
            </TableCell>
        </Paper>
    );
};


