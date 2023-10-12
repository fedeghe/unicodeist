import { useState, useContext } from 'react';
import useStyles from './styles';
import ctx from '../../../../../../../../Context';
import ACTIONS from '../../../../../../../../reducer/actions';
const Logo = () => {
    const {dispatch} = useContext(ctx);
    const [startPoint, setStartPoint] = useState([0, 0]);
    const [dragging, setDragging] = useState(false);
    const [panning, setPanning] = useState(false);
    const classes = useStyles({ dragging, panning });
    const onDragStart = e => {
        const { shiftKey } = e;
        (shiftKey ? setPanning : setDragging)(true);
        setStartPoint([e.pageX, e.pageY]);
    };
    const discard = e => {
        const { shiftKey } = e;
        (shiftKey ? setPanning : setDragging)(false);
        e.preventDefault();
    };
    const onDragEnd = e => {
        const { shiftKey } = e;
        (shiftKey ? setPanning : setDragging)(false);
        
        const [startX, startY] = startPoint,
        endX = e.pageX,
        endY = e.pageY;

        shiftKey 
        ? dispatch({
            type: ACTIONS.PAN_ALL_SYMBOLS,
            payload: parseInt((endY - startY) / 10, 10)

        }):
        dispatch({
            type: ACTIONS.MOVE_ALL_SYMBOLS,
            payload: {
                leftTune: parseInt(endX - startX, 10),
                topTune: parseInt(endY - startY, 10)
            }
        });
    };
    
    return <div
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseLeave={discard}
        className={classes.Logo}
    />;
};

export default Logo;