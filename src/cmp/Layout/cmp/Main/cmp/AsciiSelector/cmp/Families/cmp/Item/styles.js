import { createUseStyles } from 'react-jss';
import {ITEM_SIZE} from '../../../../../../../../../../constants';
export default createUseStyles(theme => ({
    Item: {
        lineHeight: `${ITEM_SIZE}px`,
        height: `${ITEM_SIZE}px`,
        width: `${ITEM_SIZE}px`,
        fontSize: '1em',
        marginRight:'10px',
        marginBottom:'10px',
        outline: `1px solid ${theme.modal.outline}`,
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: theme.modal.itemBackground,
        color: theme.modal.itemForeground,
        borderRadius: theme.radius.selectorModalItem,
        '&:hover': {
            fontWeight: 'bold',
            backgroundColor: theme.modal.itemBackgroundHover,
            outline: `4px solid ${theme.modal.hoverOutline}`,    
        }
    }
}));