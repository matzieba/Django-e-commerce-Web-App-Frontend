import React from 'react';
import { Paper, TableRow, TableCell, Typography, IconButton } from '@mui/material';
import { Product } from "../../types/product";
import EditIcon from '@mui/icons-material/Edit';



interface Props {
    product: Product;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const ProductRow: React.FC<Props> = ({ product, onDelete, onEdit}) => {

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
            <TableCell>
                <IconButton onClick={() => onEdit(product.id)}>
                    <EditIcon />
                </IconButton>
            </TableCell>
        </Paper>
    );
};


