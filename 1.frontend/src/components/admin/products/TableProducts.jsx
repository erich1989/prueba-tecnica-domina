import React, { useContext } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import Slider from '../../slider';

const columns = [
    {
        id: 'name',
        label: 'Nombre',
        // minWidth: 170
    },
    {
        id: 'image',
        label: 'Imagen',
        // minWidth: 100,
        align: 'center',
    },
    {
        id: 'price',
        label: 'Precio regular',
        // minWidth: 170,
        align: 'center',
    },
    {
        id: 'stock',
        label: 'Inventario',
        // minWidth: 170,
        align: 'center',
    },
    {
        id: 'action',
        label: 'Acciones',
        // minWidth: 170,
        align: 'center',
    },
];

export default function TableProducts({ products }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let rows = products;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 280 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        <TableCell align='left'>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <img
                                                src={row.media.images[0]}
                                                style={{ width: '100px', height: 'auto', borderRadius: 5 }}
                                            />
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.prices.regular_price}
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Slider />
                                        </TableCell>
                                        <TableCell align='center'>
                                            <IconButton aria-label="show" color='error'>
                                                <VisibilityIcon sx={{ color: 'black' }} />
                                            </IconButton>
                                            <IconButton aria-label="edit" color='error'>
                                                <EditIcon sx={{ color: 'black' }} />
                                            </IconButton>
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
