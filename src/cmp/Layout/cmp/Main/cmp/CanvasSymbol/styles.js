import { createUseStyles } from 'react-jss';
import {
    FADED_OPACITY
} from './../../../../../../constants';

export default createUseStyles({
    CanvasSymbol: ({isTarget, faded, ownOpacity, superFocus }) => { 
        const isSuperFocused = superFocus && isTarget;
        return {
            userSelect: 'none',
            display:'block',
            cursor: isTarget ? 'move' : 'default',
            pointerEvents: isTarget && !faded ? 'auto' : 'none',
            opacity : faded ? FADED_OPACITY : ownOpacity,
            ...(isSuperFocused && {
                '&:after': {
                    content: "%"
                }
            }),
        };
    }
});