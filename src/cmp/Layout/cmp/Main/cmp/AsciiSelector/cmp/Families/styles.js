import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({

    Container: {
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