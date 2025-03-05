import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../contexts/shopContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Box, Button, Chip, Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

import './styles.css';
import LogoPartnecol from '../../images/partnecol-back-orig.png';
import DialogLogin from '../../components/login/DialogLogin';
import actionPages from '../../actions/pages';

const staticPages = [
    { id: 'home', name: 'Inicio', link: '/' },
];

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '50px', // Bordes redondeados
        border: '1px solid #ccc', // Bordes grises
        paddingRight: '4px', // Espacio para el icono de búsqueda
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none', // Oculta el borde predeterminado del input
    },
    '& .MuiInputLabel-root': {
        color: '#999', // Color de texto gris
    },
}));

const SearchInput = () => {
    return (
        <StyledTextField
            placeholder="Search"
            variant="outlined"
            fullWidth
            size='small'
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton color='error'>
                            {/* <img src="search-icon.png" alt="Search Icon" style={{ width: '20px', height: '20px' }} /> */}
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

function NavigationButton(page) {
    const navigate = useNavigate();
    const location = useLocation();

    const handlenavigate = (page) => {
        navigate(
            `${page.link}`,
            { state: { page: page, tabNavigate: 0 } }
        );
    }

    function quitarBarraInicial(texto) {
        if (texto.startsWith('/')) {
            return texto.slice(1);
        }
        return texto;
    }
    return (
        <Button
            key={page.name}
            onClick={() => handlenavigate(page)}
            sx={{
                color: `${quitarBarraInicial(location.pathname)}` === `${quitarBarraInicial(page.link)}` ? '#e52727' : '#2b3445',
                // borderBottom: `${quitarBarraInicial(location.pathname)}` === `${quitarBarraInicial(page.link)}` ? '2px solid #e52727' : '#2b3445',
                // fontWeight: location.pathname === `${page.link}` ? 700 : 500,
                fontWeight: 700,
                fontSize: 14,
                display: 'block',
                borderRadius: 0,
                textTransform: 'none',
                minWidth: 80,
                pb: 2
            }}
        >
            {page.name.toUpperCase()}
        </Button>
    );
};

function Header() {
    const { setInfoUser, myPages, setMyPages } = useContext(ShopContext);

    const requestAllPages = async () => {
        try {
            const data = {};
            const { response, status } = await actionPages.returnAllPages(data);
            if (status === 200) {
                setMyPages(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // requestAllPages();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                // setInfoUser(decodedUser);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }

        // if (myPages.length === 0) {
        //     console.log('1---------------------------')
        //     // 
        // };

        // requestAllPages()

    }, [myPages]);

    return (
        <>
            <AppBar sx={{ backgroundColor: 'white', color: 'initial', borderBottom: '1px solid #e0e0e0' }} elevation={0}>
                <Box textAlign={'start'} sx={{ background: '#212529', pt: .9, pb: .9, mb: 2 }}>
                    <Box className='scrolling-content'>
                        <Chip className='chip' label='¡Oferta!' size='small' />
                        <Typography className='scrolling-text' variant="body1" color="initial" sx={{ color: 'white' }}>
                            🔥 ¡Regístrate ahora y disfruta de un 20% de descuento en tu primera compra! 🎉
                        </Typography>
                    </Box>
                </Box>

                <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                    <Grid container spacing={0} justifyContent={'center'} alignItems={'center'}>
                        <Grid item xs={3}>
                            <Link to={'/'}>
                                <CardMedia
                                    component="img"
                                    image={LogoPartnecol}
                                    alt="Paella dish"
                                    sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: 200 }}
                                />
                            </Link>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <SearchInput />
                            {/* <ProductFilter width='80%' title='Buscar por categoria' /> */}
                            {/* <ModalOrderTracking /> */}
                        </Grid>
                        <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                            <DawerProducts />
                            <DialogLogin />
                        </Grid>
                    </Grid>
                </Container>

                <Box sx={{ borderTop: '1px solid #e0e0e0' }}>
                    <Container maxWidth="xl">
                        <Grid item xs={12}>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center', justifyContent: 'center' }, mt: 2.5, mb: 0 }}>
                                <Box sx={{ display: 'flex' }}>
                                    {staticPages.map((page) => (
                                        <NavigationButton key={page.id} {...page} />
                                    ))}
                                </Box>
                                <Box sx={{ border: '1px solid red', height: '30px', mb: 1, mr: 3 }}></Box>
                                <Box sx={{ display: 'flex' }}>
                                    {myPages.map((page) => (
                                        <NavigationButton key={page._id} {...page} />
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Container>
                </Box>
            </AppBar>
        </>
    );
}

export default Header;