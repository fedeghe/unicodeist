import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    Root: {
        overflow: 'hidden',
        display:'flex',
        fontFamily: 'verdana',
        color: theme.foreground,
        backgroundColor: theme.background.main
    },
}));