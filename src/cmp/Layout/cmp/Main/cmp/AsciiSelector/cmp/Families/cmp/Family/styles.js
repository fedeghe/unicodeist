import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({

    Container: {
        display:'flex',
        flexDirection:'column',
        color: theme.modal.setStringColor
    },
    SubContainer: {
        display:'flex',
        flexDirection:'row',
        color: theme.modal.setStringColor
    },
    Br: {
        width:'100%',
        border:'none',
        borderTop: `1px dotted ${theme.foreground}`
    },
    ItemsContainer: {
        display:'flex',
        flexDirection:'row',
        flexWrap: 'wrap',
        borderBottom:'1px dashed black'
    },

}));