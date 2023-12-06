import { useContext, useEffect, useCallback } from 'react';
import ctx from 'src/Context';
import { SHOW_UNDO_ICON } from 'src/constants';
import useStyles from './styles';

import AsciiSelector from './cmp/AsciiSelector';
import AddButton from './cmp/AddButton';
import BulkActions from './cmp/BulkActions';
import Canvas from './cmp/Canvas';
import Zoom from './cmp/Zoom';
import Undo from './cmp/Undo';
import ACTIONS from 'src/reducer/actions';

import Channeljs from '@fedeghe/channeljs';

const Main = () => {
    const classes = useStyles(),
        {
            state: {
                addPanelVisibility, fullscreen,
                selected, zoomLevel,
                canUndo, undos,
                arrowEventsActive
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
        move = useCallback((key, multiplier) =>
            dispatch({
                type: ACTIONS.MOVE_TARGET_ONE_PX,
                payload: {
                    key,
                    multiplier
                }
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
        resetZoom = () => dispatch({ type: ACTIONS.ZOOM_ZERO }),
        undo = () => dispatch({ type: ACTIONS.UNDO }),
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
                arrowEventsActive
                && (e.shiftKey || e.metaKey)
                && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
            ){
                move(e.key, e.metaKey); e.preventDefault();
            }
            // on shift+arrow move current target symbol
            if (
                e.metaKey
                && ["=", "+", "-", "_", "0"].includes(e.key)
            ){
                zoom(e.key); e.preventDefault();
            }
            if (
                
                e.metaKey
                && e.key === "z"
            ){
                undo(); e.preventDefault();
            }
        }, [togglePanel, fullscreen, arrowEventsActive]);

    // allow open panel in swap mode
    useEffect(() => {
        Channeljs.get('event').sub(
            'swap',
            () => togglePanel({ swapMode: true })
        );
        return () => Channeljs('event').unsub('swap');
    }, []);
    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return <div className={classes.Main}>
        {addPanelVisibility ? <AsciiSelector /> : <AddButton />}
        {Boolean(selected.length >= 2) && <BulkActions/>}
        <Zoom zoom={zoomLevel} reset={resetZoom}/>
        {SHOW_UNDO_ICON && canUndo && <Undo undo={undo} undos={undos} />}
        <Canvas />
    </div>;
};
export default Main;