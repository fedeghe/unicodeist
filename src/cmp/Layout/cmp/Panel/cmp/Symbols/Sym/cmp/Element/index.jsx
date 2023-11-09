import { useContext } from 'react';
import Channeljs from '@fedeghe/channeljs';
import Tooltip from '@mui/material/Tooltip';

import AdsClickIcon from '@mui/icons-material/AdsClick';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import StyleIcon from '@mui/icons-material/Style';

import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './styles';

const Element = ({ sym }) => {
    const classes = useStyles({ sym }),
        { dispatch } = useContext(ctx),
        onDelete = () => dispatch({ type: ACTIONS.REMOVE_SYMBOL }),
        onClone = () => dispatch({ type: ACTIONS.CLONE_SYMBOL }),
        onTopZi = () => dispatch({ type: ACTIONS.MAX_ZI }),
        onBottomZi = () => dispatch({ type: ACTIONS.MIN_ZI }),
        onFocusToggle = () => dispatch({ type: ACTIONS.SYMBOL_FOCUS }),
        onAlignH = () => dispatch({ type: ACTIONS.ALIGN_H }),
        onAlignV = () => dispatch({ type: ACTIONS.ALIGN_V }),
        onShadow = () => Channeljs.get('event').pub('shadowEditor');

    return <div className={classes.Container}>
        <div className={classes.Left}>
            <Tooltip title="remove symbol">
                <div className={classes.Item}><DeleteIcon onClick={onDelete} /></div>
            </Tooltip>
            <Tooltip title="focus on this">
                <div className={classes.Item}><AdsClickIcon onClick={onFocusToggle} /></div>
            </Tooltip>
            <Tooltip title="maximize z-index">
                <div className={classes.Item}><VerticalAlignTopIcon onClick={onTopZi} /></div>
            </Tooltip>
            <Tooltip title="minimize z-index">
                <div className={classes.Item}><VerticalAlignBottomIcon onClick={onBottomZi} /></div>
            </Tooltip>
            <Tooltip title="align horizontally">
                <div className={classes.Item}><AlignHorizontalCenterIcon onClick={onAlignH} /></div>
            </Tooltip>
            <Tooltip title="align vertically">
                <div className={classes.Item}><AlignVerticalCenterIcon onClick={onAlignV} /></div>
            </Tooltip>
            <Tooltip title="clone symbol">
                <div className={classes.Item}><ContentCopyIcon onClick={onClone} /></div>
            </Tooltip>
            <Tooltip title="open additional styles editor">
                <div className={classes.Item}><StyleIcon onClick={onShadow} /></div>
            </Tooltip>
        </div>
        <div className={classes.Mid}>
            <div className={classes.Char}>{sym.char}</div>
        </div>
    </div>;
};

export default Element;