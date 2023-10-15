import { useContext } from 'react';
import Box from '@mui/material/Box';

import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';
import useStyles from './styles';

const Sizes = () => {
    const classes = useStyles(),
        {
            state: {
                width, height,
                maxWidth, maxHeight,
            },
            dispatch
        } = useContext(ctx);

    return <div className={classes.Container}>    
        {[{
            label: 'Width',
            min: 100,
            max: maxWidth,
            value: width,
            key: 'width'
        },{
            label: 'Height',
            min: 100,
            max: maxHeight,
            value: height,
            key: 'height'
        }].map(el => <div key={el.key}>
            <Box className={classes.Box}>
                <span  className={classes.Label} >{el.label}: {el.value}px</span>
                <input type="range" min={el.min} max={el.max} value={el.value} onChange={e => 
                    dispatch({
                        type: ACTIONS.RESIZE,
                        payload: {what:el.key, value: e.target.value}
                    })
                }/>
            </Box>
        </div>)}
    </div>;
};

export default Sizes;