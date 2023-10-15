
import { useContext} from 'react';
import Box from '@mui/material/Box';

import ctx from './../../../../../../../../../Context';
import ACTIONS from './../../../../../../../../../reducer/actions';
import useStyles from './../../styles';
import useElementStyles from './styles';


const Position = ({sym}) => {
    const classes = useStyles(),
        localClasses = useElementStyles(),
        {state: {width, height}, dispatch} = useContext(ctx),
        w = parseInt(width, 10),
        h = parseInt(height, 10);

    return <div className={localClasses.SectionPosition}>
        {[{
            label: 'Left',
            min: 0,
            max: w,
            value: sym.left,
            key: 'left'
        },{
            label: 'Top',
            min: 0,
            max: h,
            value: sym.top,
            key: 'top'
        }].map(el => 
            <div key={el.key}>
                <Box className={classes.Box}>
                    <span  className={classes.Label}>{el.label}: {el.value}px</span>
                    <input type="range" min={el.min} max={el.max} value={el.value} onChange={e => 
                        dispatch({
                            type: ACTIONS.UPDATE_SYMBOL,
                            payload: {id: sym.id, field:el.key, value: parseInt(e.target.value, 10)}
                        })
                    }/>
                </Box>
            </div>
        )}
    </div>;
};

export default Position;