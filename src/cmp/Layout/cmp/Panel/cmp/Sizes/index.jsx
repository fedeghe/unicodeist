import { useContext } from 'react';
// import Box from '@mui/material/Box';

import ctx from './../../../../../../Context';
import {  MIN_WIDTH, MIN_HEIGHT } from './../../../../../../constants';
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
        },{
            label: 'Height',
            min: MIN_HEIGHT,
            max: maxHeight,
            value: height,
            key: 'height',
            unit: 'px',
            rounder: parseInt,
        }].map(el => <Uslider
                key={el.key}
                label={el.label} value={el.value}
                min={el.min} max={el.max} step={el.step || 1}
                unit={el.unit}
                rounder={el.rounder}
                quickTune={true}
                onChange={v => 
                    dispatch({
                        type: ACTIONS.RESIZE,
                        payload: {what:el.key, value: v}
                    })}
            />
        )}
    </div>;
};

export default Sizes;