import { useContext, useCallback } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';
import useStyles from './styles';

const Search = () => {
    const classes = useStyles(),
        {
            state: {
                symbols,
                symbolsFilter,
            },
            dispatch
        } = useContext(ctx),
        clearFilter = useCallback(() => 
            dispatch({ type: ACTIONS.SET_SYMBOLS_FILTER, payload: ''}),
            []
        ),
        updateFilter = useCallback(e => 
            dispatch({ type: ACTIONS.SET_SYMBOLS_FILTER, payload: e.target.value}),
            []
        );
    return symbols.length === 0
        ? null
        : <div className={classes.Container}>
            <input placeholder="filter by label" type="text" value={symbolsFilter} onInput={updateFilter}/>
            <ClearIcon color={symbolsFilter ? 'action' : 'disabled'} className={classes.ClearIcon} onClick={clearFilter} />
        </div>;
};

export default Search;