import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    UnderLogo: {
        display:'flex',
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    Pointer: {
        cursor:'pointer'
    },
    ColorPicker: {
        width:'28px'
    },
    Check: {
        width:'28px',
        height:'28px',
        color:theme.foreground
    },
}));