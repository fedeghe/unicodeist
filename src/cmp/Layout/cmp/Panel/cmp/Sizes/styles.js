import { createUseStyles } from 'react-jss';

export default createUseStyles({
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
});