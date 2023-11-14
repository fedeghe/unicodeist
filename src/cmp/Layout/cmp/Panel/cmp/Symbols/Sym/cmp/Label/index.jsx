/* eslint-disable no-unused-vars */
import { useContext} from 'react';
import { Box, Checkbox } from '@mui/material';

import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './../../styles';
import useElementStyles from './styles';



const Label = ({sym, checked, onClick}) => {
    const classes = useStyles(),
        localCasses = useElementStyles(),
        {  dispatch} = useContext(ctx),
        updateLabel = e => dispatch({
            type: ACTIONS.UPDATE_SYMBOL,
            payload: {
                field: 'label',
                value: e.target.value
            }
        });
    return <div className={localCasses.SectionLabel}>
        <div>
            <Box className={classes.Box}>
                <Checkbox checked={checked} onClick={onClick}/>
                <strong>Label: </strong><input type="text" onInput={updateLabel} size="small" label="Symbol label"  value={sym.label} />
            </Box>
        </div>
    </div>;
};

export default Label;