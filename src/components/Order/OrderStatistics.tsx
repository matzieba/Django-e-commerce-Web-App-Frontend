import React from 'react';
import {
    Box,
    Button, IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';


import { useForm, Controller } from "react-hook-form";


import { MobileDatePicker,  LocalizationProvider} from "@mui/x-date-pickers";
import { getOrdersStats } from "../../clients/orderClient";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { OrderStats } from "../../types/order";
import { OrderStatRow } from "./OrderStatRow";
import RefreshIcon from '@mui/icons-material/Refresh';



type OrderStatsFormValues = {
    startDate: Date | null;
    endDate: Date | null;
    num_products: number;
}

export const OrderStatistics: React.FC = () => {

    const [orderStats, setOrderStats] = React.useState<OrderStats[]>([]);

    const { register, handleSubmit, control } = useForm<OrderStatsFormValues>();

    const onSubmit = async (data: OrderStatsFormValues) => {
        try {
            const response = await getOrdersStats({
                date_from: data.startDate,
                date_to: data.endDate,
                num_products: data.num_products,
            });

            setOrderStats(response);
        } catch(err) {
            console.error(err);
        }
    }

        return (
            <React.Fragment>
                {orderStats?.length === 0 && (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box marginBottom={2}>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    defaultValue={null}
                                    // @ts-ignore
                                    render={({ field: { onChange, value } }) => (
                                        <MobileDatePicker
                                            label="Start Date"
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                <Controller
                                    name="endDate"
                                    control={control}
                                    defaultValue={null}
                                    // @ts-ignore
                                    render={({ field: { onChange, value } }) => (
                                        <MobileDatePicker
                                            label="End Date"
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                            </Box>
                            <Box marginBottom={2}>
                                <TextField {...register('num_products')} type="number" label="Number of Products" />
                            </Box>
                            <Button variant="contained" color="primary" type="submit">
                                Get Order Stats
                            </Button>
                        </form>
                    </LocalizationProvider>
                )}
                {orderStats?.length !== 0 && (
                    <React.Fragment>
                        <TableContainer sx={{ overflowX: { xs: 'auto', sm: 'auto', md: 'auto', lg: 'visible' } }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name:</TableCell>
                                        <TableCell>Quantity:</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <React.Fragment>
                                        {orderStats && orderStats.map((orderStat, index) => (
                                            <OrderStatRow
                                                key={index}
                                                orderStat={orderStat}
                                            />
                                        ))}
                                    </React.Fragment>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <IconButton onClick={() => setOrderStats([])} size="large">
                            <RefreshIcon fontSize="large" />
                        </IconButton>
                    </React.Fragment>
                )}
            </React.Fragment>
    );
};



