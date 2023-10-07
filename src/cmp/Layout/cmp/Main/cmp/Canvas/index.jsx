import {useRef, useContext, useMemo, useEffect, useState, useCallback} from 'react'
import Channel from '@fedeghe/channeljs'
import Dialog from '@mui/material/Dialog';

import copy from 'copy-to-clipboard'
import Button from '@mui/material/Button';
import CanvasSymbol from './../CanvasSymbol'
import CopyDone from './../CopyDone'

import ctx from './../../../../../../Context'
import ACTIONS from './../../../../../../reducer/actions'
import { cleanCode } from './../../../../../../utils'

import useStyles from './styles'

const Canvas = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const {
        state: {
            width, height,
            symbols,
            backgroundColor,
            embedModalVisibility
        },
        dispatch
    } = useContext(ctx)
    const ref = useRef()
    const setEmbedModalVisibility = useCallback(visibility => {
        dispatch({
            type: ACTIONS.SET_EMBED_MODAL_VISIBILITY,
            payload : typeof visibility !== 'undefined'
                ? visibility :
                !embedModalVisibility
        })
    }, [dispatch, embedModalVisibility])

    const [embedCode, setEmbedCode] = useState('')

    useEffect(() => {
        if (ref.current)
            Channel.get('event').sub('embed', () => {
                const code = cleanCode(ref.current.outerHTML)
                setEmbedCode(code)
                setEmbedModalVisibility(!!(ref?.current?.outerHTML))
            })
            Channel.get('event').sub('mailto', () => {
                const code = cleanCode(ref.current.outerHTML)
                window.open(`mailto:someone@yoursite.com?subject=Big%20News&body=${code}`)
            })
    }, [ref, setEmbedModalVisibility])

    const refStyles = useMemo(() => ({
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor,
        position:'relative',
        overflow: 'hidden'
    }), [height, width, backgroundColor])
    const onDragOver = e => {
        e.preventDefault()
    }
    const onClose = useCallback(
        () => setEmbedModalVisibility(false),
        [setEmbedModalVisibility]
    );
    const onCopy = useCallback(() => {
        copy(embedCode);
        onClose();
        setOpen(true);
    }, [embedCode, onClose])
    return (
        <div>
            <Dialog open={embedModalVisibility} onClose={onClose}>
                <div className={classes.Dialog}>
                    <div className={classes.Code}>
                        <code>{embedCode}</code>
                    </div>
                    <div>
                        <Button variant="contained" onClick={onCopy}>Copy</Button>
                    </div>
                </div>
            </Dialog>
            <div ref={ref} style={refStyles} droppable='droppable' onDragOver={onDragOver}>
                {symbols.map(symbol => <CanvasSymbol key={symbol.id} symbol={symbol}/>)}
            </div>
            {open && <CopyDone message="Code copied to clipboard"  onClose={onClose} open={open} setOpen={setOpen}/>}
        </div>
    )
}
export default Canvas