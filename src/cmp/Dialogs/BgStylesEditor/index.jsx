import { useCallback, useState, useContext } from 'react';
import {
    Dialog, DialogTitle, DialogContent,
    Button, Tooltip, Alert
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import CodeMirror from '@uiw/react-codemirror';
import { color } from '@uiw/codemirror-extensions-color';
import { css } from '@codemirror/lang-css';
import { githubLight } from '@uiw/codemirror-theme-github';
import { darcula } from '@uiw/codemirror-theme-darcula';
import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';

import useStyles from './styles';

import {
    DEFAULTS,
} from 'src/constants';

const BgStylesEditor = ({ visibility, setVisibility }) => {
    const classes = useStyles(),
        {
            dispatch,
            state: {
                bgStyles,
                fullscreen,
                themeKey
            }
        } = useContext(ctx),
        themes = {
            light : githubLight,
            dark: darcula
        },

        [value, setValue] = useState(bgStyles || DEFAULTS.TPLS.BG_STYLES),
        reset = () => {
            setValue(DEFAULTS.TPLS.BG_STYLES);
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
                type: ACTIONS.UPDATE_GLOBAL,
                payload: {
                    field: 'bgStyles', value
                }
            });
            onClose();
            // showConfirmation('done');
        },
        onKeyDown = useCallback(e => {
            if (!fullscreen && e.key === 'Escape') {
                onClose();
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        }, [fullscreen, onClose]);

    return (
        <Dialog
            open={visibility}
            onClose={onClose}
            disableRestoreFocus
            onKeyDown={onKeyDown}
            disableEscapeKeyDown
        >
            <DialogTitle className={classes.Head}>
                <div>Background styles Editor</div>
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
                            extensions={[color, css()]}
                            value={value}
                            height="50vh"
                            width="50vw"
                            theme={themes[themeKey]}
                            onChange={onChangeValue}
                        />
                    </div>
                    <Alert severity="warning" style={{ width: '90%' }}>
                        Some css rule may not work, for example using background encoded images
                    </Alert>
                    <div className={classes.Bottom}>
                        <Tooltip title="close editor">
                            <Button onClick={onClose} color="error">Close</Button>
                        </Tooltip>
                        <Button  color="success" onClick={onSave}>Apply & close</Button>
                    </div>
                </div>
            </DialogContent>
            {/* <DialogActions>
                <div className={classes.Bottom}>
                    <Tooltip title="close editor">
                        <Button onClick={onClose} color="error">Close</Button>
                    </Tooltip>
                    <Button  color="success" onClick={onSave}>Apply & close</Button>
                </div>
            </DialogActions> */}
        </Dialog>
    );
};
export default BgStylesEditor;