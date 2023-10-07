import { useCallback, useContext } from 'react';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import Grid4x4RoundedIcon from '@mui/icons-material/Grid4x4Rounded';




import ThemeSwitch from '../../../../../ThemeSwitch';
import ctx from './../../../../../../Context'
import ACTIONS from './../../../../../../reducer/actions'

import useStyles from './styles'

import Channel from '@fedeghe/channeljs'



const Icons = () => {
    const {state: { backgroundColor}, dispatch} = useContext(ctx)
    const classes = useStyles()
    const embed = useCallback(() => {
        Channel.get('event').pub('embed')
    }, [])
    const mailto = useCallback(() => {
        Channel.get('event').pub('mailto')
    }, [])
    const updateBackgroundColor = e => {
        const value = e.target.value
        dispatch({
            type: ACTIONS.UPDATE_GLOBAL,
            payload: {
                field: 'backgroundColor',
                value
            }
        })
    }
  
    return <div className={classes.GlobalTools}>
        {/* <div onClick={console.log} className={classes.Item}>
            <VisibilityRoundedIcon/>
        </div> */}
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
        
    </div>
}

export default Icons