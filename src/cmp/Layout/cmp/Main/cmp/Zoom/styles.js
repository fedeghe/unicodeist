import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
    Container: {
        zIndex:100,
        position:'absolute',
        display:'flex',
        alignContent:'center',
        alignItems:'center',
        top:`${theme.spacing.xxxlarge}px`,
        right:`${theme.spacing.xxxlarge}px`,     
    }
}));