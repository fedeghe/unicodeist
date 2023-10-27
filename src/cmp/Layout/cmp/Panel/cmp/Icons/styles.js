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
    Separator: {
        width: 0,
        borderLeft:`1px dotted gray`,
        height:'30px'
    },
    BgAlpha: {
        color:theme.foreground
    },
}));