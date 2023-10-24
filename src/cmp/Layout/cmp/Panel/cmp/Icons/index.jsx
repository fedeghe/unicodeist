import { useContext, useState } from 'react';
import {
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import GitHubIcon from '@mui/icons-material/GitHub';

import Channel from '@fedeghe/channeljs';


import SnackMessage from '../../../../../SnackMessage';

import ThemeSwitch from '../../../../../ThemeSwitch';
import ctx from './../../../../../../Context';

import ACTIONS from './../../../../../../reducer/actions';
import { importFromFile } from './../../../../../../utils';
import useStyles from './styles';


const Icons = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(ctx),
        [open, setOpen] = useState(false),
        handleOpen = () => setOpen(true),
        handleClose = () => setOpen(false),
        { backgroundColor, error } = state,
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
        removeError = () => dispatch({type: ACTIONS.REMOVE_ERROR}),
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
        },{
            name: 'contribute',
            icon: <GitHubIcon />,
            onClick: contribute
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
            <input style={{width:'28px'}} value={backgroundColor} type="color" onChange={updateBackgroundColor} />
            <ThemeSwitch onChange={handleClose}/>
        </div>
        {error && <SnackMessage message={error} open={error} setOpen={removeError}/>}
    </>;
};

export default Icons;