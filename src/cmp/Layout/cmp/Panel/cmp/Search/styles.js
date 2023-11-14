import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    Container: {
        marginBottom:'0.5em',
        
        display:'flex',
        justifyContent: 'space-between'
    },
    Right: {
        display:'flex',
    },
    ClearIcon: {
        cursor:'pointer',
        display: 'flex',
        justifyContent:'space-around',
        alignSelf: 'center',
        color: theme.foreground,
    },
    Pointer: {
        cursor:'pointer'
    }
}));