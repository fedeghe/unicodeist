import { createUseStyles } from 'react-jss';
import bg from './../../../../../../../../img/asciist.png';
export default createUseStyles(theme => ({
    Logo: {
        flex:2,
        display:'flex',
        width:'200px',
        height:'100px',
        // backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center',
        backgroundImage: `url(${bg})`,
        outline: `1px dotted ${theme.foreground}`,
        borderRadius: '4px',
        cursor:({dragging, panning}) => {
            if (dragging) return 'move';
            if (panning) return 'ns-resize';
            
            return 'pointer';
        }
    }
}));