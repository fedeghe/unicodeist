import { useCallback, useContext } from 'react';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GetAppIcon from '@mui/icons-material/GetApp';

import ThemeSwitch from '../../../../../ThemeSwitch';
import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';
import { saveAsFile, importFromFile } from './../../../../../../utils';

import useStyles from './styles';

import Channel from '@fedeghe/channeljs';



const Icons = () => {
    const { state, dispatch} = useContext(ctx),
        {backgroundColor} = state,
        classes = useStyles(),
        embed = useCallback(() => Channel.get('event').pub('embed') , []),
        mailto = useCallback(() => Channel.get('event').pub('mailto'), []),
        exportImage = useCallback(() => Channel.get('event').pub('exportImage'), []),
        exportState = useCallback(() => saveAsFile('unicodeist.json', state), [state]),
        importState = () => importFromFile({
            onContentReady: cnt => dispatch({
                type: ACTIONS.IMPORT,
                payload: JSON.parse(cnt)
            })
        }),
        updateBackgroundColor = e => dispatch({
            type: ACTIONS.UPDATE_GLOBAL,
            payload: {
                field: 'backgroundColor',
                value :e.target.value
            }
        });
  
    return <div className={classes.GlobalTools}>
        <div className={classes.Item}><FileUploadIcon onClick={exportState}/></div>
        <div className={classes.Item}><GetAppIcon onClick={importState}/></div>
        <div className={classes.Item}><EmailRoundedIcon onClick={mailto}/></div>
        <div className={classes.Item}><CodeRoundedIcon onClick={embed}/></div>
        <div className={classes.Item}><InsertPhotoIcon onClick={exportImage}/></div>
        <div className={classes.Item}>
            <input style={{width:'28px'}} value={backgroundColor} type="color" onChange={updateBackgroundColor} />
        </div>
        <div className={classes.Item}>
            <ThemeSwitch/>
        </div>
        
    </div>;
};

export default Icons;