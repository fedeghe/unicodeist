import {useRef, useContext, useMemo, useEffect, useState, useCallback} from 'react';
import Channel from '@fedeghe/channeljs';
import Dialog from '@mui/material/Dialog';

import copy from 'copy-to-clipboard';
import Button from '@mui/material/Button';
import CanvasSymbol from './../CanvasSymbol';
import CopyDone from './../CopyDone';


import ctx from './../../../../../../Context';
import ACTIONS from './../../../../../../reducer/actions';
import { cleanCode, getUnicodeistScriptTag } from './../../../../../../utils';

import useStyles from './styles';

const Canvas = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {
        state: {
            width, height,
            symbols,
            backgroundColor,
            embedModalVisibility
        },
        state,
        dispatch
    } = useContext(ctx);
    const ref = useRef();
    const setEmbedModalVisibility = useCallback(visibility => {
        dispatch({
            type: ACTIONS.SET_EMBED_MODAL_VISIBILITY,
            payload : typeof visibility !== 'undefined'
                ? visibility :
                !embedModalVisibility
        });
    }, [dispatch, embedModalVisibility]);

    const [embedCode, setEmbedCode] = useState('');
    const [scriptCode, setScriptCode] = useState('');

    useEffect(() => {
        const embed = () => {
            const code = cleanCode(ref.current.outerHTML);
            setEmbedCode(code);
            setScriptCode(getUnicodeistScriptTag(state));
            setEmbedModalVisibility(!!(ref?.current?.outerHTML));
        },
        mailto = () => {
            const code = cleanCode(ref.current.outerHTML);
            window.open(`mailto:your@friend.com?subject=Unicodeist&body=${code}`);
        };
        if (ref.current) {
            Channel.get('event').sub('embed', embed);
            Channel.get('event').sub('mailto', mailto);
        } 
        return () => {
            Channel.get('event').unsub('embed', embed);
            Channel.get('event').unsub('mailto', mailto);
        };
    }, [ref, setEmbedModalVisibility, state]);

    const refStyles = useMemo(() => ({
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor,
        position:'relative',
        overflow: 'hidden'
    }), [height, width, backgroundColor]);
    const onDragOver = e => {
        e.preventDefault();
    };
    const onClose = useCallback(
        () => setEmbedModalVisibility(false),
        [setEmbedModalVisibility]
    );
    const onCopyTag = useCallback(() => {
        copy(embedCode);
        onClose();
        setOpen(true);
    }, [embedCode, onClose]);
    const onCopyScript = useCallback(() => {
        copy(scriptCode);
        onClose();
        setOpen(true);
    }, [scriptCode, onClose]);
    return (
        <div>
            <Dialog open={embedModalVisibility} onClose={onClose}>
                <div className={classes.Dialog}>
                    <div className={classes.Code}>
                        <code>{embedCode}</code>
                    </div>
                    <Button variant="contained" onClick={onCopyTag}>Copy</Button>                    
                    <div className={classes.Code}>
                        <code>{scriptCode}</code>
                    </div>
                    <Button variant="contained" onClick={onCopyScript}>Copy</Button>
                </div>
            </Dialog>
            <div ref={ref} style={refStyles} onDragOver={onDragOver}>
                {symbols.map(symbol => <CanvasSymbol key={symbol.id} symbol={symbol}/>)}
            </div>
            {open && <CopyDone message="Code copied to clipboard"  onClose={onClose} open={open} setOpen={setOpen}/>}
        </div>
    );
};
export default Canvas;