/* eslint-disable no-unused-vars */
import {
    useCallback, useContext,
    useState
} from 'react';

import useStyles from './styles';

import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';

const CanvasSymbol = ({symbol}) => {
    const {state: { focusedSymbolId}, dispatch} = useContext(ctx),
        [dragging, setDragging] = useState(false),
        [pos, setPos] = useState([symbol.left, symbol.top]),
        isTarget = focusedSymbolId===symbol.id,
        {
            id, char, zIndex, left, top, color,
            faded,opacity, fontFamily, fontWeight,
            rotationX, rotationY, rotationZ,
            skewX, skewY,
            scale, scaleX, scaleY,
        } = symbol,
        classes = useStyles({
            isTarget,
            faded,
            ownOpacity: opacity
        }),
        [startPoint, setStartPoint] = useState([left, top]),
        selectSymbol = useCallback(
            () => dispatch({
                type: ACTIONS.FOCUS_ON_SYMBOL,
                payload: id
            }),
            [dispatch, id]
        ),
        onDragStart = e => {
            setDragging(true);
            e.dataTransfer.effectAllowed = "move";
            setStartPoint([e.pageX, e.pageY]);
        },
        onDrag = e => {
            setPos([e.pageX, e.pageY]);
            e.preventDefault();
        },
        onDragEnd = e => {
            setDragging(false);
            e.preventDefault();
            const [startX, startY] = startPoint;
            dispatch({
                type: ACTIONS.TUNE_SYMBOL_POSITION,
                payload: {
                    id,
                    update: {
                        left: parseInt(pos[0], 10) - parseInt(startX, 10),
                        top: parseInt(pos[1], 10) - parseInt(startY, 10)
                    }
                }
            });
        };    

    return <div
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrag={onDrag}
            draggable={isTarget}
            style={{
                position:'relative',
                ...(dragging && {zIndex:1})
            }}
        >
        <div
            className={classes.CanvasSymbol}
            onClick={selectSymbol}
            style={{
                position:'absolute',
                transformOrigin: 'center',
                transform: `
                    translate(${left}px,${top}px)
                    scale(${scale}) 
                    scaleX(${scaleX}) 
                    scaleY(${scaleY}) 
                    ${(skewX || skewY) ? `skew(${skewX}deg,${skewY}deg)` : '' }  
                    ${rotationX ? `rotateX(${rotationX}deg)` : '' }  
                    ${rotationY ? `rotateY(${rotationY}deg)` : '' }  
                    ${rotationZ ? `rotateZ(${rotationZ}deg)` : '' }  
                `,
                color,
                fontWeight,
                fontFamily,
                zIndex,
                ...(!faded && opacity < 1 && {opacity}),
            }}
        >{char}</div>
    </div>;
};
export default CanvasSymbol;