import { useContext} from 'react';
import ctx from './../../../../../../../../../Context';
import {MIN_ZINDEX, MAX_ZINDEX} from './../../../../../../../../../constants';
import Uslider from './../../../../../../../../Uslider';
import ACTIONS from './../../../../../../../../../reducer/actions';
import useStyles from './styles';

const Zindex = ({sym}) => {
    
    const classes = useStyles(),
        { dispatch} = useContext(ctx);
        
    return <div className={classes.SectionZindex}>
        <Uslider
                label={'Z-index'} value={sym.zIndex}
                min={MIN_ZINDEX} max={MAX_ZINDEX} step={1}
                quickTune={true}
                onChange={v => 
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: {id: sym.id, field: 'zIndex', value: v}
                    })
                }
            />
    </div>;
};

export default Zindex;