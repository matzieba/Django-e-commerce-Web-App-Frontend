import React, { useContext } from 'react';
import { Paper, TableRow, TableCell, Typography, IconButton } from '@mui/material';
import { Product } from "../../types/product";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMe } from "../../hooks/useMe";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CartContext } from "../../contexts/CartContext/CartContext";

interface Props {
    product: Product;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const ProductRow: React.FC<Props> = ({ product, onDelete, onEdit }) => {

    const { isClient, isSeller } = useMe();

    const { addToCart } = useContext(CartContext);

    return (
        <Paper component={TableRow} elevation={1}>
            <TableCell>
                <Typography variant="body2">
                    {product.id}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">
                    {product.name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">
                    {product.description}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">
                    {product.price}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">
                    {product.category}
                </Typography>
            </TableCell>
            {isSeller && (
                <React.Fragment>
                    <TableCell>
                        <IconButton onClick={() => onEdit(product.id)}>
                            <EditIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={() => onDelete(product.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </React.Fragment>
            )}
            {isClient && (
                    <TableCell>
                        <IconButton onClick={() => addToCart(product)}>
                            <AddShoppingCartIcon />
                        </IconButton>
                    </TableCell>
            )}
        </Paper>
    );
};


