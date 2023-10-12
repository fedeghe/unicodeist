import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    Container: {
        marginBottom:'1em'
    },
    Box:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        
    },
    Label: {
        marginRight:'10px',
        fontWeight:'bold'
    },
    ClearIcon: {
        // flexBasis: '33%',
        cursor:'pointer',
        display: 'flex',
        justifyContent:'space-around',
        alignSelf: 'center',
        color: theme.foreground,
    },
    SearchContainer: {
        marginTop:'0.5em',
        display:'flex',
        justifyContent: 'right'
    },
}));