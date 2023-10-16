import { useContext } from 'react';
import Switch from '@mui/material/Switch';

import {DEFAULT_THEME} from './../../constants';
import ctx from './../../Context';
import ACTIONS from './../..//reducer/actions';
import useStyles from './styles';

const ThemeSwitch = ({onChange = () => {}}) => {
    const {state: { themeKey}, dispatch} = useContext(ctx),
        classes = useStyles({themeKey}),
        switchTheme = () => {
            dispatch({ type: ACTIONS.SWITCH_THEME });
            onChange();
        };
    return <Switch
        className={classes.Container}
        onChange={switchTheme}
        checked={themeKey === DEFAULT_THEME}
    />;
};

export default ThemeSwitch;