import { useContext} from 'react';
import ctx from 'src/Context';
import {MIN_ZINDEX, MAX_ZINDEX} from 'src/constants';
import Uslider from 'src/cmp/Uslider';
import ACTIONS from 'src/reducer/actions';

const Zindex = ({sym}) => {    
    const { dispatch} = useContext(ctx),
        { zIndex } = sym;
    return <div>
        <Uslider
                label={'Z-index'} value={zIndex}
                min={MIN_ZINDEX} max={MAX_ZINDEX} step={1}
                quickTune={true}
                onChange={v => 
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: { field: 'zIndex', value: v}
                    })
                }
            />
    </div>;
};

export default Zindex;