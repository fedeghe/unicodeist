
import { useContext} from 'react';
import Box from '@mui/material/Box';
import ctx from './../../../../../../../../../Context';
import {MIN_ZINDEX, MAX_ZINDEX} from './../../../../../../../../../constants';
import ACTIONS from './../../../../../../../../../reducer/actions';
import useStyles from './../../styles';
import useElementStyles from './styles';


const Zindex = ({sym}) => {
    const classes = useStyles(),
        localClasses = useElementStyles(),
        { dispatch} = useContext(ctx);
    return <div className={localClasses.SectionZindex}>
        <div>
            <Box className={classes.Box}>
                <input className={localClasses.SectionZindexInput}
                    type="range"
                    min={MIN_ZINDEX} max={MAX_ZINDEX}
                    value={sym.zIndex}
                    onChange={e => 
                        dispatch({
                            type: ACTIONS.UPDATE_SYMBOL,
                            payload: {id: sym.id, field:'zIndex', value: parseInt(e.target.value, 10)}
                        })
                    }
                />
            </Box>
        </div>
    </div>;
};

export default Zindex;