import { createUseStyles } from 'react-jss'

export default createUseStyles({

    CanvasSymbol: ({isTarget}) => ({
        // outline: isTarget ? '1px solid black' : 'none',
        userSelect: 'none',
        
        cursor: isTarget ? 'move' : 'default',
        pointerEvents: isTarget ? 'auto' : 'none',
    })
})