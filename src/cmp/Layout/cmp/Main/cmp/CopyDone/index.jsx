import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { CLOSE_TOAST_TIMEOUT } from './../../../../../../constants';

const  CopyDone = ({message, open, setOpen, onClose = () => {}}) =>  {
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
    setOpen(false);
  };

  const action = (
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
        autoHideDuration={CLOSE_TOAST_TIMEOUT}
        onClose={handleClose}
        message={message}
        action={action}
      />
  );
};

export default CopyDone;