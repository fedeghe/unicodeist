import { createUseStyles } from 'react-jss';



export default createUseStyles({
    PanelHeader: {
        display:'flex', 
        flexDirection:'row',
        height:'100px',
        minHeight:'100px',
        marginBottom:'1em'
    },
    Hr: {
        width:'100%',
        height:0,
        border:'none',
        borderTop: '1px dotted gray'
    }
});