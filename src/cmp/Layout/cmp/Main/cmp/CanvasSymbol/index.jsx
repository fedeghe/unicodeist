import {
    useCallback, useContext,
    useState
} from 'react';

import useStyles from './styles';

import {FEATURE_FONTSIZE} from './../../../../../../constants';
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
        rotationX,
        rotationY,
        rotationZ,
        opacity,
        faded,
        scale,
        scaleX,
        scaleY,
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
                transform: `
                    translate(${left}px,${top}px)
                    ${rotationX ? `rotateX(${rotationX}deg)` : '' }  
                    ${rotationY ? `rotateY(${rotationY}deg)` : '' }  
                    ${rotationZ ? `rotateZ(${rotationZ}deg)` : '' }  
                    scale(${scale}) 
                    scaleX(${scaleX}) 
                    scaleY(${scaleY}) 
                `,
                color,
                ...(FEATURE_FONTSIZE && {
                    fontSize: `${fontSize}px`,
                    height: `${fontSize}px`,
                    lineHeight: `${fontSize}px`,
                }),
                fontWeight,
                fontFamily,
                zIndex,
                ...(!faded && opacity < 1 && {opacity}),
            }}
        >{char}</div>
    </div>;
};
export default CanvasSymbol;