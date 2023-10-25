import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Grid,  Paper,TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useLogIn } from '../hooks/useLogIn';
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const { control, setError, handleSubmit, formState: { isSubmitting, errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const { logIn } = useLogIn();

    const navigate = useNavigate();

    const onSubmit = React.useCallback (async ({ username, password }: { username: string; password: string }) => {
        try {
            await logIn(username, password);
            navigate('/products')
        } catch (e: any) {
            setError('password', { type: 'error', message: 'something went wrong' });
            }
        }, [logIn, setError, navigate]);

    return (
        <Box display='flex' width='100%' alignItems='center' flexDirection='column'>
            <Paper p={4} component={Box} width={{ xs: '100%', sm: 500 }}>
                <Typography variant='body2' align='center' color='grey.500'>Please log in</Typography>
                <Box pt={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container direction='column' spacing={3}>
                            <Grid item xs={12}>
                                <Controller
                                    name='username'
                                    control={control}
                                    rules={{
                                        required: 'this field is required',
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            variant='outlined'
                                            label='username'
                                            name='username'
                                            error={!!errors.username}
                                            helperText={errors.username?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='password'
                                    control={control}
                                    rules={{ required: 'this field is required' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            variant='outlined'
                                            label='password'
                                            name='password'
                                            type='password'
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton fullWidth type='submit' loading={isSubmitting} size='large' variant='contained' color='primary'>
                                    Log in
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};
