import { useContext} from 'react';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';

import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './styles';

const Element = ({sym}) => {
    const classes = useStyles({sym}),
        { dispatch } = useContext(ctx),
        onDelete = () => dispatch({ type: ACTIONS.REMOVE_SYMBOL, payload: sym.id }),
        onClone = () => dispatch({ type: ACTIONS.CLONE_SYMBOL, payload: sym.id }),
        onTopZi = () => dispatch({ type: ACTIONS.MAX_ZI, payload: sym.id }),
        onBottomZi = () => dispatch({ type: ACTIONS.MIN_ZI, payload: sym.id }),
        onFocusToggle = () => dispatch({ type: ACTIONS.SYMBOL_FOCUS }),
        onAlignH = () => dispatch({ type: ACTIONS.ALIGN_H, payload: sym.id }),
        onAlignV = () => dispatch({ type: ACTIONS.ALIGN_V, payload: sym.id });
        
    return <div className={classes.Container}>
        <div className={classes.Left}>
            <div className={classes.Item}><DeleteIcon onClick={onDelete}/></div>
            <div className={classes.Item}><AdsClickIcon onClick={onFocusToggle}/></div>
            <div className={classes.Item}><ContentCopyIcon onClick={onClone}/></div>
            <div className={classes.Item}><VerticalAlignTopIcon onClick={onTopZi}/></div>
            <div className={classes.Item}><VerticalAlignBottomIcon onClick={onBottomZi}/></div>
            <div className={classes.Item}><AlignHorizontalCenterIcon onClick={onAlignH}/></div>
            <div className={classes.Item}><AlignVerticalCenterIcon onClick={onAlignV}/></div>
        </div>
        <div className={classes.Mid}>
            <div className={classes.Char}>{sym.char}</div>
        </div>
    </div>;
};

export default Element;