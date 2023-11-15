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

    Bottom: {
        width:'100%',
        display:'flex',
        justifyContent:'space-between',
    },
    Head: {
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
    
    CloseIcon: {
        cursor: 'pointer',
        marginTop: `${theme.spacing.small/2}px`,
        marginLeft: `${theme.spacing.small*2}px`
    },
    Chip: {
        margin: '10px 10px 0px 0px'
    }
}));