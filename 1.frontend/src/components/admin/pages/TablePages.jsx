// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

// export default function TableStickyHeader() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ModalEditPage from './ModalEditPage';
import ModalEditSection from './ModalEditSection';
import actionSetions from '../../../actions/sections';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [progress, setProgress] = React.useState(false);
    const [openModalEditPage, setOpenModalEditPage] = React.useState(false);
    const [openModalEditSection, setOpenModalEditSection] = React.useState(false);
    const [infoPage, setInfoPge] = React.useState({});
    const [sections, setSections] = React.useState([]);
    const [infoSection, setInfoSection] = React.useState({});

    const handleOpenModal = () => {

        setInfoPge(row);
        setOpenModalEditPage(true);
    }

    const handleOpenModalEditSection = (mySection) => {
        console.log(mySection)
        setInfoSection(mySection);
        setOpenModalEditSection(true);
    }

    const requestAllSections = async (data) => {
        try {
            setProgress(true);
            const { response, status } = await actionSetions.returnAllSection(data);
            if (status === 200) {
                // console.log(response)
                setSections(response);
                setProgress(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenRow = (pageId) => {
        setOpen(!open)

        if (open === false) {
            const data = { pageId: pageId };
            requestAllSections(data);
        }
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleOpenRow(row._id)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="left">
                    {`/${row.link}`}
                </TableCell>
                <TableCell align="left">
                    {row.description}
                </TableCell>
                <TableCell align="left">
                    {row.state === true ? 'activa' : 'inactiva'}
                </TableCell>
                <TableCell align="left">
                    <IconButton
                        color="error"
                        onClick={handleOpenModal}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Secciones {row.name}
                            </Typography>
                            {progress &&
                                <LinearProgress color="error" />
                            }

                            {!progress &&
                                <TableContainer component={Paper}>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Acción</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {sections.map((section) => (
                                                <TableRow key={section._id} hover>
                                                    <TableCell component="th" scope="row">
                                                        {section.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {section.description}
                                                    </TableCell>
                                                    <TableCell>
                                                        {section.state ? 'Activa' : 'inactiva'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => handleOpenModalEditSection(section)}
                                                            sx={{ color: 'black' }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="delete">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <ModalEditPage open={openModalEditPage} setOpen={setOpenModalEditPage} page={infoPage} />
            <ModalEditSection open={openModalEditSection} setOpen={setOpenModalEditSection} section={infoSection} setSection={setSections} />
        </React.Fragment>
    );
}

export default function TablePages({ headers = [], rows = [] }) {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 640 }}>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        {headers.map((head) => (
                            <TableCell
                                key={head.id}
                                align="left"
                                sx={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}
                            >
                                {head.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    );
}