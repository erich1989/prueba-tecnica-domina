import React, { useState, useContext } from 'react';
import { ShopContext } from '../../../contexts/shopContext';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

import actionPages from '../../../actions/pages';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAddPage({ open, setOpen }) {
    const { setMyPages, setOpenLoader } = useContext(ShopContext)
    const { enqueueSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        name: '',
        link: 'tarea',
        description: '',
        state: true,
    });

    const [errors, setErrors] = useState({
        name: false,
        link: false,
        description: false,
    });

    function resetValues() {
        setOpen(false);

        setFormData({
            name: '',
            link: '',
            description: '',
            state: true,
        });

        setErrors({
            name: false,
            link: false,
            description: false,
        });
    };

    const validateValues = () => {
        let hasErrors = false;
        const newErrors = {};

        if (formData.name === '') {
            newErrors.name = true;
            hasErrors = true;
        } else {
            newErrors.name = false;
            hasErrors = false;
        }

        if (formData.link === '') {
            newErrors.link = true;
            hasErrors = true;
        } else {
            newErrors.link = false;
            hasErrors = false;
        }

        if (formData.description === '') {
            newErrors.description = true;
            hasErrors = true;
        } else {
            newErrors.description = false;
            hasErrors = false;
        }

        if (hasErrors) {
            enqueueSnackbar('Los datos marcados con (*) son obligatorios', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            });
        }

        setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));

        return hasErrors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSwitchChange = (event) => {
        setFormData({
            ...formData,
            state: event.target.checked,
        });
    };

    const requestCreatePage = async (data) => {
        try {
            setOpenLoader(true);
            const { response, status } = await actionPages.createPage(data);
            if (status === 200) {
                setMyPages(response);
                resetValues();
                setOpenLoader(false);
                enqueueSnackbar(`¡Tarea creada exitosamente! 🎉`, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = () => {
        const exiteError = validateValues();

        if (!exiteError) {
            requestCreatePage(formData);
        } else {
            console.log('existe error');
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button> */}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Crear tarea"}</DialogTitle>

                <DialogContent dividers>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText> */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                name='name'
                                label="Tarea *"
                                value={formData.name} 
                                onChange={handleChange}
                                size='small'
                                fullWidth
                                error={errors.name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <TextField
                                name='link'
                                label="Link *"
                                value={formData.link}
                                onChange={handleChange}
                                size='small'
                                fullWidth
                                error={errors.link}
                            /> */}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                label="Descripción *"
                                value={formData.description}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                size='small'
                                fullWidth
                                error={errors.description}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Estado *</Typography>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <Typography>Inactivo</Typography>
                                <Switch
                                    defaultChecked
                                    inputProps={{ 'aria-label': 'ant design' }}
                                    // color='error'
                                    checked={formData.active}
                                    onChange={handleSwitchChange}
                                />
                                <Typography>Activo</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color='inherit'
                        // sx={{ backgroundColor: 'black', color: 'white', '&:hover': { color: 'black' } }}
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        // color='error'
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
