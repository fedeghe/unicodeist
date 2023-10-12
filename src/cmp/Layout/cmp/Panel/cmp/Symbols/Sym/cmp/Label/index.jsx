import { useContext} from 'react';
import Box from '@mui/material/Box';

import ctx from './../../../../../../../../../Context';
import ACTIONS from './../../../../../../../../../reducer/actions';
import useStyles from './../../styles';
import useElementStyles from './styles';


const Label = ({sym}) => {
    const classes = useStyles();
    const localCasses = useElementStyles();
    const {  dispatch} = useContext(ctx);
    const updateLabel = e => dispatch({
        type: ACTIONS.UPDATE_SYMBOL,
        payload: {
            id: sym.id,
            field: 'label',
            value: e.target.value
        }
    });
    return <div className={localCasses.SectionLabel}>
        <div>
            <Box className={classes.Box}>
                <input type="text" onInput={updateLabel} size="small" label="Symbol label"  value={sym.label} />
                <span  className={classes.Label}>z: {sym.zIndex}</span>
            </Box>
        </div>
    </div>;
};

export default Label;