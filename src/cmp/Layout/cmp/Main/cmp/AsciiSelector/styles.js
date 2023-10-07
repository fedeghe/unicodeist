import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({

    Container: {
        zIndex:1000,
        position:'absolute',
        top:'5px',
        left:'5px',
        width: 'calc(100vw - 10px)',
        height: 'calc(100vh - 10px)',
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
        padding:'10px',
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