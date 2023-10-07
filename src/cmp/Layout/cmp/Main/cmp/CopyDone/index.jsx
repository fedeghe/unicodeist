import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const  CopyDone = ({message, onClose = () => {}}) =>  {
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={action}
      />
  );
}

export default CopyDone