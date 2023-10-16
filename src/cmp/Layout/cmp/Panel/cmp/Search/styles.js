import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    Container: {
        marginBottom:'0.5em',
        
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