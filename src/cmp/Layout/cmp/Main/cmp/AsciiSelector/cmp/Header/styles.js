import { createUseStyles } from 'react-jss';
export default createUseStyles(theme => ({
    Container: {
        display:'flex',
        justifyContent:'space-between',
        height:'80px',
        minHeight: '80px',
        alignItems: 'center',
        margin:'20px 0px'
    },
    RightSide: {
        display:'flex',
        flexGrow:1
    },
    CloseButton: {
        top:'3px',
        left:'16px',
        color: 'red',
        cursor:'pointer',
        display:'flex',
        backgroundColor: 'transparent'
    },
    Search: {
        marginLeft:'40px',
        display:'flex',
        alignItems:'center',
        '&>input' : {
            fontSize:'1.5em',
            width:'90%',
            maxWidth:'550px'
        },
        flexGrow:1
    },
    ClearIcon: {
        cursor: 'pointer',
        color: theme.foreground,
    },
    LeaveOpenCheck: {marginRight:'20px',display:'flex',width:'360px',flexShrink:1},
}));