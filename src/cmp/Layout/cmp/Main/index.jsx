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
    const seekEsc = useCallback(e => {  
        // console.log(e);
        // if (e.key === "a" && e.metaKey) {
        if (e.key === "Escape") {
            togglePanel();
            e.preventDefault();
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