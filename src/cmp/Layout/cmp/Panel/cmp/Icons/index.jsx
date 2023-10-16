/* eslint-disable no-unused-vars */
import { useCallback, useContext, useState, useRef } from 'react';

import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';

import Channel from '@fedeghe/channeljs';

import CopyDone from '../../../Main/cmp/CopyDone';
import ThemeSwitch from '../../../../../ThemeSwitch';
import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';
import { importFromFile } from './../../../../../../utils';
import useStyles from './styles';


const Icons = () => {
    const { state, dispatch } = useContext(ctx),
        [open, setOpen] = useState(false),
        handleOpen = () => setOpen(true),
        handleClose = () => setOpen(false),
        { themeKey, error } = state,
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
        removeError = e => dispatch({type: ACTIONS.REMOVE_ERROR}),
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
            name: `switch to ${{bright:'dark', dark:'bright'}[themeKey]} theme`,
            icon: <ThemeSwitch onChange={handleClose}/>,
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
        {error && <CopyDone message={error} open={error} setOpen={removeError}/>}
    </>;
};

export default Icons;