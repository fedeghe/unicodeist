import { useContext, useEffect, useCallback } from 'react';
import ctx from 'src/Context';
import useStyles from './styles';

import AsciiSelector from './cmp/AsciiSelector';
import AddButton from './cmp/AddButton';
import BulkActions from './cmp/BulkActions';
import Canvas from './cmp/Canvas';
import Zoom from './cmp/Zoom';
import ACTIONS from 'src/reducer/actions';

import Channel from '@fedeghe/channeljs';

const Main = () => {
    const classes = useStyles(),
        {
            state: {
                addPanelVisibility, fullscreen,
                selected, zoomLevel
            },
            dispatch
        } = useContext(ctx),
        togglePanel = useCallback(({ swapMode = false } = {}) =>
            dispatch({
                type: ACTIONS.TOGGLE_ADD_PANEL,
                payload: {
                    visibility: !addPanelVisibility,
                    swapMode
                }
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
        zoom = useCallback(key => {
                const type = {
                    '=': ACTIONS.ZOOM_IN,
                    '+': ACTIONS.ZOOM_IN,
                    '-': ACTIONS.ZOOM_OUT,
                    '_': ACTIONS.ZOOM_OUT,
                    '0': ACTIONS.ZOOM_ZERO,
                }[key];
                dispatch({ type });
            },
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
            if (!fullscreen && e.key === "Escape") { togglePanel(); e.preventDefault();return false;}

            
            // on shift+arrow move current target symbol
            if (
                e.shiftKey
                && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
            ){
                move(e.key); e.preventDefault();
            }
            // on shift+arrow move current target symbol
            if (
                e.metaKey
                && ["=", "+", "-", "_", "0"].includes(e.key)
            ){
                zoom(e.key); e.preventDefault();
            }
        }, [togglePanel, fullscreen]);

    // allow open panel in swap mode
    useEffect(() => {
        Channel.get('event').sub(
            'swap',
            () => togglePanel({ swapMode: true })
        );
        return () => Channel('event').unsub('swap');
    }, []);
    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return <div className={classes.Main}>
        {addPanelVisibility ? <AsciiSelector /> : <AddButton />}
        {Boolean(selected.length >= 2) && <BulkActions/>}
        <Zoom zoom={zoomLevel}/>
        <Canvas />
    </div>;
};
export default Main;