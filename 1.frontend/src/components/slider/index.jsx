



// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import Typography from '@mui/material/Typography'


// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 10,
//     width: '93%',
//     marginRight: 10,
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: theme.palette.grey[200],
//         ...theme.applyStyles('dark', {
//             backgroundColor: theme.palette.grey[800],
//         }),
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: '#1a90ff',
//         ...theme.applyStyles('dark', {
//             backgroundColor: '#308fe8',
//         }),
//     },
// }));

// export default function CustomizedProgressBars() {
//     return (
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <BorderLinearProgress variant="determinate" value={50} />
//             <Typography variant="body1" color="initial">50</Typography>
//         </Box>
//     );
// }


// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import Typography from '@mui/material/Typography';

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 10,
//     width: '93%',
//     marginRight: 10,
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: theme.palette.grey[200],
//         ...theme.applyStyles('dark', {
//             backgroundColor: theme.palette.grey[800],
//         }),
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: '#1a90ff',
//         ...theme.applyStyles('dark', {
//             backgroundColor: '#308fe8',
//         }),
//     },
// }));

// export default function CustomizedProgressBars() {
//     const value = 70; // Aquí puedes poner el valor que deseas mostrar

//     return (
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
//             <BorderLinearProgress variant="determinate" value={value} />
//             <Typography
//                 variant="body1"
//                 color="initial"
//                 sx={{
//                     position: 'absolute',
//                     left: `calc(${value}% - 12px)`, // Ajusta el valor para centrar el texto
//                     top: -20, // Ajusta la distancia vertical
//                     fontWeight: 'bold',
//                 }}
//             >
//                 {value}
//             </Typography>
//         </Box>
//     );
// }


// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
// import Typography from '@mui/material/Typography';


// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 14,
//     width: '100%',
//     borderRadius: 6,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: theme.palette.grey[200],
//         ...theme.applyStyles('dark', {
//             backgroundColor: theme.palette.grey[800],
//         }),
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 6,
//         backgroundColor: '#e52727',
//         ...theme.applyStyles('dark', {
//             backgroundColor: '#e52727',
//         }),
//     },
// }));

// export default function CustomizedProgressBars() {
//     const value = 70; // Aquí puedes poner el valor que deseas mostrar

//     return (
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
//             <BorderLinearProgress variant="determinate" value={value} />
//             <Typography
//                 variant="body1"
//                 color="initial"
//                 sx={{
//                     position: 'absolute',
//                     left: `calc(${value}% - 30px)`, // Ajusta el valor para centrar el texto
//                     top: -1.5, // Coloca el texto dentro de la barra
//                     width: 'auto',
//                     fontWeight: 'bold',
//                     color: '#fff', // Para que el texto se vea bien sobre la barra azul
//                     fontSize: 12
//                 }}
//             >
//                 {value}
//             </Typography>
//         </Box>
//     );
// }


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 14,
    width: '95%',
    borderRadius: 6,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 6,
        backgroundColor: '#e52727',
        ...theme.applyStyles('dark', {
            backgroundColor: '#e52727',
        }),
    },
}));

export default function Slider() {
    const value = 80; // Valor actual de la barra
    const maxValue = 100; // Valor máximo

    return (
        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', position: 'relative', width: '100%' }}>
            <BorderLinearProgress variant="determinate" value={(value / maxValue) * 100}  />
            <Typography
                variant="body1"
                color="initial"
                sx={{
                    position: 'absolute',
                    left: `calc(${(value / maxValue) * 100}% - 40px)`, // Ajusta el valor para centrar el texto sobre la barra
                    top: -1.5, // Coloca el texto dentro de la barra
                    width: 'auto',
                    fontWeight: 'bold',
                    color: '#fff', // Para que el texto se vea bien sobre la barra
                    fontSize: 12
                }}
            >
                {value}
            </Typography>
            <Typography
                variant="body1"
                color="initial"
                sx={{
                    position: 'absolute',
                    right: 0, // Coloca el valor máximo en el lado derecho de la barra
                    top: -1.5,
                    fontWeight: 'bold',
                    color: '#000', // Para que el texto se vea bien sobre la barra
                    fontSize: 12
                }}
            >
                {maxValue}
            </Typography>
        </Box>
    );
}
