
import { useContext} from 'react'

import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import ctx from './../../../../../../../../../Context'
import ACTIONS from './../../../../../../../../../reducer/actions'
import useStyles from './../../styles'


const Position = ({sym}) => {
    const classes = useStyles()
    const {state: {width, height}, dispatch} = useContext(ctx)
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);
    const wMore = w * .3;
    const hMore = h * .3;

    return <div className={classes.SectionPosition}>
        <div>
            <Box className={classes.Box}>
                <span  className={classes.Label}>Left: {sym.left}px</span>
                <input type="range" min={-wMore} max={width+wMore} value={sym.left} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: {id: sym.id, field:'left', value: v}
                    })
                }}/>
            </Box>
        </div>
        <div>
            <Box className={classes.Box}>
                <span  className={classes.Label}>Top: {sym.top}px</span>
                <input type="range" min={-hMore} max={height+hMore} value={sym.top} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: {id: sym.id, field:'top', value: v}
                    })
                }}/>
            </Box>
        </div>
    </div>
}

export default Position