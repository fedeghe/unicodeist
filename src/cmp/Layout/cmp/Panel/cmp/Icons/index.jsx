import { useCallback, useContext } from 'react';

// import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
// import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
// import Grid4x4RoundedIcon from '@mui/icons-material/Grid4x4Rounded';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';



import ThemeSwitch from '../../../../../ThemeSwitch';
import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';
import { saveAsFile, importFromFile } from './../../../../../../utils';

import useStyles from './styles';

import Channel from '@fedeghe/channeljs';



const Icons = () => {
    const { state, dispatch} = useContext(ctx);
    const {backgroundColor} = state;
    const classes = useStyles();
    const embed = useCallback(() => {
        Channel.get('event').pub('embed');
    }, []);
    const mailto = useCallback(() => {
        Channel.get('event').pub('mailto');
    }, []);
    const exportState = useCallback(() => {
        saveAsFile('asciist.json', state);
    }, [state]);

    const importState = () => {
        importFromFile({
            onContentReady : cnt => dispatch({
                type: ACTIONS.IMPORT,
                payload: JSON.parse(cnt)
            })
        });
    };
    const updateBackgroundColor = e => {
        const value = e.target.value;
        dispatch({
            type: ACTIONS.UPDATE_GLOBAL,
            payload: {
                field: 'backgroundColor',
                value
            }
        });
    };
  
    return <div className={classes.GlobalTools}>
        {/* <div onClick={console.log} className={classes.Item}>
            <VisibilityRoundedIcon/>
        </div> */}
        <div className={classes.Item}><FileUploadIcon onClick={exportState}/></div>
        <div className={classes.Item}><GetAppIcon onClick={importState}/></div>
        <div className={classes.Item}><EmailRoundedIcon onClick={mailto}/></div>
        <div className={classes.Item}><CodeRoundedIcon onClick={embed}/></div>
        {/* <div className={classes.Item}><FolderOpenRoundedIcon/></div> */}
        {/* <div className={classes.Item}><Grid4x4RoundedIcon/></div> */}
        <div className={classes.Item}>
            <input style={{width:'28px'}} value={backgroundColor} type="color" onChange={updateBackgroundColor} />
        </div>
        <div className={classes.Item}>
            <ThemeSwitch/>
        </div>
        
    </div>;
};

export default Icons;