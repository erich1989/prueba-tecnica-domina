import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { CardMedia, Box } from '@mui/material';

import LogoPartnecol from '../../../images/logo-partcol-blanco.png';
import FormAddProduct from './FormAddProduct';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAddPodruct({ open, setOpen }) {

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>

                Open full-screen dialog
            </Button> */}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: 'black' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Crear nuevo producto
                        </Typography>

                        <CardMedia
                            component="img"
                            image={LogoPartnecol}
                            alt="Paella dish"
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: 150 }}
                        />
                    </Toolbar>
                </AppBar>
                <Box sx={{ p: 4, height: 'calc(100vh - 100px)' }}>
                    <FormAddProduct />
                </Box>

            </Dialog>
        </React.Fragment>
    );
}
