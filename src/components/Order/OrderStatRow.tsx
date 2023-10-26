import React from 'react';
import { Paper, TableRow, TableCell, Typography } from '@mui/material';
import {OrderStats} from "../../types/order";

interface Props {
    orderStat: OrderStats;
}

export const OrderStatRow: React.FC<Props> = ({ orderStat }) => {

    return (
        <Paper component={TableRow} elevation={1}>
            <TableCell>
                <Typography variant="body2">
                    {orderStat.product}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">
                    {orderStat.orders}
                </Typography>
            </TableCell>
        </Paper>
    );
};


