import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../contexts/shopContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PhoneIcon from '@mui/icons-material/Phone';

import Loader from '../loader/loader';
import actionUser from '../../actions/user';
import { decodeToken } from '../../js';
import { setLocalStorageToken } from '../../conf';

function FormRegister() {
    const { setInfoUser } = useContext(ShopContext);
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [openLoader, setOpenLoader] = useState(false);

    const [userValues, setUserValues] = useState({
        companyId: '',
        firstNames: '',
        lastNames: '',
        email: '',
        phone: '',
        role: 'customer',
        password: '',
        confirmPassword: '',
        gender: '',
        termsAccepted: false,
    });
    const [error, setError] = useState({
        firstNames: false,
        lastNames: false,
        email: false,
        phone: false,
        password: false,
        confirmPassword: false,
        gender: false,
        termsAccepted: false,
    });

    useEffect(() => {
        setUserValues((prev) => ({
            ...prev,
            companyId: process.env.REACT_APP_ID_COMPANY,
        }))
    }, [])

    const handleUserValues = (e) => {
        const { name, value, type, checked } = e.target;

        setUserValues((preState) => ({
            ...preState,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const validateValues = (values) => {
        const newErrors = {};
        let hasErrors = false;
        let emptyFields = false;
        let passwordMismatch = false;
        let termsNotAccepted = false;
        let invalidEmail = false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        for (const key in values) {
            if (values[key] === '' || values[key] === false) {
                newErrors[key] = true;
                hasErrors = true;
                emptyFields = true;
            } else {
                newErrors[key] = false;
            }
        }

        if (values.password !== values.confirmPassword) {
            newErrors.password = true;
            newErrors.confirmPassword = true;
            hasErrors = true;
            passwordMismatch = true;
        }

        if (!values.termsAccepted) {
            newErrors.termsAccepted = true;
            hasErrors = true;
            termsNotAccepted = true;
        }

        if (!emailRegex.test(values.email)) {
            newErrors.email = true;
            hasErrors = true;
            invalidEmail = true;
        }

        setError((prevErrors) => ({
            ...prevErrors,
            ...newErrors,
        }));

        if (emptyFields) {
            enqueueSnackbar(
                'Por favor, complete todos los campos marcados con un (*)',
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                },
            );
        }

        if (passwordMismatch) {
            enqueueSnackbar(
                'Las contraseñas no coinciden',
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                },
            );
        }

        if (termsNotAccepted) {
            enqueueSnackbar(
                'Debe aceptar los términos y condiciones',
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                },
            );
        }

        if (invalidEmail) {
            enqueueSnackbar(
                'El formato del correo electrónico es inválido',
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                },
            );
        }

        return hasErrors;
    };

    const createUser = async (data) => {
        const submitUser = await actionUser.registernUser(data);
        console.log(submitUser);
        return submitUser
    }

    const handleSubmit = async () => {
        console.log(userValues)
        const hasErrors = validateValues(userValues);

        const newUserValues = { ...userValues }

        delete newUserValues.confirmPassword;

        console.log(newUserValues)

        if (!hasErrors) {
            setOpenLoader(true);

            try {
                const { error, response, status } = await createUser(newUserValues);

                if (status === 200) {
                    setOpenLoader(false);
                    setLocalStorageToken(response.token);
                    // const decodedUser = decodeToken(response.token);
                    // setInfoUser(decodedUser);

                    navigate('/admin');
                } else {
                    setOpenLoader(false);
                    enqueueSnackbar(
                        `Error al crear usuario: ${error || 'Error desconocido'}`,
                        {
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center',
                            },
                        },
                    );
                }
            } catch (error) {
                setOpenLoader(false);
                enqueueSnackbar(
                    `Error al crear usuario: ${error.message || 'Error desconocido'}`,
                    {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    },
                );
            }
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0', height: '100%' }}>
                <Paper elevation={3} sx={{ padding: 5, borderRadius: 2, width: 500 }}>
                    <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px', color: '#1722ff' }}>
                        Crea tu cuenta
                    </Typography>
                    <Typography variant="subtitle1" style={{ textAlign: 'center', marginBottom: '20px', color: '#424242' }}>
                        Ingresa tus datos
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-firstname">Nombres *</InputLabel>
                                <OutlinedInput
                                    id="outlined-firstname"
                                    size='small'
                                    type={'text'}
                                    name='firstNames'
                                    value={userValues.firstNames}
                                    onChange={handleUserValues}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton edge="start">
                                                <PersonOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Nombre *"
                                    error={error.firstNames}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-lastname">Apellidos *</InputLabel>
                                <OutlinedInput
                                    id="outlined-lastname"
                                    size='small'
                                    type={'text'}
                                    name='lastNames'
                                    value={userValues.lastNames}
                                    onChange={handleUserValues}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton edge="start">
                                                <PersonOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Apellidos *"
                                    error={error.lastNames}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-gender">Género *</InputLabel>
                                <Select
                                    id="outlined-gender"
                                    size='small'
                                    name='gender'
                                    value={userValues.gender}
                                    onChange={handleUserValues}
                                    label="Género *"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton edge="start">
                                                <PersonOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    error={error.gender}
                                >
                                    <MenuItem value="male">Masculino</MenuItem>
                                    <MenuItem value="female">Femenino</MenuItem>
                                    <MenuItem value="other">Otro</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-email">Celular *</InputLabel>
                                <OutlinedInput
                                    id="outlined-email"
                                    size='small'
                                    type={'text'}
                                    name='phone'
                                    value={userValues.phone}
                                    onChange={handleUserValues}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton edge="start">
                                                <PhoneIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Celular *"
                                    error={error.phone}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-email">Correo Electrónico *</InputLabel>
                                <OutlinedInput
                                    id="outlined-email"
                                    size='small'
                                    type={'email'}
                                    name='email'
                                    value={userValues.email}
                                    onChange={handleUserValues}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton edge="start">
                                                <EmailOutlinedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Correo Electrónico *"
                                    error={error.email}
                                />
                            </FormControl>
                        </Grid>
                      

                       

                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-password">Contraseña *</InputLabel>
                                <OutlinedInput
                                    id="outlined-password"
                                    size='small'
                                    type={'password'}
                                    name='password'
                                    value={userValues.password}
                                    onChange={handleUserValues}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton edge="start">
                                                <LockOutlinedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Contraseña *"
                                    error={error.password}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-confirm-password">Confirmar Contraseña *</InputLabel>
                                <OutlinedInput
                                    id="outlined-confirm-password"
                                    size='small'
                                    type={'password'}
                                    name='confirmPassword'
                                    value={userValues.confirmPassword}
                                    onChange={handleUserValues}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton edge="start">
                                                <LockOutlinedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirmar Contraseña *"
                                    error={error.confirmPassword}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} textAlign={'start'}>
                            <FormControlLabel
                                control={<Checkbox checked={userValues.termsAccepted} name='termsAccepted' onChange={handleUserValues} color="warning" />}
                                label={<span style={{ color: error.termsAccepted && 'red' }}>Acepto los términos y condiciones *</span>}
                            />
                            {error.termsAccepted ? <span style={{ color: 'red' }}>Requerido</span> : ''}
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant="contained"
                                fullWidth
                                onClick={handleSubmit}
                                color='primary'
                                sx={{
                                    backgroundColor: '#1722ff',
                                    padding: '10px 0'
                                }}
                            >
                                Regístrarse
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>


            </div>
            <Loader open={openLoader} />
        </>
    );
}

export default FormRegister;