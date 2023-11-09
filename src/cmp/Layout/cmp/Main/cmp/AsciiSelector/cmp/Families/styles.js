import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    Container: {
        display:'flex',
        flexGrow:1,
        overflow: 'scroll',
        padding:`${theme.spacing.large}px ${theme.spacing.small}px`,
        flexDirection:'column',
        position:'relative',
        paddingBottom:'100px',
        marginBottom:`${theme.spacing.small*2}px`
    }
}));