import { useContext, useCallback } from 'react';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';

import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';
import useStyles from './styles';


const Sizes = () => {
    const classes = useStyles();
    const {state: {
        width, height,
        maxWidth, maxHeight,
        symbolsFilter,
    }, dispatch} = useContext(ctx);

    const clearFilter = useCallback(() => 
        dispatch({
            type: ACTIONS.SET_SYMBOLS_FILTER,
            payload: ''
        })
    , []);
    const updateFilter = useCallback(e => 
        dispatch({
            type: ACTIONS.SET_SYMBOLS_FILTER,
            payload: e.target.value
        })
    , []);
    return <div className={classes.Container}>
        
        <div>
            <Box className={classes.Box}>
                <span  className={classes.Label} >Width: {width}px</span>
                <input type="range" min={100} max={maxWidth} value={width} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.RESIZE,
                        payload: {what:'width', value: v}
                    });
                }}/>
            </Box>
        </div>
        <div>
            <Box className={classes.Box}>
                <span  className={classes.Label} >Height: {height}px</span>
                <input type="range" min={100} max={maxHeight} value={height} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.RESIZE,
                        payload: {what:'height', value: v}
                    });
                }}/>
            </Box>
        </div>
        <div className={classes.SearchContainer}>
            <label htmlFor="search">search: </label>
            <input id="search" type="text" value={symbolsFilter} onInput={updateFilter}/>
            <ClearIcon color={symbolsFilter ? 'action' : 'disabled'} className={classes.ClearIcon} onClick={clearFilter} />
        </div>
    </div>;
};

export default Sizes;