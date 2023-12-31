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
        marginRight:`${theme.spacing.small}px`,
        fontWeight:'bold'
    },
}));