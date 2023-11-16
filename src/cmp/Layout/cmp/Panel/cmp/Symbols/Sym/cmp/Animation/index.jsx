import { useContext} from 'react';
import { UNSELECTED } from 'src/constants';
import ctx from 'src/Context';
import Box from '@mui/material/Box';
import ACTIONS from 'src/reducer/actions';
import useStyles from './../../styles';

const Animation = ({sym}) => {
    const classes = useStyles({sym}),
        { animation } = sym,
        { dispatch, state: { keyFrames} } = useContext(ctx),
        hasSome = Object.keys(keyFrames).length,
        onChange = e => dispatch({
            type: ACTIONS.UPDATE_SYMBOL,
            payload: { field: 'animation', value: e.target.value }
        });
    return <div className={classes.Container}>
        <Box className={classes.Box}>
            <div>
                <span className={classes.Label} >Animation:</span>
                {hasSome ? 
                    <select onChange={onChange} value={animation || UNSELECTED}>
                        <option value={UNSELECTED}>no animation selected</option>
                        {Object.keys(keyFrames).map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                    : <span>not defined</span>
                }
            </div>
        </Box>
    </div>;
};

export default Animation;