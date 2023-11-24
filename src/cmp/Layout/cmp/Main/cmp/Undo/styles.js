import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
    Container: {
        zIndex:100,
        position:'absolute',
        display:'flex',
        alignContent:'center',
        alignItems:'center',
        bottom:`${theme.spacing.xxxlarge}px`,
        left:`${theme.spacing.xxxlarge}px`,
        cursor:'pointer'    
    }
}));