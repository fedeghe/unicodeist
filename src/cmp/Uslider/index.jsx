import { useState, useRef, useEffect } from 'react';
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
        onTune = () => setTuning(quickTune),
        commitChange = (e, letFocused) => {
            onChange(e);   
            !letFocused && setTuning(false);
        };

    
    useEffect(() => {
        if (ref.current) {
            ref.current.select();
        }
    }, [ref]);

    return <Box className={classes.Box} key={label}>
        <span className={classes.Label} >{label}:</span>
        {tuning
            ? <input
                autoFocus={true}
                onBlur={unTune}
                pattern="[-+]?[0-9]*[.]?[0-9]+"
                ref={ref}
                type="number" value={value} className={classes.Input}
                onChange={e => commitChange(e,true)}
                step={step}
                onKeyDown={mayUntune}
                onFocus={autoSelect}
            />
            : <span onClick={onTune}>{value}{unit}</span>
        }
        <input
            className={classes.Range}
            type="range"
            min={min} max={max} step={step}
            value={value} onChange={onChange}
        />
    </Box>;
};

export default Uslider;