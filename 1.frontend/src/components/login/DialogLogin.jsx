import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/shopContext';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import FormLogin from './formLogin';
import { capitalizeFirstLetter } from '../../js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AccountMenu() {
    const { infoUser, setInfoUser, setIsLoggedIn } = useContext(ShopContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };

    const handleLogout = () => {
        setInfoUser(null);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        handleClose();
    }

    function obtenerPrimerNombre(cadenaNombres) {
        const nombres = cadenaNombres.split(" ");

        if (nombres.length > 0) {
            return nombres[0];
        } else {
            return null;
        }
    }
    return (
        <React.Fragment>

            <Paper
                elevation={isHovered ? 1 : 0}
                sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 3, cursor: 'pointer' }}
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Avatar
                    alt={capitalizeFirstLetter(infoUser?.firstNames)}
                    src="/static/images/avatar/3.jpg"
                    sx={{ width: '50px', height: '50px', mr: 1, bgcolor: '#e52727' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start' }}>
                    <Typography variant="body2" sx={{ color: '#7A7A7A' }}>
                        {capitalizeFirstLetter(obtenerPrimerNombre(infoUser?.firstNames || ''))}
                    </Typography>
                    <Typography variant="h6" color="initial" sx={{ fontWeight: 700 }}>
                        {capitalizeFirstLetter(obtenerPrimerNombre(infoUser?.lastNames || ''))}
                    </Typography>
                </Box>
            </Paper>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Perfil
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ShoppingCartCheckoutOutlinedIcon />
                    </ListItemIcon>
                    Mis compras
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Ajustes
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default function DialogLogin() {
    const { isLoggedIn } = useContext(ShopContext);
    const [open, setOpen] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {
                isLoggedIn &&
                <AccountMenu />
            }

            {
                !isLoggedIn &&
                <Paper
                    elevation={isHovered ? 1 : 0}
                    sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 3, cursor: 'pointer' }}
                    onClick={handleClickOpen}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >


                    <Box
                        sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '50px', height: '50px', borderRadius: '50px',
                            backgroundColor: '#e52727', color: 'white', mr: 1
                        }}
                    >
                        {isHovered ? <SettingsAccessibilityIcon /> : <AccessibilityIcon />}
                    </Box>
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start' }}
                    >
                        <Typography variant="body2" sx={{ color: '#7A7A7A' }}>Iniciar sesión</Typography>
                        <Typography variant="h6" color="initial" sx={{ fontWeight: 700 }}>Mi cuenta</Typography>
                    </Box>
                </Paper>
            }

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth='xs'
            >
                <DialogContent sx={{ px: 5, py: 4 }}>
                    <FormLogin setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </>
    );
}