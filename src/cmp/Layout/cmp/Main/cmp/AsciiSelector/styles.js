import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
    Container: {
        zIndex:10000,
        position:'absolute',
        top:`${theme.spacing.small/2}px`,
        left:`${theme.spacing.small/2}px`,
        width: `calc(100vw - ${theme.spacing.small}px)`,
        height: `calc(100vh - ${theme.spacing.small}px)`,
        borderRadius: theme.radius.selectorModal,
        backgroundColor: theme.background.selectorModal,
        color: theme.foreground,
        display:'flex',
        flexDirection:'column',        
    },
    Asciis: {
        display:'flex',
        flexGrow:1,
        overflow: 'scroll',
        padding:`${theme.spacing.small}px`,
        flexDirection:'column',
        position:'relative'
    },
    SetContainer: {
        display:'flex',
        flexDirection:'column',
        color: theme.modal.setStringColor
    },
    Br: {
        width:'100%',
    },
    ItemsContainer: {
        display:'flex',
        flexDirection:'row',
        flexWrap: 'wrap',
        borderBottom:'1px dashed black'
    },

}));