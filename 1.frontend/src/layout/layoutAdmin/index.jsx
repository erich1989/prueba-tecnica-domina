import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/shopContext';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { CardMedia } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

import LogoPartnecol from '../../images/logo-partcol-blanco.png';
import Loader from '../../components/loader/loader';

const drawerWidth = 270;

const sectionOne = [
    { id: 'home', name: 'Inicio', link: '/admin', icon: <AnalyticsIcon /> },
    { id: 'orders', name: 'Pedidos', link: '/admin/orders', icon: <LocalGroceryStoreIcon /> },
    { id: 'sales', name: 'Mis ventas', link: '/admin/sales', icon: <RequestQuoteIcon /> },
    { id: 'products', name: 'Productos e inventario', link: '/admin/products', icon: <InventoryIcon /> },
    { id: 'customers', name: 'Clientes', link: '/admin/customers', icon: <PeopleAltIcon /> },
];

const sectionTwo = [
    { id: 'pages', name: 'Páginas', link: '/admin/pages', icon: <ViewCarouselIcon /> },
    // { id: 'orders', name: 'Pádidos', link: '/admin/orders', icon: <LocalGroceryStoreIcon /> },
];


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const { openLoader } = useContext(ShopContext);
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}
            <AppBar position="fixed" open={open} sx={{ backgroundColor: '#1722ff' }} elevation={1}>
                <Toolbar>
                    {/* <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                mr: 2,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton> */}
                   
                    <CardMedia
                        component="img"
                        image={'https://domina.com.co/wp-content/uploads/2021/09/Logo-blanco-250.png'}
                        alt="Paella dish"
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: 150 }}
                    />
                    {/* </Link> */}
                </Toolbar>
            </AppBar>
            {/* <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List
                    component="nav"
                    subheader={
                        <ListSubheader
                            component="div"
                            sx={{ textAlign: 'start', fontWeight: 'bold' }}
                        >
                            Gestión administrativa
                        </ListSubheader>
                    }
                >
                    {sectionOne.map((text, index) => (
                        <ListItem key={text.id} disablePadding onClick={() => navigate(text.link)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List
                    subheader={
                        <ListSubheader
                            component="div"
                            sx={{ textAlign: 'start', fontWeight: 'bold' }}
                        >
                            Configuración de la Tienda
                        </ListSubheader>
                    }
                >
                    {sectionTwo.map((text, index) => (
                        <ListItem key={text.id} disablePadding onClick={() => navigate(text.link)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer> */}
            <Main open={open}>
                {/* <DrawerHeader /> */}
                <Box component="main" id="detail" sx={{pt: 10}}>
                    <Outlet />
                </Box>
                <Loader open={openLoader} />
            </Main>
        </Box>
    );
}
