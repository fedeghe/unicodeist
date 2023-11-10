/* eslint-disable no-unused-vars */
import { useCallback, useState, useContext } from 'react';
import {
    Dialog, DialogTitle, DialogContent,
    Button, Tooltip,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import SnackMessage from 'src/cmp/SnackMessage';

import useStyles from './styles';

import {
    DEFAULT_ADDITIONAL_STYLES
} from 'src/constants';

const AdditionalStylesEditor = ({ visibility, setVisibility }) => {
    const classes = useStyles(),
        {
            dispatch,
            state: {
                symbols,
                focusedSymbolId,
                fullscreen
            }
        } = useContext(ctx),
        additionalStyles = symbols.find(sym =>sym.id === focusedSymbolId).additionalStyles,
        [value, setValue] = useState(additionalStyles || DEFAULT_ADDITIONAL_STYLES),
        [confirmationVisibility, setConfirmationVisibility] = useState(false),
        [confirmationMessage, setConfirmationMessage] = useState(''),
        reset = () => {
            setValue(DEFAULT_ADDITIONAL_STYLES);
        },
        onChangeValue = useCallback(val => setValue(val), []),
        onClose = useCallback(
            (e, reason) => {
                // prevent close on click out
                if (reason && reason === "backdropClick") return;
                setVisibility(false);
                setTimeout(reset, 1000);
            },
            [setVisibility]
        ),
        onSave = () => {
            dispatch({
                type: ACTIONS.UPDATE_SYMBOL,
                payload: {
                    field: 'additionalStyles',
                    value
                }
            }); 
            onClose();
        },
        onKeyDown = useCallback(e => {
            if (!fullscreen && e.key === 'Escape') {
                onClose();
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        }, [fullscreen]);

    return (
        <Dialog
            open={visibility}
            onClose={onClose}
            disableRestoreFocus
            onKeyDown={onKeyDown}
            disableEscapeKeyDown
        >
            <DialogTitle className={classes.Head}>
                <div>Additional styles Editor</div>
                <div>
                    <Tooltip title="close" className={classes.CloseIcon}>
                        <CloseIcon onClick={onClose} fontSize="large" />
                    </Tooltip>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className={classes.Container}>
                    <div className={classes.Editor1}>
                        <CodeMirror
                            extensions={[css()]}
                            value={value}
                            height="200px"
                            width="500px"
                            theme="dark"
                            onChange={onChangeValue}
                        />
                    </div>
                    <div className={classes.Bottom}>
                        <Tooltip title="close keyFrames editor">
                            <Button onClick={onClose} color="error">Close</Button>
                        </Tooltip>
                        <Button  color="success" onClick={onSave}>Apply & close</Button>
                    </div>
                </div>
                <SnackMessage message={confirmationMessage} open={confirmationVisibility} setOpen={setConfirmationVisibility} />
            </DialogContent>
        </Dialog>
    );
};
export default AdditionalStylesEditor;