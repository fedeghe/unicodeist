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
    const move = useCallback(dir =>
        dispatch({
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: dir
        }),
        [addPanelVisibility, dispatch]
    );
    const seekEsc = useCallback(e => {  
        if (e.key === "Escape") { togglePanel(); e.preventDefault();}
        if (e.key === "ArrowUp") { move('up'); e.preventDefault();}
        if (e.key === "ArrowDown") { move('down'); e.preventDefault();}
        if (e.key === "ArrowLeft") { move('left'); e.preventDefault();}
        if (e.key === "ArrowRight") { move('right'); e.preventDefault();}
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