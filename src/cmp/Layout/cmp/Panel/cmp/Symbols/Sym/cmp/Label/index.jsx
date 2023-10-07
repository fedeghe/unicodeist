
import { useContext} from 'react'

import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import ctx from './../../../../../../../../../Context'
import ACTIONS from './../../../../../../../../../reducer/actions'
import useStyles from './../../styles'


const Label = ({sym}) => {
    const classes = useStyles()
    const {state: {width, height, focusedSymbolId}, dispatch} = useContext(ctx)
    const updateLabel = e => dispatch({
        type: ACTIONS.UPDATE_SYMBOL,
        payload: {
            id: sym.id,
            field: 'label',
            value: e.target.value
        }
    })
    return <div className={classes.SectionLabel}>
        <div>
            <Box className={classes.Box}>
                <input type="text" onInput={updateLabel} size="small" label="Symbol label"  value={sym.label} />
                <span  className={classes.Label}>z: {sym.zIndex}</span>
            </Box>
        
        </div>
    </div>
}

export default Label