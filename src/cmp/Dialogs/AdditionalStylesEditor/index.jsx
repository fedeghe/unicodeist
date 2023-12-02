import { useCallback, useState, useContext } from 'react';
import {
    Dialog, DialogTitle, DialogContent,
    Button, Tooltip, Alert, Chip
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';

import useStyles from './styles';

import {
    DEFAULTS,
} from 'src/constants';

const AdditionalStylesEditor = ({ visibility, setVisibility }) => {
    const classes = useStyles(),
        {
            dispatch,
            state: {
                symbols,
                focusedSymbolId,
                fullscreen,
                keyFrames
            }
        } = useContext(ctx),
        additionalStyles = symbols.find(sym => sym.id === focusedSymbolId).additionalStyles,
        [value, setValue] = useState(additionalStyles || DEFAULTS.TPLS.ADDITIONAL_STYLES),
        reset = () => {
            setValue(DEFAULTS.TPLS.ADDITIONAL_STYLES);
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
        }, [fullscreen]),
        keyFrameNames = Object.keys(keyFrames),
        keyFramesNum = keyFrameNames.length;
    
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
                    {Boolean(keyFramesNum) && <Alert severity="info" style={{ width: '90%' }}>
                        {keyFramesNum} `keyframe{keyFramesNum > 1 ? 's' : ''}` can be used : {keyFrameNames.map(kf => <Chip key={kf} label={kf}/>)}
                    </Alert>}
                    <br />
                    <Alert severity="warning" style={{ width: '90%' }}>
                        Some css rule may not work, for example using background encoded images.<br/>
                        All the css rules inplied by the usage of the setters in the symbol panel will <strong>not</strong> be overriden by any rule specified here, if for example hereby one attempts to set the `transform: scale(23)` this will have no effect.
                    </Alert>
                    <div className={classes.Bottom}>
                        <Tooltip title="close editor">
                            <Button onClick={onClose} color="error">Close</Button>
                        </Tooltip>
                        <Button color="success" onClick={onSave}>Apply & close</Button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};
export default AdditionalStylesEditor;