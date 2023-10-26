import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box, Grid, Paper, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useProductCrud } from "../../hooks/useProducts";
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from "../../types/product";
import { getProduct } from "../../clients/productClient";
import { useMe } from "../../hooks/useMe";

export const ProductForm: React.FC = () => {
    const [product, setProduct] = React.useState<Product | null>(null);
    const { createProduct, updateProduct } = useProductCrud();
    const { productId } = useParams();
    const [loading, setLoading] = React.useState(false);
    const { isSeller } = useMe();
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { isSubmitting, errors }, setValue } = useForm<Product>();

    React.useEffect(() => {
        if (product !== null) {
            for (const [key, value] of Object.entries(product)) {
                // @ts-ignore
                setValue(key as keyof FormValues, value);
            }
        }
    }, [product, setValue]);

    React.useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) {
                return;
            }
            setLoading(true);
            const productData = await getProduct(productId);
            setProduct(productData);
            setLoading(false);
        };

        fetchProduct();
    }, [productId]);


    const onSubmit: SubmitHandler<Product> = async (data: Product) => {
        try {
            if (!data.id) {
                await createProduct(data);
            } else {
                await updateProduct({ productId: data.id, updatedProduct: data });
            }
            navigate(`/products/`);
        } catch (error: any) {
            throw new Error(error.response.data.detail);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box display='flex' width='100%' alignItems='center' flexDirection='column'>
            <Paper p={4} component={Box} width={{ xs: '100%', sm: 500 }}>
                <Typography variant='body2' align='center' color='grey.500'>Please fill in product information</Typography>
                <Box pt={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container direction='column' spacing={3}>
                            <Grid item xs={12}>
                                <Controller
                                    name='name'
                                    control={control}
                                    rules={{required: true}}
                                    render={({ field }) =>
                                        <TextField {...field} fullWidth variant='outlined' label='Name' error={!!errors.name} helperText={errors.name?.message} />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) =>
                                        <TextField {...field} fullWidth variant='outlined' label='Description' error={!!errors.description} helperText={errors.description?.message} />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='price'
                                    control={control}
                                    rules={{required: true}}
                                    render={({ field }) =>
                                        <TextField {...field} fullWidth variant='outlined' label='Price' error={!!errors.price} helperText={errors.price?.message} />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='category'
                                    control={control}
                                    render={({ field }) =>
                                        <TextField {...field} fullWidth variant='outlined' label='Category' error={!!errors.category} helperText={errors.category?.message} />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton fullWidth type='submit' loading={isSubmitting} size='large' variant='contained' color='primary'>
                                    { isSeller ? 'Submit' : 'Add to Cart' }
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};