import { useCallback, useState, useContext } from 'react';
import {
    Dialog, DialogTitle, DialogContent,
    Button, TextField, Tooltip,
    Select, MenuItem,
    SpeedDial, SpeedDialAction, 
} from '@mui/material';

import {
    Settings as SettingsIcon,
    FileUpload as FileUploadIcon,
    GetApp as GetAppIcon,
    Close as CloseIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';

import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import ctx from 'src/Context';


import useStyles from './styles';

import { saveAsFileJSON, importFromFile, downloadAs } from 'src/utils';
import ACTIONS from 'src/reducer/actions';
import SnackMessage from 'src/cmp/SnackMessage';
import {
    DEFAULTS,
    UNSELECTED,
} from 'src/constants';

const KeyEditorDialog = ({ visibility, setVisibility }) => {
    const classes = useStyles(),
        {
            dispatch,
            state: {
                keyFrames,
                focusedSymbolId,
                symbols,
                fullscreen
            }
        } = useContext(ctx),
        // list all used keyframes
        usedKeyFrames = Object.keys(keyFrames).filter(k => symbols.some(s => s.additionalStyles.includes(` ${k} `))),
        
        // check if the current focused symbol uses a keyframe
        focusedSymbol = focusedSymbolId ? symbols.find(s => s.id === focusedSymbolId) : false,
        maybeSymbolUsesKeyframe = focusedSymbol
            ? Object.keys(keyFrames).find(k => focusedSymbol.additionalStyles.includes(` ${k} `))
            : false,
        // and in case preselect it
        [keyFrame, setKeyFrame] = useState(maybeSymbolUsesKeyframe ? keyFrames[maybeSymbolUsesKeyframe] : DEFAULTS.TPLS.KEYFRAMES),
        [selected, setSelected] = useState(maybeSymbolUsesKeyframe || UNSELECTED),
        [name, setName] = useState(maybeSymbolUsesKeyframe || ''),
        [confirmationVisibility, setConfirmationVisibility] = useState(false),
        [confirmationMessage, setConfirmationMessage] = useState(''),
        reset = () => {
            setName('');
            setSelected(UNSELECTED);
        },
        onClose = useCallback(
            (e, reason) => {
                // prevent close on click out
                if (reason && reason === "backdropClick") return;
                setVisibility(false);
                setTimeout(reset, 1000);
            },
            [setVisibility]
        ),
        getKeyFrameName = kf => {
            const n = kf.match(/@keyframes\s([a-zA-Z0-9_-]*\s?)\{.*/);
            return n ? n[1] : false;
        },
        onChangeKeyFrame = useCallback(val => {
            const n = getKeyFrameName(val);
            if (n) setName(n);
            setKeyFrame(val);
        }, []),
        loadKeyFrame = e => {
            const v = e.target.value;
            if (v !== UNSELECTED) {
                setName(v);
                setKeyFrame(keyFrames[v]);
                setSelected(v);
            } else {
                reset();
            }
        },
        onSave = () => {
            dispatch({
                type: ACTIONS.UPDATE_KEY_FRAME,
                payload: {
                    name, keyFrame
                }
            });
            showConfirmation(updating ? 'updated' : 'saved');
            !updating && reset();
        },
        onDelete = () => {
            dispatch({
                type: ACTIONS.REMOVE_KEY_FRAME,
                payload: {
                    name
                }
            });
            showConfirmation('deleted');
            setSelected(UNSELECTED);
            reset();
        },
        onDeleteAll = () => {
            dispatch({ type: ACTIONS.REMOVE_ALL_KEY_FRAMES });
            showConfirmation('all deleted');
            setSelected(UNSELECTED);
            reset();
        },
        onName = e => {
            const n = e.target.value;
            setName(n);
            setKeyFrame(keyFrame.replace(/@keyframes\s.*\s?\{/, `@keyframes ${n}{`));
        },
        onKeyDown = useCallback(e => {
            if (!fullscreen && e.key === 'Escape') {
                onClose();
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        }, [fullscreen, onClose]),
        showConfirmation = useCallback(msg => {
            setConfirmationMessage(msg);
            setConfirmationVisibility(true);
        }, []),
        keyFramesKeys = Object.keys(keyFrames),
        updating = keyFramesKeys.includes(name),
        hasKeyFrames = keyFramesKeys.length;
    return (
        <Dialog
            open={visibility}
            onClose={onClose}
            disableRestoreFocus
            onKeyDown={onKeyDown}
            disableEscapeKeyDown
        >
            <DialogTitle className={classes.Head}>
                <div style={{width:'60px'}}>
                    <SpeedDial
                        sx={{ position: 'absolute', top: 10, left: 10 }}
                        icon={<SettingsIcon />}
                        ariaLabel="keyFrames editor"
                        direction="right"
                    >
                        {[
                            hasKeyFrames && {
                                title: "clear all existing key frames",
                                icon: <DeleteIcon />,
                                onClick: onDeleteAll
                            },
                            {
                                title: "import",
                                icon: <GetAppIcon />,
                                onClick: () => importFromFile({
                                    onContentReady: cnt => 
                                        dispatch({
                                            type: ACTIONS.IMPORT_KEYFRAMES,
                                            payload: cnt
                                        })
                                })
                            },
                            hasKeyFrames && {
                                title: "export",
                                icon: <FileUploadIcon />,
                                onClick: () => saveAsFileJSON({what: keyFrames})
                                    .then(downloadAs('keyframes.json'))
                            }
                        ].filter(Boolean)
                        .map(action => <SpeedDialAction
                            key={action.title}
                            icon={action.icon}
                            tooltipTitle={action.title}
                            onClick={action.onClick}
                        />)}
                    </SpeedDial>
                </div>
                <div>KeyFrames Editor</div>
                <div>
                    <Tooltip title="close" className={classes.CloseIcon}>
                        <CloseIcon onClick={onClose} fontSize="large" />
                    </Tooltip>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className={classes.Container}>
                    {Boolean(hasKeyFrames) && (
                        <div className={classes.Selector}>
                            <span>Available:</span>
                            <Select onChange={loadKeyFrame} value={selected}>
                                <MenuItem value={UNSELECTED}>select an existing one</MenuItem>
                                {Object.keys(keyFrames).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
                            </Select>
                        </div>
                    )}
                    <TextField required label="Name it" variant="standard" value={name} onInput={onName} />
                    <div className={classes.Editor1}>
                        <CodeMirror
                            extensions={[css()]}
                            value={keyFrame}
                            height="200px"
                            width="500px"
                            theme="dark"
                            onChange={onChangeKeyFrame}
                        />
                    </div>
                    <div className={classes.Bottom}>
                        <Tooltip title="close editor">
                            <Button onClick={onClose} color="error">Close</Button>
                        </Tooltip>
                        {updating && <Button color="warning" disabled={usedKeyFrames.includes(name)} onClick={onDelete}>Delete</Button>}
                        <Button disabled={!name} color="success" onClick={onSave}>{updating ? "Update" : "Save"}</Button>
                    </div>
                </div>
                <SnackMessage message={confirmationMessage} open={confirmationVisibility} setOpen={setConfirmationVisibility} />
            </DialogContent>
        </Dialog>
    );
};
export default KeyEditorDialog;