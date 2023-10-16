import { createUseStyles } from 'react-jss';

import {
    PANEL_WIDTH,
    PANEL_PADDING,
    BASE_FONTSIZE,
} from '../../../../constants';

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
        borderBottomRightRadius: 0
        
    },
}));