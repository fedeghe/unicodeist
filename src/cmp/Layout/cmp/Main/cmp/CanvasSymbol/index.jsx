import {
    useCallback, useContext,
    useState
} from 'react'
import useStyles from './styles'

import ctx from './../../../../../../Context'
import ACTIONS from './../../../../../../reducer/actions'

const CanvasSymbol = ({symbol}) => {
    const {state: { focusedSymbolId}, dispatch} = useContext(ctx)
    const isTarget = focusedSymbolId===symbol.id
    const classes = useStyles({ isTarget })
    const {
        zIndex,
        left, top,
        color,
        fontSize,
        fontFamily,
        fontWeight,
        rotation,
        opacity,
    } = symbol
    const [startPoint, setStartPoint] = useState([left, top])

    const selectSymbol = useCallback(
        () => dispatch({
            type: ACTIONS.FOCUS_ON_SYMBOL,
            payload: symbol.id
        }),
        [dispatch, symbol.id]
    )
    const onDragStart = e => {
        setStartPoint([e.pageX, e.pageY])
    }
    const onDrag = e => {
        e.preventDefault()
    }
    const onDragEnd = e => {
        e.preventDefault();
        const [startX, startY] = startPoint
        dispatch({
            type: ACTIONS.TUNE_SYMBOL_POSITION,
            payload: {
                id: symbol.id,
                update: {
                    left: ~~e.pageX - ~~startX,
                    top: ~~e.pageY - ~~startY
                }
            }
        })
    }
    
    return <div
    style={{
        backgroundColor: 'transparent',
    }}
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
            left: `${left}px`,
            top: `${top}px`,
            color,
            fontSize: `${fontSize}px`,
            height: `${fontSize}px`,
            lineHeight: `${fontSize}px`,
            fontWeight,
            fontFamily,
            transform: `rotate(${rotation}deg)`,
            opacity,
            zIndex,
            backgroundColor: 'transparent'
        }}
    >{symbol.char}</div>
    </div>
}
export default CanvasSymbol