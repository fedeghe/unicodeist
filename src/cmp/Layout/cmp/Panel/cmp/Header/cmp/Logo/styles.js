import { createUseStyles } from 'react-jss';
import bg from 'src/img/comparison/unicodeist.png';
export default createUseStyles({
    Logo: {
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