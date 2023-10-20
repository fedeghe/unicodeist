import { useState, useCallback } from 'react';
import { Dialog, Button } from '@mui/material';
import copy from 'copy-to-clipboard';

import CopyDone from '../../../CopyDone';
import useStyles from './styles';

const CopyDialog = ({visibility, setVisibility, embedCode, scriptCode}) => {
    const classes = useStyles(),
        [openConfirmation, setOpenConfirmation] = useState(false),        
        onClose = useCallback(
            () => setVisibility(false),
            [setVisibility]
        ),
        onCopyTag = useCallback(() => {
            copy(embedCode);
            onClose();
            setOpenConfirmation(true);
        }, [embedCode, onClose]),
        onCopyScript = useCallback(() => {
            copy(scriptCode);
            onClose();
            setOpenConfirmation(true);
        }, [scriptCode, onClose]);

    return (
        <>
            <Dialog open={visibility} onClose={onClose} disableRestoreFocus>
                <div className={classes.Dialog}>
                    <h3>HTML</h3>
                    <div className={classes.Code}>
                        <code>{embedCode}</code>
                    </div>
                    <Button variant="contained" onClick={onCopyTag}>Copy</Button>                    
                    <h3 className={classes.TopMargined}>SCRIPT</h3>
                    <div className={classes.Code}>
                        <code>{scriptCode}</code>
                    </div>
                    <Button variant="contained" onClick={onCopyScript}>Copy</Button>
                </div>
            </Dialog>
            {openConfirmation && <CopyDone message="Code copied to clipboard" onClose={onClose} open={openConfirmation} setOpen={setOpenConfirmation}/>}
        </>
    );
};
export default CopyDialog;