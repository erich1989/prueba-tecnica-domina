import * as React from 'react';
import { SuperAdminContext } from '../../contexts/superAdmin';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertTwo() {
    const { openAlert, setOpenAlert, messageAlert } = React.useContext(SuperAdminContext);

    const handleClose = () => {
        setOpenAlert(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%', zIndex: 2500 }}>
            <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {messageAlert}
                </Alert>
            </Snackbar>
        </Stack>
    );
}