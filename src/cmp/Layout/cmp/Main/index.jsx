import { useContext, useEffect, useCallback } from 'react';
import ctx from './../../../../Context';
import useStyles from './styles';

import AddPanel from './cmp/AsciiSelector';
import AddButton from './cmp/AddButton';
import Canvas from './cmp/Canvas';
import ACTIONS from './../../../../reducer/actions';
const Main = () => {
    const classes = useStyles(),
        { state: { addPanelVisibility }, dispatch } = useContext(ctx),
        togglePanel = useCallback(() =>
            dispatch({
                type: ACTIONS.TOGGLE_ADD_PANEL,
                payload: !addPanelVisibility
            }),
            [addPanelVisibility, dispatch]
        ),
        move = useCallback(key =>
            dispatch({
                type: ACTIONS.MOVE_TARGET_ONE_PX,
                payload: key
            }),
            [addPanelVisibility, dispatch]
        ),
        seekWhat = useCallback(e => {  
            if (e.target.tagName === 'INPUT') return e;
            if (e.key === "Escape") { togglePanel(); e.preventDefault();}
            if (e.shiftKey){
                ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
                && move(e.key); e.preventDefault();
            }
        }, [togglePanel]);

    useEffect(() => {
        document.addEventListener("keydown", seekWhat);
        return () => document.removeEventListener("keydown", seekWhat);
    }, [seekWhat]);

    return <div className={classes.Main}>
        {addPanelVisibility ? <AddPanel /> : <AddButton />}
        <Canvas />
    </div>;
};
export default Main;