import { useContext} from 'react';
import Box from '@mui/material/Box';

import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './../../styles';
import useElementStyles from './styles';

const Label = ({sym}) => {
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
                <strong>Label: </strong><input type="text" onInput={updateLabel} size="small" label="Symbol label"  value={sym.label} />
            </Box>
        </div>
    </div>;
};

export default Label;