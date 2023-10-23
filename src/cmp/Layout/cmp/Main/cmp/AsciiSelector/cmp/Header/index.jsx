import { useContext, useCallback, useState, useTransition } from 'react';
import {
    IconButton, Checkbox, FormControlLabel
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';

import ctx from '../../../../../../../../Context';
import {debounce} from '../../../../../../../../utils';
import ACTIONS from '../../../../../../../../reducer/actions';
import useStyles from './styles';

const Header = () => {
    const classes = useStyles({ border: 10 }),
        { dispatch, state: {
            letAsciiPanelOpenAfterSelection,
            asciiSelectorFilter,
            filteredCount,
        } } = useContext(ctx),
        [filter, setFilter] = useState(asciiSelectorFilter),
        [isPending, startTransition] = useTransition(),
        onFilterIn = debounce(e =>
            startTransition(() => setFilterBySet(e))
        , 500),
        onFilter = e => {
            setFilter(e.target.value);
            onFilterIn(e);
        },
        setFilterBySet = e => dispatch({
            type: ACTIONS.SET_ASCIIPANEL_FILTER,
            payload: e.target.value
        }),
        toggleLetOpen = useCallback(() => dispatch({
            type: ACTIONS.LET_ASCIIPANEL_OPEN_AFTER_SELECTION,
            payload: !letAsciiPanelOpenAfterSelection
        }), [letAsciiPanelOpenAfterSelection] ),
        clearFilter = () => {
            startTransition(() => setFilter(''));
            dispatch({
                type: ACTIONS.SET_ASCIIPANEL_FILTER,
                payload: ''
            });
        },
        closePanel = () => dispatch({
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: false
        });

    return <div className={classes.Container}>
        <div className={classes.RightSide}>
            <IconButton  className={classes.CloseButton} aria-label="delete" size="large" onClick={closePanel}>
                <RemoveCircleIcon  sx={{ fontSize: '2.5em' }}  className={classes.CloseIcon}/> 
            </IconButton>
            <div className={classes.Search}>
                <div className={classes.In}>
                    <input placeholder="search by sub family / character" onInput={onFilter} type="text" value={filter} />
                    <div className={classes.Spinner}>
                        {isPending
                            ? <CircularProgress size="1rem"/>
                            : <ClearIcon color={filter ? 'action' : 'disabled'} className={classes.ClearIcon} onClick={clearFilter} />
                        }
                    </div>
                </div>
                <p>{asciiSelectorFilter ? 'Found' : 'Available'} symbols {filteredCount}</p>
            </div>
            
        </div>
        <div className={classes.LeaveOpenCheck}>
            <FormControlLabel
                labelPlacement="start"
                control={<Checkbox
                    onChange={toggleLetOpen}
                    checked={letAsciiPanelOpenAfterSelection}
                />}
                label="Leave panel open after selection"
            />
        </div>
    </div>;
};
export default Header;