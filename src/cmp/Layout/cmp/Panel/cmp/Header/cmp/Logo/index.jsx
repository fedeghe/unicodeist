import { useState, useContext } from 'react';

import useStyles from './styles';
import ctx from '../../../../../../../../Context';
import ACTIONS from '../../../../../../../../reducer/actions';

const Logo = () => {
    const {dispatch} = useContext(ctx),
        [startPoint, setStartPoint] = useState([0, 0]),
        [dragging, setDragging] = useState(false),
        [panning, setPanning] = useState(false),
        classes = useStyles({ dragging, panning }),
        onDragStart = e => {
            const { shiftKey } = e;
            (shiftKey ? setPanning : setDragging)(true);
            setStartPoint([e.pageX, e.pageY]);
        },
        discard = e => {
            const { shiftKey } = e;
            (shiftKey ? setPanning : setDragging)(false);
            e.preventDefault();
        },
        onDragEnd = ({pageX, pageY, shiftKey}) => {
            (shiftKey ? setPanning : setDragging)(false);
            const [startX, startY] = startPoint;
            shiftKey 
                ? dispatch({
                    type: ACTIONS.PAN_ALL_SYMBOLS,
                    payload: parseInt((pageY - startY) / 10, 10)
                })
                : dispatch({
                    type: ACTIONS.MOVE_ALL_SYMBOLS,
                    payload: {
                        leftTune: parseInt(pageX - startX, 10),
                        topTune: parseInt(pageY - startY, 10)
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