import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    Box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight:'',
        height:'22px'
    },

    Label: {//
        marginRight: '10px',
        fontWeight: 'bold',
        display:'flex',
        flex:1
    },
    Mid: {
        display:'flex',
        flex:1,
        justifyContent:'center'
    },
    Input: {
        width: '60px',
        height:'20px',
        border: 'none',
        margin: 'none',
        outline:'none',
        
    },
    Range: {
        width:'80px',
        display:'flex',
        flex:1,
        accentColor: theme.accentColor,
        // backgroundColor: theme.accentColor,
        // '-webkit-appearance': 'none',
        // '-moz-appearance': 'none',
    },
    Num: {
        cursor:'pointer',
        padding:'0 10px'
    }
}));