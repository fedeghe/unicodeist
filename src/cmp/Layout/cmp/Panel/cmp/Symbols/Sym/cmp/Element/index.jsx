import { useContext } from 'react';
import Channeljs from '@fedeghe/channeljs';
import Tooltip from '@mui/material/Tooltip';
import {
    AdsClick as AdsClickIcon,
    Delete as DeleteIcon,
    ContentCopy as ContentCopyIcon,
    VerticalAlignTop as VerticalAlignTopIcon,
    VerticalAlignBottom as VerticalAlignBottomIcon,
    AlignHorizontalCenter as AlignHorizontalCenterIcon,
    AlignVerticalCenter as AlignVerticalCenterIcon,
    ChangeCircle as ChangeCircleIcon,
    Style as StyleIcon
} from '@mui/icons-material';

import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './styles';

const Element = ({ sym }) => {
    const classes = useStyles({ sym }),
        { dispatch } = useContext(ctx),
        { char } = sym,
        onDelete = () => dispatch({ type: ACTIONS.REMOVE_SYMBOL }),
        onClone = () => dispatch({ type: ACTIONS.CLONE_SYMBOL }),
        onTopZi = () => dispatch({ type: ACTIONS.MAX_ZI }),
        onBottomZi = () => dispatch({ type: ACTIONS.MIN_ZI }),
        onFocusToggle = () => dispatch({ type: ACTIONS.SYMBOL_FOCUS }),
        onAlignH = () => dispatch({ type: ACTIONS.ALIGN_H }),
        onAlignV = () => dispatch({ type: ACTIONS.ALIGN_V }),
        onShadow = () => Channeljs.get('event').pub('shadowEditor'),
        onSwap = () => Channeljs.get('event').pub('swap');

    return <div className={classes.Container}>
        <div className={classes.Left}>
            <Tooltip disableInteractive title="clone symbol">
                <div className={classes.Item}><ContentCopyIcon onClick={onClone} /></div>
            </Tooltip>
            <Tooltip disableInteractive title="remove symbol">
                <div className={classes.Item}><DeleteIcon onClick={onDelete} /></div>
            </Tooltip>
            <Tooltip disableInteractive title="focus on this">
                <div className={classes.Item}><AdsClickIcon onClick={onFocusToggle} /></div>
            </Tooltip>
            <div className={classes.LB}/>
            <Tooltip disableInteractive title="maximize z-index">
                <div className={classes.Item}><VerticalAlignTopIcon onClick={onTopZi} /></div>
            </Tooltip>
            <Tooltip disableInteractive title="minimize z-index">
                <div className={classes.Item}><VerticalAlignBottomIcon onClick={onBottomZi} /></div>
            </Tooltip>
            <div className={classes.LB}/>
            <Tooltip disableInteractive title="align horizontally">
                <div className={classes.Item}><AlignHorizontalCenterIcon onClick={onAlignH} /></div>
            </Tooltip>
            <Tooltip disableInteractive title="align vertically">
                <div className={classes.Item}><AlignVerticalCenterIcon onClick={onAlignV} /></div>
            </Tooltip>
            <div className={classes.LB}/>
            <Tooltip disableInteractive title="open additional styles editor">
                <div className={classes.Item}><StyleIcon onClick={onShadow} /></div>
            </Tooltip>
            <Tooltip disableInteractive title="change symbol">
                <div className={classes.Item}><ChangeCircleIcon onClick={onSwap} /></div>
            </Tooltip>
        </div>
        <div className={classes.Mid}>
            <div className={classes.Char}>{char}</div>
        </div>
    </div>;
};

export default Element;