import { useContext, useCallback } from 'react';


import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ClearIcon from '@mui/icons-material/Clear';
import ThemeSwitch from '../../../../../../../ThemeSwitch';


import ctx from '../../../../../../../../Context';
import ACTIONS from '../../../../../../../../reducer/actions';
import useStyles from './styles';

const Header = () => {
    const classes = useStyles({ border: 10 });

    const { dispatch, state: {
        letAsciiPanelOpenAfterSelection,
        asciiPanelFilterBySet,
    } } = useContext(ctx);

    const toggleLetOpen = () => {
        dispatch({
            type: ACTIONS.LET_ASCIIPANEL_OPEN_AFTER_SELECTION,
            payload: !letAsciiPanelOpenAfterSelection
        });
    };
    const setFilterBySet = useCallback(e => {
        dispatch({
            type: ACTIONS.SET_ASCIIPANEL_FILTER,
            payload: {
                what: 'set',
                value: e.target.value
            }
        });
    }, [dispatch]);


    const clearFilter = () =>
        dispatch({
            type: ACTIONS.SET_ASCIIPANEL_FILTER,
            payload: ''
        });

    const closePanel = () => {
        dispatch({
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: false
        });
    };

    return <div className={classes.Container}>
        <div className={classes.RightSide}>
            <div className={classes.CloseButton}>
                <RemoveCircleIcon className={classes.CloseIcon} onClick={closePanel} />
            </div>
            <div className={classes.Search}>
                <input placeholder="search by set name" onInput={setFilterBySet} type="text" value={asciiPanelFilterBySet} />
                <ClearIcon color={asciiPanelFilterBySet ? 'action' : 'disabled'} className={classes.ClearIcon} onClick={clearFilter} />
            </div>
        </div>
        <div className={classes.LeaveOpenCheck}>
            <FormControlLabel
                labelPlacement="start"
                control={<Checkbox
                    onChange={toggleLetOpen}
                    checked={letAsciiPanelOpenAfterSelection}
                />}
                label="Do not close after selection"
            />
            <ThemeSwitch />
        </div>
    </div>;
};
export default Header;