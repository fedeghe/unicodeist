import { useContext } from 'react';
import { Tooltip } from '@mui/material';
import {
    Clear as ClearIcon,
    DoneAll as DoneAllIcon,
    RemoveDone as RemoveDoneIcon,
    Flaky as FlakyIcon
} from '@mui/icons-material';

import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './styles';

const Search = () => {
    const classes = useStyles(),
        {
            state: {
                symbols,
                symbolsFilter,
                selected
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
        }),
        syL = symbols.length,
        seL = selected.length,
        showSelectAll = Boolean(syL),
        showUnselectAll = Boolean(seL),
        showInvertSelection = Boolean(seL);
        
    return Boolean(symbols.length) && <div className={classes.Container}>
        <div>
            {showSelectAll && <Tooltip disableInteractive title="select all" className={classes.Pointer}>
                <DoneAllIcon onClick={selectAll}/>
            </Tooltip>}
            {showUnselectAll && <Tooltip disableInteractive title="unselect all" className={classes.Pointer}>
                <RemoveDoneIcon onClick={unselectAll}/>
            </Tooltip>}
            {showInvertSelection && <Tooltip disableInteractive title="invert selection" className={classes.Pointer}>
                <FlakyIcon onClick={invertAll}/>
            </Tooltip>}
        </div>
        <div className={classes.Right}>
            <input placeholder="filter by label" type="text" value={symbolsFilter} onInput={updateFilter}/>
            <ClearIcon color={symbolsFilter ? 'action' : 'disabled'} className={classes.ClearIcon} onClick={clearFilter} />
        </div>
    </div>;
};

export default Search;