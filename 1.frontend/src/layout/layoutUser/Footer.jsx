// import React from 'react';
// import { Box, Typography, Grid, Link } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';

// const Footer = () => {
//     return (
//         <Box
//             sx={{
//                 backgroundColor: '#1F2630',
//                 color: '#ffffff',
//                 padding: '60px 0',
//                 marginTop: '40px',
//                 borderTop: '5px solid #d23f57'
//             }}
//         >
//             <Grid container spacing={4} justifyContent="center">
//                 <Grid item xs={12} sm={6} md={3}>
//                     <Typography variant="h6" align="center" gutterBottom sx={{ color: '#d23f57', textShadow: '0 0 5px #d23f57, 0 0 10px #d23f57' }}>
//                         Navegación
//                     </Typography>
//                     <Typography align="center">
//                         {['Inicio', 'Tienda', 'Contacto', 'FAQs'].map((text) => (
//                             <Link
//                                 key={text}
//                                 href="#"
//                                 color="inherit"
//                                 underline="hover"
//                                 sx={{
//                                     display: 'block',
//                                     padding: '5px 0',
//                                     transition: 'color 0.3s',
//                                     '&:hover': { color: '#d23f57' }
//                                 }}
//                             >
//                                 {text}
//                             </Link>
//                         ))}
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <Typography variant="h6" align="center" gutterBottom sx={{ color: '#4CAF50', textShadow: '0 0 5px #4CAF50, 0 0 10px #4CAF50' }}>
//                         Información
//                     </Typography>
//                     <Typography align="center">
//                         {['Política de Privacidad', 'Términos de Servicio', 'Envíos y Devoluciones'].map((text) => (
//                             <Link
//                                 key={text}
//                                 href="#"
//                                 color="inherit"
//                                 underline="hover"
//                                 sx={{
//                                     display: 'block',
//                                     padding: '5px 0',
//                                     transition: 'color 0.3s',
//                                     '&:hover': { color: '#4CAF50' }
//                                 }}
//                             >
//                                 {text}
//                             </Link>
//                         ))}
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <Typography variant="h6" align="center" gutterBottom sx={{ color: '#2196F3', textShadow: '0 0 5px #2196F3, 0 0 10px #2196F3' }}>
//                         Contáctanos
//                     </Typography>
//                     <Typography align="center">
//                         Email: <Link href="mailto:contacto@tienda.com" color="inherit" underline="hover">contacto@tienda.com</Link><br />
//                         Teléfono: <Link href="tel:+1234567890" color="inherit" underline="hover">+1 234 567 890</Link>
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <Typography variant="h6" align="center" gutterBottom sx={{ color: '#FF9800', textShadow: '0 0 5px #FF9800, 0 0 10px #FF9800' }}>
//                         Síguenos
//                     </Typography>
//                     <Typography align="center">
//                         <Link href="#" color="inherit" underline="hover" sx={{ margin: '0 10px' }}>
//                             <FacebookIcon fontSize="large" />
//                         </Link>
//                         <Link href="#" color="inherit" underline="hover" sx={{ margin: '0 10px' }}>
//                             <InstagramIcon fontSize="large" />
//                         </Link>
//                         <Link href="#" color="inherit" underline="hover" sx={{ margin: '0 10px' }}>
//                             <TwitterIcon fontSize="large" />
//                         </Link>
//                     </Typography>
//                 </Grid>
//             </Grid>
//             <Typography variant="body2" align="center" style={{ marginTop: '20px', color: '#ffffff' }}>
//                 © {new Date().getFullYear()} Tu Tienda de Licores. Todos los derechos reservados.
//             </Typography>
//         </Box>
//     );
// };

// export default Footer;


import React from 'react';
import { Box, Grid, Container, Typography, Link, TextField, Button, styled } from '@mui/material';
// import VisaIcon from '@mui/icons-material/Visa';
// import DiscoverIcon from '@mui/icons-material/Discover';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Estilos personalizados para el botón de suscripción
const SubscribeButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#e91e63', // Color de fondo rosa
    '&:hover': {
        backgroundColor: '#c2185b', // Color de fondo más oscuro al pasar el cursor
    },
}));

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#000', color: '#fff', py: 4, px: 4 }}>
            {/* <Container> */}
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={3} textAlign={'left'}>
                        <Typography variant="h5" gutterBottom fontWeight={'bold'} >Get In Touch</Typography>
                        <Typography variant="h6" color={'error'} fontWeight={'bold'} sx={{mb:1}}>Address:</Typography>
                        <Typography>(843) 846-2230 20 Island Tank Rd<br />Beaufort. South Carolina (SC).</Typography>
                        <Typography variant="h6" gutterBottom color={'error'} fontWeight={'bold'} sx={{mb:1}}>Email:</Typography>
                        <Typography>example@mail.com<br />sample@mail.com</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}  textAlign={'left'}>
                        <Typography variant="h5" gutterBottom fontWeight={'bold'}>Our Services</Typography>
                        <Link href="#" color="inherit">Delivery Information</Link><br />
                        <Link href="#" color="inherit">Contact Us</Link><br />
                        <Link href="#" color="inherit">Information</Link><br />
                        <Link href="#" color="inherit">Let's Talk</Link><br />
                        <Link href="#" color="inherit">Terms And Conditions</Link><br />
                        <Link href="#" color="inherit">Contact Us</Link>
                    </Grid>
                    <Grid item xs={12} sm={3}  textAlign={'left'}>
                        <Typography variant="h5" gutterBottom fontWeight={'bold'}>Useful Links</Typography>
                        <Link href="#" color="inherit">Delivery Information</Link><br />
                        <Link href="#" color="inherit">Contact Us</Link><br />
                        <Link href="#" color="inherit">Information</Link><br />
                        <Link href="#" color="inherit">Let's Talk</Link><br />
                        <Link href="#" color="inherit">Terms And Conditions</Link><br />
                        <Link href="#" color="inherit">Information</Link>
                    </Grid>
                    <Grid item xs={12} sm={3}  textAlign={'left'}>
                        <Typography variant="h5" gutterBottom fontWeight={'bold'}>Subscribe</Typography>
                        <Typography>here are many variations of passages of Lorem Ipsum available</Typography>
                        <TextField
                            label="Your email address"
                            variant="outlined"
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: '4px',
                                marginBottom: 2,
                                width: '100%'
                            }}
                        />
                        <SubscribeButton variant="contained">Enviar</SubscribeButton>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            <FacebookIcon />
                            <TwitterIcon />
                            <LinkedInIcon />
                            <YouTubeIcon />
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                    <Typography variant="body2">Copyright © 2025 Partnecol All Rights Reserved.</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {/* <VisaIcon /> */}
                        {/* <DiscoverIcon /> */}
                    </Box>
                </Box>
            {/* </Container> */}
        </Box>
    );
};

export default Footer;