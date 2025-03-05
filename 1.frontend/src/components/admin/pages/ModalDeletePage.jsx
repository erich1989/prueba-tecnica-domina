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

export default function ModalDeletePage({ open, setOpen, page }) {
    const { setMyPages, setOpenLoader } = useContext(ShopContext)
    const { enqueueSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        name: '',
        link: 'tarea',
        description: '',
        state: true,
    });

    const handleSubmit = async () => {
        try {
            setOpenLoader(true);
            const data = { pageId: page._id }
            console.log(data)
            const { response, status } = await actionPages.deletePage(data);
            if (status === 200) {
                setMyPages(response);
                setOpenLoader(false);
                setOpen(false);
                enqueueSnackbar(`¡Tarea eliminada exitosamente! 🎉`, {
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
                <DialogTitle>{"Eliminar tarea"}</DialogTitle>

                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-slide-description">
                        ¿Está seguro de eliminar la tarea: <span style={{ fontWeight: 700, color: 'black' }}> {page.name}</span>? Una vez eliminada, no será posible recuperarla posteriormente.
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color='inherit'
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        color='error'
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
