import { createUseStyles } from 'react-jss';

export default createUseStyles({
    Container: {
        display:'flex',
        flexGrow:1,
        overflow: 'scroll',
        padding:'15px 10px',
        flexDirection:'column',
        position:'relative',
        paddingBottom:'100px',
        marginBottom:'20px'
    }
});