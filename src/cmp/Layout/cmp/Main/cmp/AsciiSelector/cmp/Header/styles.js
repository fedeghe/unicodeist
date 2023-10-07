import { createUseStyles } from 'react-jss'
import {ITEM_SIZE} from './../../../../../../../../constants'
export default createUseStyles(theme => ({
    Container: {
        display:'flex',
        justifyContent:'space-between',
        height:'80px',
        minHeight: '80px',
        alignItems: 'center'
    },
    RightSide: {marginLeft:'16px', display:'flex',alignItems:'center'},
    CloseButton: {
        position:'relative',
        color: 'red',
        cursor:'pointer',
        display:'flex',
        backgroundColor: 'transparent'
    },
    Search: {marginLeft:'20px', display:'flex', selfAlign:'center'},
    ClearIcon: {cursor: 'pointer', color:'white'},
    LeaveOpenCheck: {marginRight:'20px'},
    CloseIcon: {fontSize: '3em'}
}))