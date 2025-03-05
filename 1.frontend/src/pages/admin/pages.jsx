import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../../contexts/shopContext';
import { Paper, Grid, TextField, Button, Typography, Divider, LinearProgress, Box, Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FaceIcon from '@mui/icons-material/Face';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteIcon from '@mui/icons-material/Delete';

import TablePages from '../../components/admin/pages/TablePages';
import ModalAddPage from '../../components/admin/pages/ModalAddPage';
import ModalEditPage from '../../components/admin/pages/ModalEditPage';
import ModalDeletePage from '../../components/admin/pages/ModalDeletePage';
import ModalAddSection from '../../components/admin/pages/ModalAddSection';
import actionPages from '../../actions/pages';

function PagesAdmin() {
    const { myPages, setMyPages } = useContext(ShopContext);
    const [openModalAddPage, setOpenModalAddPage] = useState(false);
    const [openModalEditPage, setOpenModalEditPage] = useState(false);
    const [openModalDeletePage, setOpenModalDeletePage] = useState(false);
    const [infoPage, setInfoPage] = useState({});

    const [openModalAddSection, setOpenModalAddSection] = useState(false);
    const [progress, setProgres] = useState(false);

    const tableHeader = [
        { id: 'one', name: '' },
        { id: 'two', name: 'Nombre' },
        { id: 'three', name: 'Link' },
        { id: 'four', name: 'Descripción' },
        { id: 'five', name: 'Estado' },
        { id: 'six', name: 'Acción' },
    ];

    function handleEditPage(page) {
        setInfoPage(page);
        setOpenModalEditPage(true);
    };

    function handleDeletePage(page) {
        setInfoPage(page);
        setOpenModalDeletePage(true);
    };

    const requestAllPages = async () => {
        try {
            setProgres(true);
            const data = {};
            const { response, status } = await actionPages.returnAllPages(data);
            if (status === 200) {
                setMyPages(response);
                setProgres(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        requestAllPages();
    }, []);

    return (
        <>
            <Paper sx={{ p: 3, height: '100%' }}>
                <Grid container spacing={0}>
                    <Grid item xs={12} textAlign={'start'}>
                        <Typography variant="h5" color="initial">Mis tareas</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign={'start'} sx={{ my: 2.5 }}>
                        <Divider />
                    </Grid>
                    <Grid item xs={9} textAlign={'start'}>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<AddCircleIcon />}
                            onClick={() => setOpenModalAddPage(true)}
                            sx={{ mr: 1.5 }}
                        >
                            Nueva tarea
                        </Button>
                        {/* <Button
                            variant="contained"
                            color="error"
                            endIcon={<AddCircleIcon />}
                            onClick={() => setOpenModalAddSection(true)}
                        >
                            Sección
                        </Button> */}
                    </Grid>
                    <Grid item xs={3}>
                        {/* <TextField
                            id=""
                            label="Buscar página"
                            //   value={}
                            //   onChange={}
                            fullWidth
                            size='small'
                        /> */}
                    </Grid>
                    <Grid item xs={12} textAlign={'start'} sx={{ my: 2.5 }}>
                        <Divider />
                    </Grid>

                    {progress &&
                        <Grid item xs={12}>
                            <LinearProgress color="primary" />
                        </Grid>
                    }

                    {!progress &&
                        <Grid container spacing={3}>
                            {myPages.map((page, index) => (
                                <Grid item xs={3} key={index}>
                                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, boxShadow: 4, backgroundColor: '#fafafa' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
                                            {page.name}
                                        </Typography>

                                        <Box sx={{
                                            p: 2,
                                            mb: 2,
                                            border: '1px solid #ddd',
                                            borderRadius: 1,
                                            boxShadow: 1,
                                            backgroundColor: '#fff',
                                            transition: 'box-shadow 0.3s ease',
                                            '&:hover': {
                                                boxShadow: 3,
                                            }
                                        }}>
                                            <Typography variant="body1" textAlign={'letf'} sx={{ color: '#555' }}>
                                                {page.description}
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ mb: 2 }} />

                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666' }}>

                                            {page.state
                                                ?
                                                <Chip
                                                    icon={<FaceIcon />}
                                                    label="Activo"
                                                    color="success"
                                                />
                                                :
                                                <Chip
                                                    icon={<FaceIcon />}
                                                    label="Inactivo"
                                                    color="warning"
                                                />
                                            }
                                        </Typography>

                                        <Divider sx={{ my: 2 }} />

                                        {/* Agregar botones si es necesario */}
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                endIcon={<EditCalendarIcon />}
                                                onClick={() => handleEditPage(page)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                endIcon={<DeleteIcon />}
                                                onClick={() => handleDeletePage(page)}
                                            >
                                                Eliminar
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))
                            }
                        </Grid>
                    }
                </Grid>
            </Paper>
            <ModalAddPage open={openModalAddPage} setOpen={setOpenModalAddPage} />
            <ModalEditPage open={openModalEditPage} setOpen={setOpenModalEditPage} page={infoPage} />
            <ModalDeletePage open={openModalDeletePage} setOpen={setOpenModalDeletePage} page={infoPage} />
            <ModalAddSection open={openModalAddSection} setOpen={setOpenModalAddSection} />
        </>
    );
}

export default PagesAdmin;