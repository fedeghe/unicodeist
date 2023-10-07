import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) =>({
    Main: {
        flexGrow:1,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.background.main,
        position:'relative',
        
    },

}));