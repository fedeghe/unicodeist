import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
    Dialog: {
        width:'400px',
        padding: '2em',
    },
    SpaceUp: {
        marginTop: '1em'
    },
    DownloadButton: {
        marginTop:'1em'
    },
    Warn: {
        color:'orange',
        fontWeight:900
    },
    Compliant: {
        fontSize:'0.7em',
        marginLeft:'2em',
        display:'inline-block',
        '&:before': {
            content: `' ☞ '`,
            fontSize: '2em',
            position:'relative',
            top:`${theme.spacing.small/2}px`
        },
    }
}));