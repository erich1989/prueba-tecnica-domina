import React, { useState, useContext } from 'react';
import { ShopContext } from '../../contexts/shopContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { decodeToken } from '../../js';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, CardMedia } from '@mui/material';
import { keyframes } from '@emotion/react';

import actionUser from '../../actions/user';
import { setLocalStorageToken } from '../../conf';
import Loader from '../loader/loader';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

function FormLogin({ setOpen }) {
    const { setIsLoggedIn, setInfoUser } = useContext(ShopContext);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [openLoader, setOpenLoader] = useState(false);
    const [inputValues, setInputValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const loginUser = async (email, password, typeUser) => {
        try {
            const user = await actionUser.loginUser({ email, password, typeUser });
            return user;
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            throw new Error('Error al intentar iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.');
        }
    };

    const handleChangeInputValues = (e) => {
        const { name, value } = e.target;

        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value
        }))
    }

    const validateValues = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const newErrors = {
            email: !inputValues.email ? 'El campo de email es obligatorio' : (!emailRegex.test(inputValues.email) ? 'Por favor, ingrese un correo electrónico válido' : ''),
            password: !inputValues.password ? 'El campo de contraseña es obligatorio' : ''
        };

        setErrors(newErrors);

        if (newErrors.email) {
            enqueueSnackbar(newErrors.email, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        }

        if (newErrors.password) {
            enqueueSnackbar(newErrors.password, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        }

        return newErrors.email || newErrors.password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasErrors = validateValues();
        if (hasErrors) {
            return;
        }

        try {
            setOpenLoader(true);
            const response = await loginUser(inputValues.email, inputValues.password, 'user');

            if (response.status === 200) {
                setIsLoggedIn(true);
                setOpenLoader(false);
                const decodedUser = decodeToken(response.response.token);
                setInfoUser(decodedUser);
                setLocalStorageToken(response.response.token);
                if (decodedUser.role.type === 'customer') {
                    navigate('/admin');
                } else if (decodedUser.role.type === 'admin') {
                    navigate('/admin');
                }
                setOpen(false);
            } else {
                enqueueSnackbar(response.error, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                });
                // The error is in the response object
                const errorMessage = response.error || 'Unknown error';
                throw new Error(errorMessage);


            }
        } catch (error) {
            setOpenLoader(false);
            console.error(error)
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box >

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#1722ff', mb: 3.5, p: 1.5, borderRadius: 1 }}>
                        <CardMedia
                            component="img"
                            image={'https://domina.com.co/wp-content/uploads/2021/09/Logo-blanco-250.png'}
                            alt="Paella dish"
                            sx={{ display: { md: 'flex' }, width: 180 }}
                        />
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth error={errors.email} >
                                <InputLabel htmlFor="outlined">Correo electrónico *</InputLabel>
                                <OutlinedInput
                                    id="outlined"
                                    type={'text'}
                                    name='email'
                                    value={inputValues.email}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                                <PersonOutlineIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Correo electrónico *"
                                    onChange={handleChangeInputValues}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth error={errors.password} >
                                <InputLabel htmlFor="outlined-adornment-password">Contraseña *</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={inputValues.password}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                                <LockOutlinedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Contraseña *"
                                    onChange={handleChangeInputValues}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant="contained"
                                // color='error'
                                fullWidth
                                size='large'
                                sx={{
                                    backgroundColor: '#1722ff', fontWeight: 700,
                                }}
                            >
                                Iniciar sesión
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography variant="body1">
                                <span style={{marginRight: 3, fontWeight: 600}}>
                                    ¿No tienes cuenta?{' '}
                                </span>
                                
                                <Link underline='none' href="/register"
                                sx={{
                                    color: '#e52727',
                                    fontWeight: 700,
                                    animation: `${pulseAnimation} 2s infinite`,
                                    display: 'inline-block',
                                }}
                                >
                                    Regístrate
                                </Link>
                            </Typography>
                        </Grid>

                        {/* <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography variant="body2">
                                ¿Olvidaste tu contraseña?{' '}
                                <Link underline='none' href="#" sx={{ color: '#e52727' }}>
                                    Recupérala
                                </Link>
                            </Typography>
                        </Grid> */}
                    </Grid>
                </Box>
            </form>
            <Loader open={openLoader} />
        </>
    );
}

export default FormLogin;