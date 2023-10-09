import { useState, useContext } from 'react';
import useStyles from './styles';
import ctx from '../../../../../../../../Context';
import ACTIONS from '../../../../../../../../reducer/actions';
const Logo = () => {
    const {dispatch} = useContext(ctx);
    const [startPoint, setStartPoint] = useState([0, 0]);
    const [dragging, setDragging] = useState(false);
    const classes = useStyles({ dragging });
    const onDragStart = e => {
        setDragging(true);
        setStartPoint([e.pageX, e.pageY]);
    };
    const discard = e => {
        setDragging(false);
        e.preventDefault();
    };
    const onDragEnd = e => {
        setDragging(false);
        const [startX, startY] = startPoint,
            endX = e.pageX,
            endY = e.pageY;
        dispatch({
            type: ACTIONS.MOVE_ALL_SYMBOLS,
            payload: {
                leftTune: endX - startX,
                topTune: endY - startY
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