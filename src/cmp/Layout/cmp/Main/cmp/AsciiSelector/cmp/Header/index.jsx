import { useContext, useCallback } from 'react';

import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ClearIcon from '@mui/icons-material/Clear';
import ThemeSwitch from '../../../../../../../ThemeSwitch';


import ctx from '../../../../../../../../Context';
import ACTIONS from '../../../../../../../../reducer/actions';
import useStyles from './styles';

const Header = () => {
    const classes = useStyles({ border: 10 }),
        { dispatch, state: {
            letAsciiPanelOpenAfterSelection,
            asciiSelectorFilter,
        } } = useContext(ctx),
        setFilterBySet = useCallback(e =>
            dispatch({
                type: ACTIONS.SET_ASCIIPANEL_FILTER,
                payload: e.target.value
            }),
            [dispatch]
        ),
        toggleLetOpen = () => dispatch({
            type: ACTIONS.LET_ASCIIPANEL_OPEN_AFTER_SELECTION,
            payload: !letAsciiPanelOpenAfterSelection
        }),
        clearFilter = () => dispatch({
            type: ACTIONS.SET_ASCIIPANEL_FILTER,
            payload: ''
        }),
        closePanel = () => dispatch({
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: false
        });

    return <div className={classes.Container}>
        <div className={classes.RightSide}>
            <IconButton  className={classes.CloseButton} aria-label="delete" size="large">
                <RemoveCircleIcon  sx={{ fontSize: '2.5em' }}  className={classes.CloseIcon} onClick={closePanel} /> 
            </IconButton>
            {/* <div className={classes.CloseButton}>
                <RemoveCircleIcon className={classes.CloseIcon} onClick={closePanel} />
            </div> */}
            <div className={classes.Search}>
                <input placeholder="search by family or character name" onInput={setFilterBySet} type="text" value={asciiSelectorFilter} />
                <ClearIcon color={asciiSelectorFilter ? 'action' : 'disabled'} className={classes.ClearIcon} onClick={clearFilter} />
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
            <ThemeSwitch />
        </div>
    </div>;
};
export default Header;