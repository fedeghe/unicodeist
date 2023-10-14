import { useContext, useEffect, useCallback } from 'react';
import ctx from './../../../../Context';
import useStyles from './styles';

import AddPanel from './cmp/AsciiSelector';
import AddButton from './cmp/AddButton';
import Canvas from './cmp/Canvas';
import ACTIONS from './../../../../reducer/actions';
const Main = () => {
    const classes = useStyles();
    const { state: { addPanelVisibility }, dispatch } = useContext(ctx);

    const togglePanel = useCallback(() =>
        dispatch({
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: !addPanelVisibility
        }),
        [addPanelVisibility, dispatch]
    );
    // eslint-disable-next-line no-unused-vars
    const move = useCallback(key =>
        dispatch({
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: key
        }),
        [addPanelVisibility, dispatch]
    );
    const seekEsc = useCallback(e => {  
        if (e.key === "Escape") { togglePanel(); e.preventDefault();}
        if (e.shiftKey){
            ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
            && move(e.key); e.preventDefault();
        }
    }, [togglePanel]);
    useEffect(() => {
        document.addEventListener("keydown", seekEsc);
        return () => document.removeEventListener("keydown", seekEsc);
    }, [seekEsc]);

    return <div className={classes.Main}>
        {addPanelVisibility ? <AddPanel /> : <AddButton />}
        <Canvas />
    </div>;
};
export default Main;