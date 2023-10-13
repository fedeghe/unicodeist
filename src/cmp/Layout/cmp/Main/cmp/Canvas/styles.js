import { createUseStyles } from 'react-jss';

export default createUseStyles({
    Canvas: {
        position: 'relative',
        userSelect: 'none'
    },
    Dialog: {
        padding: '2em',
        backgroundColor: '#eeeeee'
    },
    Code: {
        marginBottom: '0em',
        marginTop: '2em',
        backgroundColor: '#ffffff',
        overflow: 'auto',
        padding: '1em',
        borderRadius: '3px',
        maxHeight:'300px',
    }
});