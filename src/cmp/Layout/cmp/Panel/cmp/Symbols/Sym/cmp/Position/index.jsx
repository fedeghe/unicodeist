
import { useContext} from 'react';
import Box from '@mui/material/Box';

import ctx from './../../../../../../../../../Context';
import ACTIONS from './../../../../../../../../../reducer/actions';
import useStyles from './../../styles';
import useElementStyles from './styles';


const Position = ({sym}) => {
    const classes = useStyles();
    const localClasses = useElementStyles();
    const {state: {width, height}, dispatch} = useContext(ctx);
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);
    

    return <div className={localClasses.SectionPosition}>
        <div>
            <Box className={classes.Box}>
                <span  className={classes.Label}>Left: {sym.left}px</span>
                <input type="range" min={0} max={w} value={sym.left} onChange={e => {
                    var v = parseInt(e.target.value, 10);
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: {id: sym.id, field:'left', value: v}
                    });
                }}/>
            </Box>
        </div>
        <div>
            <Box className={classes.Box}>
                <span  className={classes.Label}>Top: {sym.top}px</span>
                <input type="range" min={0} max={h} value={sym.top} onChange={e => {
                    var v = parseInt(e.target.value, 10);
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: {id: sym.id, field:'top', value: v}
                    });
                }}/>
            </Box>
        </div>
    </div>;
};

export default Position;