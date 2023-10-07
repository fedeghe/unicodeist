import { createUseStyles } from 'react-jss';

export default createUseStyles({
    GlobalTools: {
        flex:1,
        display:'flex',
        flexWrap: 'wrap',
        
        alignItems:'center',
        justifyContent:'center',
    },
    Item: {
        flexBasis: '33%',
        cursor:'pointer',
        display: 'flex',
        justifyContent:'space-around',
        alignSelf: 'center'
    }
});