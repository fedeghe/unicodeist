import { createUseStyles } from 'react-jss';
import {
    FADED_OPACITY
} from './../../../../../../constants';

export default createUseStyles({
    CanvasSymbol: ({isTarget, faded, ownOpacity }) => ({
        userSelect: 'none',
        display:'block',
        cursor: isTarget ? 'move' : 'default',
        pointerEvents: isTarget && !faded ? 'auto' : 'none',
        opacity : faded ? FADED_OPACITY : ownOpacity,
    })
});