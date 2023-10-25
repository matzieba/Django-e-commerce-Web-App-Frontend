import React from 'react';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Typography
} from '@mui/material';
import { ProductRow } from "./ProductRow";
import { useProductCrud } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import {useMe} from "../../hooks/useMe";



export const ProductList: React.FC = () => {

    const { isSeller } = useMe();

    const { deleteProduct, products} = useProductCrud();

    const navigate = useNavigate();

    const onDelete = React.useCallback(async (id: number) => {
        return deleteProduct(id);
    }, [deleteProduct]);

    const onEdit = React.useCallback((id: number) => {
        navigate(`/product/${id}`);
    }, [navigate]);

    const onCreate = React.useCallback(() => {
        navigate(`/product/`);
    }, [navigate]);


    return (
        <React.Fragment>
            <TableContainer sx={{ overflowX: { xs: 'auto', sm: 'auto', md: 'auto', lg: 'visible' } }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ paddingLeft: 16 }}>Id:</TableCell>
                            <TableCell>Name:</TableCell>
                            <TableCell>Description:</TableCell>
                            <TableCell>Price:</TableCell>
                            <TableCell>Category Id:</TableCell>
                            <TableCell></TableCell>
                            {isSeller && <TableCell></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <React.Fragment>
                            {products && products.map(product => {
                                return (
                                    <ProductRow
                                        key={product.id}
                                        product={product}
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                                    />
                                );
                            })}
                        </React.Fragment>
                    </TableBody>
                </Table>
            </TableContainer>
            {isSeller && (
                <Box>
                    <IconButton onClick={() => onCreate()} size="large">
                        <AddIcon fontSize="large" />
                    </IconButton>
                </Box>
            )}
        </React.Fragment>
    );
};
