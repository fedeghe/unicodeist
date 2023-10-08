import {
    useCallback, useContext,
    useState
} from 'react';
import useStyles from './styles';

import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';

const CanvasSymbol = ({symbol}) => {
    const {state: { focusedSymbolId}, dispatch} = useContext(ctx);
    const isTarget = focusedSymbolId===symbol.id;
    
    const {
        id,
        char,
        zIndex,
        left, top,
        color,
        fontSize,
        fontFamily,
        fontWeight,
        rotation,
        opacity,
        faded,
        scale
    } = symbol;
    const classes = useStyles({
        isTarget,
        faded,
        ownOpacity: opacity
    });
    const [startPoint, setStartPoint] = useState([left, top]);

    const selectSymbol = useCallback(
        () => dispatch({
            type: ACTIONS.FOCUS_ON_SYMBOL,
            payload: id
        }),
        [dispatch, id]
    );
    const onDragStart = e => {
        setStartPoint([e.pageX, e.pageY]);
    };
    const onDrag = e => {
        e.preventDefault();
    };
    const onDragEnd = e => {
        e.preventDefault();
        const [startX, startY] = startPoint;
        dispatch({
            type: ACTIONS.TUNE_SYMBOL_POSITION,
            payload: {
                id,
                update: {
                    left: parseInt(e.pageX, 10) - parseInt(startX, 10),
                    top: parseInt(e.pageY, 10) - parseInt(startY, 10)
                }
            }
        });
    };
    
    return <div
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrag={onDrag}
            draggable={isTarget}
        >
        <div
            className={classes.CanvasSymbol}
            onClick={selectSymbol}
            
            style={{
                position:'absolute',
                
                // left: `${left}px`,
                // top: `${top}px`,
                transformOrigin: 'center',
                transform: `translate(${left}px,${top}px) ${rotation ? `rotate(${rotation}deg)` : '' }  scale(${scale})`,
                color,

                fontSize: `${fontSize}px`,
                height: `${fontSize}px`,
                lineHeight: `${fontSize}px`,

                fontWeight,
                fontFamily,
                zIndex,
                ...(!faded && opacity < 1 && {opacity}),
            }}
        >{char}</div>
    </div>;
};
export default CanvasSymbol;