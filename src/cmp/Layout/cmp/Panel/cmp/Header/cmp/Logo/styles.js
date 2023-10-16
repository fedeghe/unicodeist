import { createUseStyles } from 'react-jss';
import bg from './../../../../../../../../img/unicodeist.png';
export default createUseStyles({
    Logo: {
        // flex:2,
        display:'flex',
        width:'200px',
        height:'100px',
        justifyContent:'center',
        alignItems:'center',
        backgroundImage: `url(${bg})`,
        backgroundSize: '200px 100px',
        cursor:({dragging, panning}) => {
            if (dragging) return 'move';
            if (panning) return 'ns-resize';
            
            return 'pointer';
        }
    }
});