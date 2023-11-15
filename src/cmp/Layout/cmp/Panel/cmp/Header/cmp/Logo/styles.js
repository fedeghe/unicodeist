import { createUseStyles } from 'react-jss';
import bg from 'src/img/comparison/unicodeistLogo.png';
export default createUseStyles({
    Logo: {
        position:'relative',
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
    },
    Badge: {
        position:'absolute',
        left:'10px',
        top:'10px',
        width:'20px',
        hright:'20px',
        borderRadius:'10px',
        backgroundColor:'yellow',
        color:'black',
        fontWeight:'bold',
        textAlign:'center'
    }
});