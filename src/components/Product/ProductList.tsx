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
import { useProducts } from "../../hooks/useProducts";


export const ProductList: React.FC = () => {

    const products  = useProducts();

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
