import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={action}
      />
  );
}

export default CopyDone