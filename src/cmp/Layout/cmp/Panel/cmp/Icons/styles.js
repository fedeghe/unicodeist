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
        width:`${theme.spacing.xxxxlarge}px`
    },
    Check: {
        width:`${theme.spacing.xxxxlarge}px`,
        height:`${theme.spacing.xxxxlarge}px`,
        color:theme.foreground
    },
}));