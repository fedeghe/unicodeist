import { createUseStyles } from 'react-jss';

import {
    PANEL_WIDTH,
    PANEL_PADDING,
    BASE_FONTSIZE,
} from 'src/constants';

export default createUseStyles(theme => ({
    Container: {
        fontSize: `${BASE_FONTSIZE}px`,
        minWidth: `${PANEL_WIDTH}px`,
        width: `${PANEL_WIDTH}px`,
        height:`calc(100vh - ${2*PANEL_PADDING}px)`,
        backgroundColor: theme.background.panel,
        padding: `${PANEL_PADDING}px`,
        display:'flex',
        flexDirection:'column',
        borderRadius:'25px',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: `30px 0px 80px -7px ${theme.mode === 'bright' ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.75)'}`,
        zIndex: 0
    },
}));