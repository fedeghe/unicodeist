import {
    useCallback, useContext,
    useState
} from 'react';

import useStyles from './styles';

import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';

const CanvasSymbol = ({symbol}) => {
    const {state: { focusedSymbolId}, dispatch} = useContext(ctx),
        isTarget = focusedSymbolId===symbol.id,
        {
            id, char, zIndex, left, top, color,
            faded,opacity, fontFamily, fontWeight,
            rotationX, rotationY, rotationZ,
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
        onDragStart = e => setStartPoint([e.pageX, e.pageY]),
        onDrag = e => e.preventDefault(),
        onDragEnd = e => {
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
                transformOrigin: 'center',
                transform: `
                    translate(${left}px,${top}px)
                    scale(${scale}) 
                    scaleX(${scaleX}) 
                    scaleY(${scaleY}) 
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