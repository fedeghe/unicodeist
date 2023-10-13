import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    Container: {
        margin:'0.2em 0',
        display:'flex',
        justifyContent: 'right'
    },
    ClearIcon: {
        cursor:'pointer',
        display: 'flex',
        justifyContent:'space-around',
        alignSelf: 'center',
        color: theme.foreground,
    },
}));