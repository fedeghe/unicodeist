
import { useContext} from 'react';
import Box from '@mui/material/Box';
import ctx from './../../../../../../../../../Context';
import ACTIONS from './../../../../../../../../../reducer/actions';
import useStyles from './../../styles';


const Zindex = ({sym}) => {
    const classes = useStyles();

    const { dispatch} = useContext(ctx);
    return <div className={classes.SectionZindex}>

        <div>
            <Box className={classes.Box}>
                <input className={classes.SectionZindexInput} type="range" min={0} max={1000} value={sym.zIndex} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: {id: sym.id, field:'zIndex', value: v}
                    });
                }}/>
            </Box>
        </div>
    </div>;
};

export default Zindex;