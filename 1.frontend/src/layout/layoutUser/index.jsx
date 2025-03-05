import React, { useContext } from "react";
import { ShopContext } from "../../contexts/shopContext";
import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";

import Loader from "../../components/loader/loader";

function LayoutUser() {
    const { openLoader } = useContext(ShopContext)
    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12} lg={12} xl={12}>
                    <Box component="main" id="detail" >
                        <Outlet />
                    </Box>
                </Grid>
            </Grid>
            <Loader open={openLoader} />
        </>
    );
}

export default LayoutUser;