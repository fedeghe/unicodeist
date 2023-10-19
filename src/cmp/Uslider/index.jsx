import { useState, useRef, useEffect, useContext } from 'react';

import ctx from './../../Context';
import ACTIONS from './../../reducer/actions';
import Box from '@mui/material/Box';

import useStyles from './styles';

const Uslider = ({
    label,
    value,
    onChange,
    min, max, step = 1,
    unit = '',
    quickTune = false,
}) => {
    const classes = useStyles(),
        {dispatch} = useContext(ctx),
        ref = useRef(),
        [tuning, setTuning] = useState(false),
        
        unTune = () => setTuning(false),
        mayUntune = e => {
            if (['Enter', 'Escape'].includes(e.key)) {
                setTuning(false);
                e.preventDefault();
                e.stopPropagation();
            }
        },
        autoSelect = e => e.target.select(),
        onTune = () => setTuning(quickTune);

    useEffect(() => {
        dispatch({
            type: ACTIONS.CAN_SCROLL_SYMBOLS,
            payload: !tuning
        });
    }, [tuning]);

    return <Box className={classes.Box} key={label}>
        <span className={classes.Label} >{label}:</span>
        <div className={classes.Mid}>
        {tuning
            ? <input
                autoFocus={true}
                onBlur={unTune}
                pattern="[-+]?[0-9]*[.]?[0-9]+"
                ref={ref}
                type="number" value={value}
                className={classes.Input}
                onChange={onChange}
                max={max}
                step={step}
                onKeyDown={mayUntune}
                onFocus={autoSelect}
            />
            : <div onClick={onTune}>{value}{unit}</div>
        }
        </div>        

        <input
            className={classes.Range}
            type="range"
            min={min} max={max} step={step}
            value={value} onChange={onChange}
        />
    </Box>;
};

export default Uslider;