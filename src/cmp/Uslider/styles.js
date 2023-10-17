import { createUseStyles } from 'react-jss';

export default createUseStyles({
    Box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight:''
    },

    Label: {//
        marginRight: '10px',
        fontWeight: 'bold'
    },
    Input: {
        width: '60px',
        height:'inherit',
        border: 'none',
        borderBottom: '1px solid red'
    },
    Range: {
        width:'80px'
    }
});