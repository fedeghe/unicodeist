/* eslint-disable no-unused-vars */
import { createUseStyles } from 'react-jss';
import bg from './../../../../../../../../img/unicodeist.png';
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
        backgroundSize: '200px 100px',
        // outline: `1px dotted ${theme.foreground}`,
        // borderRadius: '4px',
        cursor:({dragging, panning}) => {
            if (dragging) return 'move';
            if (panning) return 'ns-resize';
            
            return 'pointer';
        }
    }
}));