import { createUseStyles } from 'react-jss';
import {ITEM_HEIGHT, ITEM_WIDTH, ITEM_FOOTER_HEIGHT, ITEM_FONTSIZE} from 'src/constants';
export default createUseStyles(theme => ({
    Item: {
        lineHeight: `${ITEM_WIDTH}px`,
        height: `${ITEM_HEIGHT}px`,
        width: `${ITEM_WIDTH}px`,
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
        position:'relative', //needed for the hovering 
        zIndex:100,
        '&:hover': {
            opacity: 1,
            color: theme.modal.itemForegroundOver,
            backgroundColor: theme.modal.itemBackgroundHover,
            outline: `4px solid ${theme.modal.hoverOutline}`,
            transform: 'scale(2)',
            zIndex:101
        }
    },
    Char: {
        height: `${ITEM_HEIGHT-ITEM_FOOTER_HEIGHT}px`
    },
    List: {
        padding:0,
        margin:0,
        height: `${ITEM_FOOTER_HEIGHT}px`,
        display:'flex',
        borderTop:'1px solid gray',
        position:'relative',
        bottom:0,
        // backgroundColor: theme.modal.itemBackgroundHover
    },
    Col: {
        display:'flex',
        flexDirection:'column'
    },
    Small: {
        textAlign: 'left',
        paddingLeft:'5px',
        fontSize:'0.3rem',
        lineHeight:'6px',
        
    },
    Bold: {
        fontWeight:'bold',
        display:'inline-block',
        marginRight:'0.5em'
    }
}));