import { useContext} from 'react'


import ctx from '../../../../../../../../../Context'
import ACTIONS from '../../../../../../../../../reducer/actions'

// import LockIcon from '@mui/icons-material/Lock';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import useStyles from './styles'
const Element = ({sym}) => {
    const classes = useStyles({sym})
    const { dispatch } = useContext(ctx)
    const onDelete = () => {
        dispatch({
            type: ACTIONS.REMOVE_SYMBOL,
            payload: sym.id
        })
    }
    const onClone = () => {
        dispatch({
            type: ACTIONS.CLONE_SYMBOL,
            payload: sym.id
        })
    }
    const onTopZi = () => {
        dispatch({
            type: ACTIONS.MAX_ZI,
            payload: sym.id
        })
    }
    const onBottomZi = () => {
        dispatch({
            type: ACTIONS.MIN_ZI,
            payload: sym.id
        })
    }
    const onFocusToggle = () => {
        dispatch({
            type: ACTIONS.SYMBOL_FOCUS,
        })
    }
    return <div className={classes.Container}>
        <div className={classes.Left}>
            {/* <div className={classes.Disabled}><LockIcon /></div> */}
            
            <div className={classes.Item}><AdsClickIcon onClick={onFocusToggle}/></div>

            <div className={classes.Item}><DeleteIcon onClick={onDelete}/></div>
            <div className={classes.Item}><ContentCopyIcon onClick={onClone}/></div>
            <div className={classes.Item}><VerticalAlignTopIcon onClick={onTopZi}/></div>
            <div className={classes.Item}><VerticalAlignBottomIcon onClick={onBottomZi}/></div>
        </div>
        <div className={classes.Mid}>
            <div className={classes.Sym}>{sym.char}</div>
        </div>
        
    </div>
}

export default Element