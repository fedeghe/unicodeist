import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    Container: {
        display:'flex',
        flexDirection:'column',
        color: theme.modal.setStringColor,
        margin:'0 50px',
    },
    ItemsContainer: {
        display:'flex',
        flexWrap: 'wrap',
        borderBottom:'1px dashed black',
        flexDirection: 'column'
    },
    SubfamilyTitle: {
        display:'block',
        width:'100%'
    },
    Exp: {
        cursor: 'pointer'
    }
}));