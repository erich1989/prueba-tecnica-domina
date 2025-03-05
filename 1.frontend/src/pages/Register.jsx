import React from 'react';
import Grid from '@mui/material/Grid';
import FormRegister from '../components/register/FormRegister';

function Register() {
    return (
        <>
            <Grid container spacing={0} justifyContent={'center'} alignItems={'center'}
                sx={{ height: '100vh' }}>
                <Grid xs={12}>
                    <FormRegister />
                </Grid>
            </Grid>
        </>
    );
}

export default Register;
