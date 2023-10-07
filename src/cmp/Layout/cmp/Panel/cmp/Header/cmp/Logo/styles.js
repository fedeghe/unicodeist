import { createUseStyles } from 'react-jss';
import bg from './../../../../../../../../img/asciist.png';
export default createUseStyles({
    Logo: {
        flex:2,
        display:'flex',
        width:'200px',
        height:'100px',
        // backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center',
        backgroundImage: `url(${bg})`
    }
});