import { createUseStyles } from 'react-jss';

export default createUseStyles({
    Container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        position:'relative'
    },
    Editor1:{
        display:'flex',
        maxHeight:'200px',
        overflow:'scroll',
        margin:'10px',
        flexShrink: 1
    },

    Bottom: {
        width:'100%',
        backgroundColor: 'white',
        display:'flex',
        justifyContent:'space-between',
    },
    Head: {
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
    
    CloseIcon: {
        cursor: 'pointer',
        marginTop: '5px',
        marginLeft: '20px'
    }
});