import { useContext } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip } from '@mui/material';

import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './styles';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import FlakyIcon from '@mui/icons-material/Flaky';


const Search = () => {
    const classes = useStyles(),
        {
            state: {
                symbols,
                symbolsFilter,
            },
            dispatch
        } = useContext(ctx),
        clearFilter = () => dispatch({
            type: ACTIONS.SET_SYMBOLS_FILTER, payload: ''
        }),
        updateFilter = e => dispatch({
            type: ACTIONS.SET_SYMBOLS_FILTER, payload: e.target.value
        }),
        selectAll = () => dispatch({
            type: ACTIONS.TOGGLE_SYMBOLS_SELECTION,
            payload: 'selectAll'
        }),
        unselectAll = () => dispatch({
            type: ACTIONS.TOGGLE_SYMBOLS_SELECTION,
            payload: 'unselectAll'
        }),
        invertAll = () => dispatch({
            type: ACTIONS.TOGGLE_SYMBOLS_SELECTION,
            payload: 'invertAll'
        })
        ;
    return Boolean(symbols.length) && <div className={classes.Container}>
        <div>
            <Tooltip disableInteractive title="select all" className={classes.Pointer}>
                <DoneAllIcon onClick={selectAll}/>
            </Tooltip>
            <Tooltip disableInteractive title="unselect all" className={classes.Pointer}>
                <RemoveDoneIcon onClick={unselectAll}/>
            </Tooltip>
            <Tooltip disableInteractive title="invert selection" className={classes.Pointer}>
                <FlakyIcon onClick={invertAll}/>
            </Tooltip>
        </div>
        <div className={classes.Right}>
            <input placeholder="filter by label" type="text" value={symbolsFilter} onInput={updateFilter}/>
            <ClearIcon color={symbolsFilter ? 'action' : 'disabled'} className={classes.ClearIcon} onClick={clearFilter} />
        </div>
    </div>;
};

export default Search;