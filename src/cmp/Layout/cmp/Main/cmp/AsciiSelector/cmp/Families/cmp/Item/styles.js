import { createUseStyles } from 'react-jss';
import {ITEM_SIZE, ITEM_FONTSIZE} from '../../../../../../../../../../constants';
export default createUseStyles(theme => ({
    Item: {
        lineHeight: `${ITEM_SIZE/2}px`,
        height: `${ITEM_SIZE}px`,
        width: `${ITEM_SIZE}px`,
        fontSize: `${ITEM_FONTSIZE}`,
        marginRight:'10px',
        marginBottom:'10px',
        outline: `1px solid ${theme.modal.outline}`,
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: theme.modal.itemBackground,
        color: theme.modal.itemForeground,
        borderRadius: theme.radius.selectorModalItem,
        opacity:0.8,
        display:'inline-block',
        position:'relative',
        zIndex:100,
        // transition: `opacity  ${COLLAPSING_SELECTOR_TIME}s`,
        '&:hover': {
            opacity: 1,
            color: theme.modal.itemForegroundOver,
            backgroundColor: theme.modal.itemBackgroundHover,
            outline: `4px solid ${theme.modal.hoverOutline}`,
            transform: 'scale(2)',
            zIndex:101
        }
    },
    Small: {
        fontSize:'0.5rem',
        lineHeight:'10px'
    }
}));