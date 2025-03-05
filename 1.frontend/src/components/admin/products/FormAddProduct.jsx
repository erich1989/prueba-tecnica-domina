import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../../../contexts/shopContext';
import { Paper, TextField, Grid, Typography, Button, Switch, Stack, Divider } from '@mui/material';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CircularProgress from '@mui/material/CircularProgress';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import ModalAddPage from '../pages/ModalAddPage';
import ModalAddSection from '../pages/ModalAddSection';
import ModalAddCategory from '../categories/ModalAddCategory';
import ModalAddBrand from '../brands/ModalAddBrand';
import actionPages from '../../../actions/pages';
import actionSetions from '../../../actions/sections';
import actionCategories from '../../../actions/categories';
import actionBrands from '../../../actions/brands';
import actionProducts from '../../../actions/products';

function FormAddProduct() {
    const { myPages, setMyPages, mySections, setMySections,
        myCategories, setMyCategories, myBrands, setMyBrands, myProducts, setMyProducts } = useContext(ShopContext);
    const [openModalAddPage, setOpenModalAddPage] = useState(false);
    const [openModalAddSections, setOpenModalAddSections] = useState(false);
    const [openModalAddCategory, setOpenModalAddCategory] = useState(false);
    const [openModalAddBrand, setOpenModalAddBrand] = useState(false);
    const [laderSection, setLaderSection] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        model: '',
        pageId: '',
        sectionId: '',
        categoryId: '',
        brandId: '',
        description: '',
        prices: {
            regular_price: '',
            promotion_price: '',
            promotion_state: false,
        },
        inventory: {
            stock: '',
            sku: '',
            max_stock: '',
        },
        shelfLifeDates: {
            start: '',
            end: '',
            state: false,
        },
        media: {
            images: [],
            videos: ''
        },
        state: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    requestPages(),
                    requestCategories(),
                    requestBrands(),
                ]);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        if (myPages.length === 0 || myCategories.length === 0) {
            fetchData();
        }
    }, [mySections]);

    const requestPages = async () => {
        try {
            const { response, status } = await actionPages.returnAllPages();
            if (status === 200) {
                setMyPages(response);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const requestSections = async (pageId) => {
        try {
            setLaderSection(true);
            const data = { pageId: pageId }
            const { response, status } = await actionSetions.returnAllSection(data);
            if (status === 200) {
                setMySections(response);
                setLaderSection(false);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const requestCategories = async () => {
        try {
            const { response, status } = await actionCategories.returnAllCategories();
            if (status === 200) {
                setMyCategories(response);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const requestBrands = async () => {
        try {
            const { response, status } = await actionBrands.returnAllBrands();
            if (status === 200) {
                setMyBrands(response);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const requestCreateProduct = async (data) => {
        try {
            const { response, status } = await actionProducts.createProduct(data);
            if (status === 200) {
                console.log(response);
                setMyProducts(response);
                // setLaderSection(false);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputValues = (e) => {
        const { name, value, checked } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: name === 'state' ? checked : value
        }))
    };

    const handleInputPageid = (e) => {
        const { name, value } = e.target;

        requestSections(value);
        setNewProduct(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    const handleDescriptionChange = (value) => {
        setNewProduct(prevState => ({
            ...prevState,
            description: value,
        }));
    };

    const handlePriceValues = (e) => {
        const { name, value, checked } = e.target;
        setNewProduct(prev => ({
            ...prev,
            prices: {
                ...prev.prices,
                [name]: name === 'promotion_state' ? checked : value
            }
        }))
    };

    const handleInventoryValues = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            inventory: {
                ...prev.inventory,
                [name]: name === 'sku' ? value : Number(value),
            }
        }))
    };

    const handleShelfLifeValues = (e) => {
        const { name, value, checked } = e.target;
        setNewProduct(prev => ({
            ...prev,
            shelfLifeDates: {
                ...prev.shelfLifeDates,
                [name]: name === 'state' ? checked : value
            }
        }))
    };

    const handleFileUpload = (file) => {
        // console.log(file.file.)
        const imageInfo = {
            name: file.filename, // Nombre del archivo
            size: file.fileSize, // Tamaño del archivo
            type: file.fileType, // Tipo de archivo (MIME type)
            source: file.file, // Objeto File (puedes usarlo para subir la imagen más tarde)
        };

        // Actualizar el estado con la nueva información de la imagen
        setNewProduct(prevState => ({
            ...prevState,
            media: {
                ...prevState.media,
                images: [...prevState.media.images, file.file], // Agregar la nueva imagen al array
            },
        }));
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            // Verifica que el archivo sea un tipo Blob o File
            if (file instanceof Blob || file instanceof File) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result); // Resuelve el Base64
                reader.onerror = (error) => reject(error);   // Rechaza en caso de error
            } else {
                reject('El archivo proporcionado no es un Blob o File');
            }
        });
    };

    const handleSubmit = async () => {
        try {
            // Convertir las imágenes a Base64
            const imagesBase64 = await Promise.all(
                newProduct.media.images.map((file) => convertImageToBase64(file))
            );

            // Crear el objeto con los datos del formulario y las imágenes en Base64
            const productData = {
                ...newProduct,
                media: {
                    ...newProduct.media,
                    images: imagesBase64, // Guardar las imágenes como Base64
                },
            };


            requestCreateProduct(productData);

            // console.log(productData)
            // // Enviar la solicitud al backend
            // const response = await fetch('http://localhost:5000/http/products', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(productData),
            // });

            // if (!response.ok) {
            //     throw new Error('Error al enviar la solicitud');
            // }

            // const data = await response.json();
            // console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Grid container spacing={0} sx={{ mt: 0, height: '95%' }}>
                <Grid item xs={4} >
                    <Paper sx={{ p: 3, mr: 3, height: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" color="initial">Información general</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    name='name'
                                    label="Nombre"
                                    value={newProduct.name}
                                    onChange={handleInputValues}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    name='model'
                                    label="Modelo"
                                    value={newProduct.model}
                                    onChange={handleInputValues}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={9}>
                                <FormControl fullWidth size='small' >
                                    <InputLabel id="demo-simple-select-label">Página</InputLabel>
                                    <Select
                                        name='pageId'
                                        value={newProduct.pageId}
                                        label="Página"
                                        onChange={handleInputPageid}
                                    >
                                        {
                                            myPages.map(page => (
                                                <MenuItem key={page._id} value={page._id}>{page.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <Button variant="contained" color="error" fullWidth onClick={() => setOpenModalAddPage(true)}>
                                    <AddCircleIcon />
                                </Button>
                            </Grid>

                            <Grid item xs={9}>
                                <FormControl fullWidth size='small'>
                                    <InputLabel id="demo-simple-select-label">Sección</InputLabel>
                                    <Select
                                        name='sectionId'
                                        value={newProduct.sectionId}
                                        label="Sección"
                                        onChange={handleInputValues}
                                    >
                                        {mySections.length === 0 && <MenuItem value=''>Página no tiene sección asociada</MenuItem>}
                                        {
                                            mySections.length > 0 && mySections.map(section => (
                                                <MenuItem key={section._id} value={section._id}>{section.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {laderSection ? <CircularProgress size="30px" color='error' /> :
                                    <Button variant="contained" fullWidth color="error" onClick={() => setOpenModalAddSections(true)}>
                                        <AddCircleIcon />
                                    </Button>
                                }
                            </Grid>

                            <Grid item xs={9}>
                                <FormControl fullWidth size='small' >
                                    <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                                    <Select
                                        name='categoryId'
                                        value={newProduct.categoryId}
                                        label="Categoría"
                                        onChange={handleInputValues}
                                    >
                                        {
                                            myCategories.map(category => (
                                                <MenuItem key={category._id} value={category._id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <Button variant="contained" color="error" fullWidth onClick={() => setOpenModalAddCategory(true)}>
                                    <AddCircleIcon />
                                </Button>
                            </Grid>

                            <Grid item xs={9}>
                                <FormControl fullWidth size='small' >
                                    <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                                    <Select
                                        name='brandId'
                                        value={newProduct.brandId}
                                        label="Marca"
                                        onChange={handleInputValues}
                                    >
                                        {
                                            myBrands.map(brand => (
                                                <MenuItem key={brand._id} value={brand._id}>
                                                    {brand.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <Button variant="contained" color="error" fullWidth onClick={() => setOpenModalAddBrand(true)} >
                                    <AddCircleIcon />
                                </Button>
                            </Grid>

                            <Grid item xs={12} sx={{ flexGrow: 1 }}>
                                <ReactQuill
                                    theme="snow"
                                    value={newProduct.description}
                                    onChange={handleDescriptionChange}
                                    style={{
                                        height: 'calc(100vh - 550px)',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={{ p: 3, mr: 3, height: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" color="initial">Precio</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    name='regular_price'
                                    label="Precio regular"
                                    value={newProduct.prices.regular_price}
                                    onChange={handlePriceValues}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    name='promotion_price'
                                    label="Precio promoción"
                                    value={newProduct.prices.promotion_price}
                                    onChange={handlePriceValues}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                <Typography variant="body1" color="initial" sx={{ m: 0, fontWeight: 'bold' }}>Estado promoción: </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                    <Typography>Off</Typography>
                                    <Switch
                                        inputProps={{ 'aria-label': 'ant design' }}
                                        color='error'
                                        checked={newProduct.prices.promotion_state}
                                        name='promotion_state'
                                        onChange={handlePriceValues}
                                    />
                                    <Typography>On</Typography>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sx={{ my: .7 }}>
                                <Divider />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h5" color="initial">Inventario</Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    type='text'
                                    name='sku'
                                    label="SKU"
                                    value={newProduct.inventory.sku}
                                    onChange={handleInventoryValues}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    type='number'
                                    name='stock'
                                    label="Stock"
                                    value={newProduct.inventory.stock}
                                    onChange={handleInventoryValues}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    type='number'
                                    name='max_stock'
                                    label="Stock máximo"
                                    value={newProduct.inventory.max_stock}
                                    onChange={handleInventoryValues}
                                    fullWidth
                                    size='small'
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ my: .7 }}>
                                <Divider />
                            </Grid>

                            <Grid item xs={8}>
                                <Typography variant="h5" color="initial">Vida útil</Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                <Typography variant="body1" color="initial" sx={{ m: 0, fontWeight: 'bold' }}>Estado de vida útil: </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                    <Typography>Off</Typography>
                                    <Switch
                                        inputProps={{ 'aria-label': 'ant design' }}
                                        color='error'
                                        checked={newProduct.shelfLifeDates.state}
                                        name='state'
                                        onChange={handleShelfLifeValues}
                                    />
                                    <Typography>On</Typography>
                                </Stack>
                            </Grid>
                            {newProduct.shelfLifeDates.state &&
                                <>
                                    <Grid item xs={6}>
                                        <TextField
                                            type='date'
                                            name='start'
                                            label="fecha de inicio"
                                            value={newProduct.shelfLifeDates.start}
                                            onChange={handleShelfLifeValues}
                                            fullWidth
                                            size='small'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            type='date'
                                            name='end'
                                            label="fecha de expiración"
                                            value={newProduct.shelfLifeDates.end}
                                            onChange={handleShelfLifeValues}
                                            fullWidth
                                            size='small'
                                        />
                                    </Grid>
                                </>
                            }
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={{ p: 3, mr: 3, height: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" color="initial">Multimedia</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FilePond
                                    allowMultiple={true}
                                    maxFiles={3}
                                    onaddfile={(error, file) => {
                                        if (!error) {
                                            // Llamar a la función para manejar el archivo
                                            handleFileUpload(file);
                                        }
                                    }}
                                    onremovefile={(error, file) => {
                                        if (!error) {
                                            // Filtrar y eliminar la imagen del estado cuando se remueve
                                            setNewProduct(prevState => ({
                                                ...prevState,
                                                media: {
                                                    ...prevState.media,
                                                    images: prevState.media.images.filter(
                                                        img => img.name !== file.filename
                                                    ),
                                                },
                                            }));
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" color="initial">Estado</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                    <Typography>Inactivo</Typography>
                                    <Switch
                                        name='state'
                                        color='error'
                                        checked={newProduct.state}
                                        onChange={handleInputValues}
                                    />
                                    <Typography>Activo</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sx={{ my: 3 }}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' variant="contained" color="error" fullWidth onClick={handleSubmit}>
                                    Crear
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <ModalAddPage open={openModalAddPage} setOpen={setOpenModalAddPage} />
            <ModalAddSection open={openModalAddSections} setOpen={setOpenModalAddSections} />
            <ModalAddCategory open={openModalAddCategory} setOpen={setOpenModalAddCategory} />
            <ModalAddBrand open={openModalAddBrand} setOpen={setOpenModalAddBrand} />
        </>
    );
}

export default FormAddProduct;