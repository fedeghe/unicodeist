import { createUseStyles } from 'react-jss'

// import { PANEL_WIDTH } from '../../../../../../constants'

export default createUseStyles({
    GlobalTools: {
        flex:1,
        display:'flex',
        flexWrap: 'wrap',
        
        alignItems:'center',
        justifyContent:'center',
        
    },
    Item: {
        // width: '50%',
        flexBasis: '33%',
        cursor:'pointer',
        display: 'flex',
        justifyContent:'space-around',
        alignSelf: 'center'
    }
})