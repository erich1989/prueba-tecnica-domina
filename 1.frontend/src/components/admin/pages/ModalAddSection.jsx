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
import { Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import actionSetions from '../../../actions/sections';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAddSection({ open, setOpen }) {
    const { myPages, setMySections, setOpenLoader } = useContext(ShopContext)
    const { enqueueSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        pageId: '',
        name: '',
        description: '',
        state: true,
    });

    const [errors, setErrors] = useState({
        pageId: false,
        name: false,
        description: false,
    });

    function resetValues() {
        setOpen(false);

        setFormData({
            pageId: '',
            name: '',
            description: '',
            state: true,
        });

        setErrors({
            pageId: false,
            name: false,
            description: false,
        });
    };

    const validateValues = () => {
        let hasErrors = false;
        const newErrors = {};

        if (formData.pageId === '') {
            newErrors.pageId = true;
            hasErrors = true;
        } else {
            newErrors.pageId = false;
            hasErrors = false;
        }

        if (formData.name === '') {
            newErrors.name = true;
            hasErrors = true;
        } else {
            newErrors.name = false;
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

    const requestCreateSection = async (data) => {
        try {
            setOpenLoader(true);
            const { response, status } = await actionSetions.createSection(data);
            if (status === 200) {
                setMySections(response);
                resetValues();
                setOpenLoader(false);
                enqueueSnackbar(`¡Sección creada exitosamente! 🎉`, {
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
            requestCreateSection(formData);
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
                <DialogTitle>{"Crear sección"}</DialogTitle>

                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth size="small" error={errors.pageId}>
                                <InputLabel id="demo-simple-select-label">Página</InputLabel>
                                <Select
                                    name='pageId'
                                    value={formData.pageId}
                                    label="Página *"
                                    onChange={handleChange}
                                >
                                    {
                                        myPages.map((page) => (
                                            <MenuItem key={page._id} value={page._id}>{page.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name='name'
                                label="Nombre *"
                                value={formData.name}
                                onChange={handleChange}
                                size='small'
                                fullWidth
                                error={errors.name}
                            />
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
                            <Typography>Estado</Typography>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <Typography>Inactivo</Typography>
                                <Switch
                                    defaultChecked
                                    inputProps={{ 'aria-label': 'ant design' }}
                                    color='error'
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
                        sx={{ backgroundColor: 'black', color: 'white', '&:hover': { color: 'black' } }}
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        color='error'
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
