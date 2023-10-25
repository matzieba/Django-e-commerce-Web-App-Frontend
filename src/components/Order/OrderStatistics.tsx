import React, { useContext } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';


import { SubmitHandler, useForm, Controller } from "react-hook-form";


import { MobileDatePicker,  LocalizationProvider} from "@mui/x-date-pickers";
import { getOrdersStats } from "../../clients/orderClient";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


type OrderStatsFormValues = {
    startDate: Date | null;
    endDate: Date | null;
    num_products: number;
}

export const OrderStatistics: React.FC = () => {


    const { register, handleSubmit, control } = useForm<OrderStatsFormValues>();

    const onSubmit = (data: OrderStatsFormValues) => {
        getOrdersStats({
            date_from: data.startDate,
            date_to: data.endDate,
            num_products: data.num_products,
        });
    }


        return (
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
    );
};


    // return (
    //     <React.Fragment>
    //         <form onSubmit={handleSubmit(onSubmit)}>
    //             <TableContainer sx={{ overflowX: { xs: 'auto', sm: 'auto', md: 'auto', lg: 'visible' } }}>
    //                 <Table>
    //                     <TableHead>
    //                         <TableRow>
    //                             <TableCell>Name:</TableCell>
    //                             <TableCell>Price:</TableCell>
    //                             <TableCell>Quantity:</TableCell>
    //                         </TableRow>
    //                     </TableHead>
    //                     <TableBody>
    //                         <React.Fragment>
    //                             {products && products.map(product => {
    //                                 return (
    //                                     <OrderRow
    //                                         key={product.product.id}
    //                                         product={product}
    //                                     />
    //                                 );
    //                             })}
    //                         </React.Fragment>
    //                     </TableBody>
    //                 </Table>
    //             </TableContainer>
    //             <TextField {...register("delivery_address")} required label="Delivery address" />
    //             <Button type="submit">Submit Order</Button>
    //         </form>
    //     </React.Fragment>
    // );

