import {
    useRef, useContext, useMemo,
    useEffect, useState, useCallback
} from 'react';
// eslint-disable-next-line no-unused-vars
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import Channel from '@fedeghe/channeljs';

import CanvasSymbol from './../CanvasSymbol';
import ctx from './../../../../../../Context';


import { cleanCodeFromState, getUnicodeistScriptTag } from './../../../../../../utils';
import CopyDialog from './cmp/CopyDialog';
import DownloadDialog from './cmp/DownloadDialog';


const Canvas = () => {
    const {
        state: {
            width, height,
            symbols,
            backgroundColor
        },
        state,
    } = useContext(ctx),
        ref = useRef(),
        [copyDialogVisibility, setCopyDialogVisibility] = useState(false),
        [downloadDialogVisibility, setDownloadDialogVisibility] = useState(false),
        [embedCode, setEmbedCode] = useState(''),
        [scriptCode, setScriptCode] = useState(''),
        refStyles = useMemo(() => ({
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor,
            position: 'relative',
            overflow: 'hidden'
        }), [height, width, backgroundColor]),

        onDragOver = e => { e.preventDefault(); },
        exportImage = useCallback(
            () => setDownloadDialogVisibility(true)
        );

    useEffect(() => {
        const embed = () => {
            const code = cleanCodeFromState(state);
            setEmbedCode(code);
            setScriptCode(getUnicodeistScriptTag(state));
            if (ref?.current) setCopyDialogVisibility(true);
        },
            mailto = () => {
                const code = cleanCodeFromState(state);
                window.open(`mailto:your@friend.com?subject=Unicodeist&body=${code}`);
            };

        if (ref.current) {
            Channel.get('event').sub('embed', embed);
            Channel.get('event').sub('mailto', mailto);
            Channel.get('event').sub('exportImage', exportImage);
        }
        return () => {
            Channel.get('event').unsub('embed', embed);
            Channel.get('event').unsub('mailto', mailto);
            Channel.get('event').unsub('exportImage', exportImage);
        };
    }, [ref, state]);
    return (
        <div>
            <CopyDialog visibility={copyDialogVisibility} setVisibility={setCopyDialogVisibility} embedCode={embedCode} scriptCode={scriptCode} />
            <DownloadDialog visibility={downloadDialogVisibility} setVisibility={setDownloadDialogVisibility} domRef={ref} />
            <div ref={ref} style={refStyles} onDragOver={onDragOver}>
                {symbols.map(symbol => <CanvasSymbol key={symbol.id} symbol={symbol} />)}
            </div>

        </div>
    );
};
export default Canvas;