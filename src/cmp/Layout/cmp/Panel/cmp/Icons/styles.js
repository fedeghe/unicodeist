import { createUseStyles } from 'react-jss';

export default createUseStyles({
    UnderLogo: {
        
        display:'flex',
        
        alignItems:'center',
        justifyContent:'space-evenly',
        // marginTop:'1em'
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
    AlphaSlider: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'30px'
    }
    
});