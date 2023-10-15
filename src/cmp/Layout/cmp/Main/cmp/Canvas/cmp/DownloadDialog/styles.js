import { createUseStyles } from 'react-jss';

export default createUseStyles({

    Dialog: {
        width:'400px',
        padding: '2em',
        backgroundColor: '#eeeeee'
    },
    SpaceUp: {
        marginTop: '1em'
    },
    TopMargined: {
        marginTop: '4em'
    },
    Code: {
        marginBottom: '0.5em',
        marginTop: '2em',
        backgroundColor: '#ffffff',
        overflow: 'auto',
        padding: '1em',
        borderRadius: '3px',
        maxHeight:'300px',
    },
    DownloadButton: {
        marginTop:'1em'
    },
    Warn: {
        color:'red',
        fontWeight:900
    }
});