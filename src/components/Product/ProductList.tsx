import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { ProductRow } from "./ProductRow";
import { useProductCrud } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";


export const ProductList: React.FC = () => {

    const { deleteProduct, products} = useProductCrud();

    const navigate = useNavigate();

    const onDelete = React.useCallback(async (id: number) => {
        return deleteProduct(id);
    }, [deleteProduct]);

    const onEdit = React.useCallback((id: number) => {
        navigate(`/product/${id}`);
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
                            <TableCell>Category:</TableCell>
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
        </React.Fragment>
    );
};
