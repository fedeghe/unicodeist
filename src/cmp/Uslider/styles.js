import { createUseStyles } from 'react-jss';

export default createUseStyles(theme =>({
    Box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight:'',
        height:`${theme.spacing.xxlarge}px`
    },

    Label: {
        marginRight: `${theme.spacing.small}px`,
        fontWeight: 'bold',
        display:'flex',
        flex:1,
        textWrap: 'nowrap'
    },
    Mid: {
        display:'flex',
        flex:1,
        justifyContent:'center'
    },
    Input: {
        width: '60px',
        height:`${theme.spacing.x1large}px`,
        border: 'none',
        margin: 'none',
        outline:'none',
        
    },
    Range: {
        width:'80px',
        display:'flex',
        flex:1,
        accentColor: theme.accentColor,
    },
    Num: {
        cursor:'pointer',
        padding:'0 10px'
    }
}));