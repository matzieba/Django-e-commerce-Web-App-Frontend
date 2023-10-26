import React from 'react';
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    Grid,
    Typography,

} from '@mui/material';
import { LoadingButton } from '@mui/lab';


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

    const { handleSubmit, control, formState: { isSubmitting } } = useForm<OrderStatsFormValues>();

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
                            <Box display='flex' width='100%' alignItems='center' flexDirection='column'>
                                <Paper p={4} component={Box} width={{ xs: '100%', sm: 190 }}>
                                    <Typography variant='body2' align='center' color='grey.500'>Please fill in order information</Typography>
                                    <Box pt={2}>
                                        <Grid container direction='column' spacing={3}>
                                            <Grid item xs={12}>
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
                                            </Grid>
                                            <Grid item xs={12}>
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
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Controller
                                                    name="num_products"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) =>
                                                        <TextField {...field} fullWidth variant='outlined' label="Number of Products" type="number" />}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LoadingButton fullWidth type='submit' size='large' loading={isSubmitting} variant='contained' color='primary'>
                                                    Get Order Stats
                                                </LoadingButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Box>
                        </form>
                    </LocalizationProvider>
                )}
                {orderStats?.length !== 0 && (
                    <React.Fragment>
                        <Box display='flex' width='100%' alignItems='center' flexDirection='column'>
                            <Typography variant='body2' align='center' color='grey.500'>Most ordered products:</Typography>
                            <Paper p={4} component={Box} width={{ xs: '100%', sm: 350 }}>
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
                            </Paper>
                        </Box>
                    </React.Fragment>
                )}
            </React.Fragment>
    );
};



