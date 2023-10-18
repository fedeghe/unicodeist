import { createUseStyles } from 'react-jss';
export default createUseStyles(theme => ({
    Container: {
        display:'flex',
        justifyContent:'space-between',
        height:'80px',
        minHeight: '80px',
        alignItems: 'center',
        marginTop:'20px'
    },
    RightSide: {marginLeft:'16px', display:'flex',alignItems:'center'},
    CloseButton: {
        position:'absolute',
        top:'15px',
        left:'15px',
        color: 'red',
        cursor:'pointer',
        display:'flex',
        backgroundColor: 'transparent'
    },
    Search: {
        marginLeft:'120px',
        display:'flex',
        alignItems:'center',
        alignSelf:'center',
        '&>input' : {
            fontSize:'2em',
        }
    },
    ClearIcon: {
        cursor: 'pointer',
        color: theme.foreground,
    },
    LeaveOpenCheck: {marginRight:'20px'},
}));