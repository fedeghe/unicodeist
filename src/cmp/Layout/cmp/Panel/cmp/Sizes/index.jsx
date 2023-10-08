import { useContext} from 'react';
import Box from '@mui/material/Box';

import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';
import useStyles from './styles';


const Sizes = () => {
    const classes = useStyles();
    const {state: {width, height, maxWidth, maxHeight}, dispatch} = useContext(ctx);
    return <div className={classes.Container}>
        <div>
            <Box className={classes.Box}>
                <span  className={classes.Label} >Width: {width}px</span>
                <input type="range" min={100} max={maxWidth} value={width} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.RESIZE,
                        payload: {what:'width', value: v}
                    });
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
                    });
                }}/>
            </Box>
        </div>
    </div>;
};

export default Sizes;