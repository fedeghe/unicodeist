import { createUseStyles } from 'react-jss';

export default createUseStyles({
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
        outline:'none'
    },
    Range: {
        width:'80px',
        display:'flex',
        flex:1
    },
    Num: {
        cursor:'pointer',
        padding:'0 10px'
    }
});