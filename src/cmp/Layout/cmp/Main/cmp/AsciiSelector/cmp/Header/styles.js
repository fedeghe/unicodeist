import { createUseStyles } from 'react-jss';
export default createUseStyles(theme => ({
    Container: {
        display:'flex',
        justifyContent:'space-between',
        height:'80px',
        minHeight: '80px',
        alignItems: 'center'
    },
    RightSide: {marginLeft:'16px', display:'flex',alignItems:'center'},
    CloseButton: {
        position:'relative',
        color: 'red',
        cursor:'pointer',
        display:'flex',
        backgroundColor: 'transparent'
    },
    Search: {
        marginLeft:'20px',
        display:'flex',
        alignSelf:'center',
        '&>input' : {
            fontSize:'2em',
        }
    },
    ClearIcon: {
        cursor: 'pointer',
        height: '2em',
        color: theme.foreground,
    },
    LeaveOpenCheck: {marginRight:'20px'},
    CloseIcon: {fontSize: '3em'}
}));