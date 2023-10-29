import { useContext, useEffect, useCallback } from 'react';
import ctx from 'src/Context';
import useStyles from './styles';

import AsciiSelector from './cmp/AsciiSelector';
import AddButton from './cmp/AddButton';
import Canvas from './cmp/Canvas';
import ACTIONS from 'src/reducer/actions';

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
        onKeyDown = useCallback(e => {  
            //for the symbol search
            // if input text and not escape
            // allow the default (e.g. +shilf+a)
            if (e.target.tagName === 'INPUT'
                && e.target.type === 'text'
                && e.key !== "Escape"
            ) return e;

            // on escape toggle 
            if (e.key === "Escape") { togglePanel(); e.preventDefault();}

            // on shift+arrow move current target symbol
            if (
                e.shiftKey
                && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
            ){
                move(e.key); e.preventDefault();
            }
        }, [togglePanel]);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return <div className={classes.Main}>
        {addPanelVisibility ? <AsciiSelector /> : <AddButton />}
        <Canvas />
    </div>;
};
export default Main;