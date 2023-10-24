import { createUseStyles } from 'react-jss';
import {HEADER_HEIGHT} from 'src/constants';


export default createUseStyles({
    PanelHeader: {
        display:'flex', 
        flexDirection:'column',
        height:`${HEADER_HEIGHT}px`,
        minHeight:`${HEADER_HEIGHT}px`,
        // marginBottom:'1em'
    },
    Hr: {
        width:'100%',
        height:0,
        border:'none',
        borderTop: '1px dotted gray'
    }
});