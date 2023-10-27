import { useContext, useState } from 'react';
import {
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Tooltip,
    Checkbox
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import FiberNewIcon from '@mui/icons-material/FiberNew';

import Channel from '@fedeghe/channeljs';


import SnackMessage from 'src/cmp/SnackMessage';


import ThemeSwitch from 'src/cmp/ThemeSwitch';
import { THEMES } from 'src/constants';
import ctx from 'src/Context';

import ACTIONS from 'src/reducer/actions';
import { importFromFile } from 'src/utils';
import useStyles from './styles';


const Icons = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(ctx),
        [open, setOpen] = useState(false),
        handleOpen = () => setOpen(true),
        handleClose = () => setOpen(false),
        { backgroundColor, error, themeKey, backgroundColorAlpha } = state,
        embed = () => {
            handleClose();
            Channel.get('event').pub('embed');
        },
        exportImage = () => {
            handleClose();
            Channel.get('event').pub('exportImage');
        },
        importState = () => {
            handleClose();
            importFromFile({
                onContentReady: cnt => dispatch({
                    type: ACTIONS.IMPORT,
                    payload: cnt
                })
            });
        },
        contribute = () => Channel.get('event').pub('contribute'),
        updateBackgroundColor = e => dispatch({
            type: ACTIONS.UPDATE_GLOBAL,
            payload: {
                field: 'backgroundColor',
                value :e.target.value
            }
        }),
        newCreativity = () => dispatch({type: ACTIONS.NEW}),
        removeError = () => dispatch({type: ACTIONS.REMOVE_ERROR}),
        toggleAlpha = () => dispatch({
            type: ACTIONS.UPDATE_GLOBAL,
            payload: {field:'backgroundColorAlpha', value: !backgroundColorAlpha }
        }),
        actions = [{
            name: 'import',
            icon: <GetAppIcon />,
            onClick: importState
        },{
            name: 'export',
            icon: <FileUploadIcon />,
            onClick: exportImage
        },{
            name: 'embed',
            icon: <CodeRoundedIcon />,
            onClick: embed
        }];

    return <>
        <SpeedDial
            ariaLabel="actions"
            direction='left'
            sx={{ position: 'absolute', top: 30, right: 26 }}
            icon={<SpeedDialIcon icon={<SettingsIcon/>}/>}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick || handleClose}
                />
            ))}
        </SpeedDial>
        <div className={classes.UnderLogo}>
            <Tooltip title="contribute">
                <GitHubIcon onClick={contribute}/>
            </Tooltip>
            <Tooltip title="New creativity">
                <FiberNewIcon className={classes.Pointer} onClick={newCreativity}/>
            </Tooltip>
            <div className={classes.Separator}/>
            <Tooltip title="change background color">
                <input className={[classes.Pointer, classes.ColorPicker].join(' ')} value={backgroundColor} type="color" onChange={updateBackgroundColor} />
            </Tooltip>
            <Tooltip title={`toggle background transparency ${backgroundColorAlpha ? 'OFF' : 'ON'}`}>
                <Checkbox className={classes.BgAlpha} checked={backgroundColorAlpha} onChange={toggleAlpha}/>
            </Tooltip>
            <ThemeSwitch onChange={handleClose} tooltip={`switch to ${themeKey === THEMES.bright ? THEMES.dark : THEMES.bright} theme`}/>
        </div>
        {error && <SnackMessage message={error} open={error} setOpen={removeError}/>}
    </>;
};

export default Icons;