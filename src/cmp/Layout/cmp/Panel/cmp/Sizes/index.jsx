
import { useContext} from 'react'

import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import ctx from './../../../../../../Context'
import ACTIONS from './../../../../../../reducer/actions'
import useStyles from './styles'


const Sizes = () => {
    const classes = useStyles()
    const {state: {width, height, maxWidth, maxHeight, focusedSymbolId}, dispatch} = useContext(ctx)
    return <div className={classes.Container}>
        <div>
            <Box className={classes.Box}>
                <span  className={classes.Label} >Width: {width}px</span>
                <input type="range" min={100} max={maxWidth} value={width} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.RESIZE,
                        payload: {what:'width', value: v}
                    })
                }}/>
            </Box>
        </div>
        <div>
            <Box className={classes.Box}>
                <span  className={classes.Label} >Height: {height}px</span>
                <input type="range" min={100} max={maxHeight} value={height} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.RESIZE,
                        payload: {what:'height', value: v}
                    })
                }}/>
            </Box>
        </div>
    </div>
}

export default Sizes