import Channeljs from '@fedeghe/channeljs';
import { useContext, useState, useEffect } from 'react';
import {
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Tooltip,
    Checkbox
} from '@mui/material';
import {
    BlurOff as BlurOffIcon,
    BlurOn as BlurOnIcon,
    CodeRounded as CodeRoundedIcon,
    FiberNew as FiberNewIcon,
    FileUpload as FileUploadIcon,
    Fullscreen as FullscreenIcon,
    FullscreenExit as FullscreenExitIcon,
    GetApp as GetAppIcon,
    GitHub as GitHubIcon,
    Key as KeyIcon,
    Replay as ReplayIcon,
    ReplayCircleFilled as ReplayCircleFilledIcon,
    Wallpaper as WallpaperIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';


import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import SnackMessage from 'src/cmp/SnackMessage';
import ThemeSwitch from 'src/cmp/ThemeSwitch';
import { THEMES } from 'src/constants';
import { importFromFile, openFullscreen, closeFullscreen } from 'src/utils';
import useStyles from './styles';


const Icons = () => {
    const { state, dispatch } = useContext(ctx),
        [open, setOpen] = useState(false),
        
        handleOpen = () => setOpen(true),
        handleClose = () => setOpen(false),
        { backgroundColor, error, themeKey, backgroundColorAlpha, preventReload, fullscreen } = state,
        classes = useStyles({backgroundColorAlpha}),
        setFullscreen = v => dispatch({
            type: ACTIONS.UPDATE_GLOBAL,
            payload: {
                field: 'fullscreen',
                value: v
            }
        }),
        embed = () => {
            handleClose();
            Channeljs.get('event').pub('embed');
        },
        exportImage = () => {
            handleClose();
            Channeljs.get('event').pub('exportImage');
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
        contribute = () => Channeljs.get('event').pub('contribute'),
        openBackgroundStyles = () => Channeljs.get('event').pub('backgrounStyles'),
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
        toggleReload = () => dispatch({
            type: ACTIONS.UPDATE_GLOBAL,
            payload: {field:'preventReload', value: !preventReload }
        }),
        showKeyEditor = () => Channeljs.get('event').pub('keyEditor'),
        toggleFullscreen = () => {
            (fullscreen ? closeFullscreen : openFullscreen)();
            setFullscreen(!fullscreen);
        },
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
            name:'contribute',
            icon: <GitHubIcon className={classes.Pointer} onClick={contribute}/> 
        }];
    useEffect(() => {
        function setHandler(){
            document.addEventListener('fullscreenchange', exitHandler, false);
            document.addEventListener('mozfullscreenchange', exitHandler, false);
            document.addEventListener('MSFullscreenChange', exitHandler, false);
            document.addEventListener('webkitfullscreenchange', exitHandler, false);
        }
        function exitHandler(){
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement){
                setFullscreen(false);
            }
        }
        setHandler();
        return () => {
            document.removeEventListener('fullscreenchange', exitHandler);
            document.removeEventListener('mozfullscreenchange', exitHandler);
            document.removeEventListener('MSFullscreenChange', exitHandler);
            document.removeEventListener('webkitfullscreenchange', exitHandler);
        };
    }, []);

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
            <Tooltip title="New creativity">
                <FiberNewIcon className={classes.Pointer} onClick={newCreativity}/>
            </Tooltip>
            
            <Tooltip title={`${backgroundColorAlpha ? '(disabled) ':''}change background color`}>
                <input disabled={backgroundColorAlpha} className={[classes.Pointer, classes.ColorPicker].join(' ')} value={backgroundColor} type="color" onChange={updateBackgroundColor} />
            </Tooltip>
        
            <Tooltip title={`toggle background transparency ${backgroundColorAlpha ? 'OFF' : 'ON'}`}>
                <Checkbox className={classes.Check} checked={backgroundColorAlpha} onChange={toggleAlpha}
                    icon={<BlurOnIcon />}
                    checkedIcon={<BlurOffIcon />}
                />
            </Tooltip>

            <Tooltip title={'background styles'}>
                <WallpaperIcon className={classes.Pointer} onClick={openBackgroundStyles}/>
            </Tooltip>
            <Tooltip title={'open key frames editor'}>
                <KeyIcon className={classes.Pointer} onClick={showKeyEditor}/>
            </Tooltip>

            

            <Tooltip title={`toggle reload/nav protection ${preventReload ? 'OFF' : 'ON'}`}>
                <Checkbox className={classes.Check} checked={preventReload} onChange={toggleReload}
                    icon={<ReplayIcon />}
                    checkedIcon={<ReplayCircleFilledIcon />}
                />
            </Tooltip>

            <Tooltip title={`toggle fullscreen ${fullscreen ? 'OFF' : 'ON'}`}>
                <Checkbox className={classes.Check} checked={fullscreen} onChange={toggleFullscreen}
                    icon={<FullscreenIcon />}
                    checkedIcon={<FullscreenExitIcon />}
                />
            </Tooltip>
            <ThemeSwitch onChange={handleClose} tooltip={`switch to ${themeKey === THEMES.light ? THEMES.dark : THEMES.light} theme`}/>
        </div>
        {error && <SnackMessage message={error} open={error} setOpen={removeError}/>}
    </>;
};

export default Icons;