import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    Container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        position:'relative'
    },
    Editor1:{
        display:'flex',
        maxHeight:'200px',
        overflow:'scroll',
        margin:`${theme.spacing.small}px`,
        flexShrink: 1
    },
    Editor2:{
        display:'flex',
        maxHeight:'200px',
        overflow:'scroll',
        margin:`${theme.spacing.small}px`,
        flexShrink: 1
    },
    Bottom: {
        width:'100%',
        backgroundColor: 'white',
        display:'flex',
        justifyContent:'space-between',
    },
    Head: {
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
    Selector: {
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
        height:'100px'
    },

    Hint: {
        fontSize:'0.8em',
        marginLeft:`${theme.spacing.small*2}px`,
        width:'300px',

    },
    
    CloseIcon: {
        cursor: 'pointer',
        marginTop: `${theme.spacing.small/2}px`,
        marginLeft: `${theme.spacing.small*2}px`
    }
}));