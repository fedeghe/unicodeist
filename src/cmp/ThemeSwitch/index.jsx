import { useContext } from 'react';
import { Switch, Tooltip } from '@mui/material';

import {DEFAULT_THEME} from 'src/constants';
import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './styles';

const ThemeSwitch = ({onChange = () => {}, tooltip}) => {
    const {
            state: { themeKey },
            dispatch
        } = useContext(ctx),
        classes = useStyles({themeKey}),
        switchTheme = () => {
            dispatch({ type: ACTIONS.SWITCH_THEME });
            onChange();
        },
        cnt = <Switch
            className={classes.Container}
            onChange={switchTheme}
            checked={themeKey === DEFAULT_THEME}
        />;
    return tooltip
        ? <Tooltip title={tooltip}>{cnt}</Tooltip>
        : cnt;
};

export default ThemeSwitch;