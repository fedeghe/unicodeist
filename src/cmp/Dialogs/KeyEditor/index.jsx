import { useCallback, useState, useContext } from 'react';
import {
    Dialog, DialogTitle, DialogContent,
    Button, TextField, Tooltip,
    Select, MenuItem,
    Alert,
    SpeedDial, SpeedDialAction, 
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import ctx from 'src/Context';


import useStyles from './styles';

import { uniqueID, saveAsFileJSON, importFromFile, downloadAs } from 'src/utils';
import ACTIONS from 'src/reducer/actions';
import SnackMessage from 'src/cmp/SnackMessage';
import {
    getBaseNamedKeyFrame,
    getBaseNamedAnimate,
    UNSELECTED
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
        getKeyName = () => `kf_${uniqueID}`,
        preselectedAnimation = symbols.find(s => s.id === focusedSymbolId)?.animation,
        preselected = preselectedAnimation in keyFrames ? keyFrames[preselectedAnimation] : {},

        keyName = getKeyName(),
        [keyFrame, setKeyFrame] = useState(preselected.keyFrame || getBaseNamedKeyFrame(keyName)),
        [animate, setAnimate] = useState(preselected?.animate || getBaseNamedAnimate(keyName)),
        [selected, setSelected] = useState(preselected.name || UNSELECTED),
        [name, setName] = useState(preselected.name || ''),
        [confirmationVisibility, setConfirmationVisibility] = useState(false),
        [confirmationMessage, setConfirmationMessage] = useState(''),
        reset = () => {
            const kn = getKeyName();
            setKeyFrame(getBaseNamedKeyFrame(kn));
            setAnimate(getBaseNamedAnimate(kn));
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
        onChangeKeyFrame = useCallback(val => setKeyFrame(val), []),
        onChangeAnimate = useCallback(val => setAnimate(val), []),
        loadKeyFrame = e => {
            const v = e.target.value;
            if (v !== UNSELECTED) {
                const { keyFrame: kf, animate: a } = keyFrames[v];
                setName(v);
                setAnimate(a);
                setKeyFrame(kf);
                setSelected(v);
            } else {
                reset();
            }
        },
        onSave = () => {
            dispatch({
                type: ACTIONS.UPDATE_KEY_FRAME,
                payload: {
                    name, keyFrame, animate
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
            reset();// setVisibility(false);
        },
        onName = e => {
            setName(e.target.value);
        },
        onKeyDown = useCallback(e => {
            if (!fullscreen && e.key === 'Escape') {
                onClose();
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        }, [fullscreen]),
        showConfirmation = msg => {
            setConfirmationMessage(msg);
            setConfirmationVisibility(true);
        },
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
                                icon: <DeleteForeverIcon />,
                                onClick: onDeleteAll
                            },
                            {
                                title: "import",
                                icon: <GetAppIcon />,
                                onClick: () => importFromFile({
                                    onContentReady: cnt => {
                                        dispatch({
                                            type: ACTIONS.IMPORT_KEYFRAMES,
                                            payload: cnt
                                        });
                                        setVisibility(false);
                                    }
                                })
                            },
                            hasKeyFrames && {
                                title: "export",
                                icon: <FileUploadIcon />,
                                onClick: () => saveAsFileJSON(keyFrames)
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
                            {selected !== name && selected !== UNSELECTED &&
                                <Alert className={classes.Hint} severity="warning">remember to update the animation-name in both to a valid unused one</Alert>
                            }
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
                    <div className={classes.Editor2}>
                        <CodeMirror
                            extensions={[css()]}
                            value={animate}
                            height="200px"
                            width="500px"
                            theme="dark"
                            onChange={onChangeAnimate}
                        />
                    </div>
                    <div className={classes.Bottom}>
                        <Tooltip title="close editor">
                            <Button onClick={onClose} color="error">Close</Button>
                        </Tooltip>
                        {updating && <Button color="warning" onClick={onDelete}>Delete</Button>}
                        <Button disabled={!name} color="success" onClick={onSave}>{updating ? "Update" : "Save"}</Button>
                    </div>
                </div>
                <SnackMessage message={confirmationMessage} open={confirmationVisibility} setOpen={setConfirmationVisibility} />
            </DialogContent>
        </Dialog>
    );
};
export default KeyEditorDialog;