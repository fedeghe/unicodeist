import { useContext } from 'react';
// import Box from '@mui/material/Box';

import ctx from './../../../../../../Context';
import { WIDTH, HEIGHT, MIN_WIDTH, MIN_HEIGHT } from './../../../../../../constants';
import Uslider from './../../../../../Uslider';
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
            min: MIN_WIDTH,
            max: maxWidth,
            value: width,
            key: 'width',
            unit: 'px',
            rounder: parseInt,
            fallback: WIDTH
        },{
            label: 'Height',
            min: MIN_HEIGHT,
            max: maxHeight,
            value: height,
            key: 'height',
            unit: 'px',
            rounder: parseInt,
            fallback: HEIGHT
        }].map(el => <Uslider
                key={el.key}
                label={el.label} value={el.value}
                min={el.min} max={el.max} step={el.step || 1}
                unit={el.unit}
                rounder={el.rounder}
                quickTune={true}
                onChange={e => 
                    dispatch({
                        type: ACTIONS.RESIZE,
                        payload: {what:el.key, value: el.rounder(e.target.value) || el.fallback}
                    })}
            />
        )}
    </div>;
};

export default Sizes;