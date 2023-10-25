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
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'flex-start', 
    },
    'In' :{
        display:'flex',
        alignItems:'center',
        '&>input' : {
            fontSize:'1.5em',
            width:'90%',
            maxWidth:'350px'
        },
    },
    ClearIcon: {
        cursor: 'pointer',
        color: theme.foreground,
    },
    LeaveOpenCheck: {
        marginRight:'20px',
        display:'flex',
        flexShrink:1
    },
    Spinner: {
        marginLeft:'1em'
    }
}));