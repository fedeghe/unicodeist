import { createUseStyles } from 'react-jss';
export default createUseStyles(theme => ({    
    AddButton: {
        position:'absolute',
        top: `${theme.spacing.small*2}px`,
        left: `${theme.spacing.small*2}px`,
        color: 'green',
        cursor:'pointer',
    },
}));