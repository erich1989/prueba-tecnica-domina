import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../contexts/shopContext';
import { Paper, Grid, Button, Typography, Divider, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import ModalAddPodruct from '../../components/admin/products/ModalAddProduct';
import TableProducts from '../../components/admin/products/TableProducts';
import actionProducts from '../../actions/products';

function Products() {
    const { myProducts, setMyProducts } = useContext(ShopContext);
    const [openModalAddProduct, setOpenModalAddProduct] = useState(false);

    useEffect(() => {
        requestProducts();
    }, [])

    const requestProducts = async () => {
        try {
            const { response, status } = await actionProducts.returnAllProducts();
            if (status === 200) {
                setMyProducts(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleOpenModalAddProduct = () => {
        setOpenModalAddProduct(true);
    }

    return (
        <>
            <Paper sx={{ p: 3, height: '100%' }}>
                <Grid container spacing={0}>
                    <Grid item xs={12} textAlign={'start'}>
                        <Typography variant="h5" color="initial">Productos</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign={'start'} sx={{ my: 2.5 }}>
                        <Divider />
                    </Grid>
                    <Grid item xs={9} textAlign={'start'}>
                        <Button
                            variant="contained"
                            color="error"
                            endIcon={<AddCircleIcon />}
                            onClick={handleOpenModalAddProduct}
                            sx={{ mr: 1.5 }}
                        >
                            Producto
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
                        <TextField
                            id=""
                            label="Buscar página"
                            //   value={}
                            //   onChange={}
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12} textAlign={'start'} sx={{ my: 2.5 }}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <TableProducts products={myProducts} />
                    </Grid>

                    {/* {progress &&
                    <Grid item xs={12}>
                        <LinearProgress color="error" />
                    </Grid>
                }

                {!progress &&
                    <Grid item xs={12}>
                        <TablePages headers={tableHeader} rows={myPages} />
                    </Grid>
                } */}

                </Grid>
            </Paper>
            <ModalAddPodruct open={openModalAddProduct} setOpen={setOpenModalAddProduct} />
        </>

    );

}

export default Products;