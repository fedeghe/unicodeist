import {Snackbar, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { CLOSE_TOAST_TIMEOUT } from 'src/constants';

const SnackMessage = ({
    message, open, setOpen,
    onClose = () => { },
    autoHideDuration = CLOSE_TOAST_TIMEOUT
}) => {
    const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            onClose();
            setOpen(false);
        },
        action = (
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        );

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            message={message}
            action={action}
        />
    );
};

export default SnackMessage;