import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Grid,  Paper,TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useLogIn } from '../hooks/useLogIn';


export const Login = () => {

    const { control, setError, handleSubmit, formState: { isSubmitting, errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { logIn } = useLogIn();

    const onSubmit = React.useCallback (async ({ email, password }: { email: string; password: string }) => {
        try {
            await logIn(email, password);
        } catch (e: any) {
            
            setError('password', { type: 'error', message: 'something went wrong' });
            }
        }, [logIn, setError]);

    return (
        <Box display='flex' width='100%' alignItems='center' flexDirection='column'>
            <Paper p={4} component={Box} width={{ xs: '100%', sm: 500 }}>
                <Typography variant='body2' align='center' color='grey.500'>Please log in</Typography>
                <Box pt={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container direction='column' spacing={3}>
                            <Grid item xs={12}>
                                <Controller
                                    name='email'
                                    control={control}
                                    rules={{
                                        required: 'this field is required',
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            variant='outlined'
                                            label='email'
                                            name='email'
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
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