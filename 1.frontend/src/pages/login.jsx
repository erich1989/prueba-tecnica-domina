import * as React from 'react';
import FormLogin from '../components/login/formLogin';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Login() {
    return (
        <>
            <Grid container spacing={0} justifyContent={'center'} alignItems={'center'}
                sx={{ height: '100vh' }}
            >
                <Grid xs={4} >
                    <Box sx={{ p: 4, border: '1px solid #ccc', borderRadius: '5px', boxShadow: 1 }}>
                        <FormLogin />
                    </Box>
                </Grid>
            </Grid>
        </ >
    );
}

export default Login;
