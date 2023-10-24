import {
    useRef, useContext, useMemo,
    useEffect, useState, useCallback
} from 'react';

import Channel from '@fedeghe/channeljs';

import CanvasSymbol from './CanvasSymbol';
import ctx from 'src/Context';
import {
    cleanCodeFromState,
    getUnicodeistScriptTag
} from 'src/utils';
import {
    CopyDialog,
    DownloadDialog,
    ContributeDialog
 } from 'src/cmp/Dialogs';

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
        [contributeDialogVisibility, setContributeDialogVisibility] = useState(false),
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
        ),
        contribute = useCallback(
            () => setContributeDialogVisibility(true)
        );

    useEffect(() => {
        const embed = () => {
                const code = cleanCodeFromState(state);
                setEmbedCode(code);
                setScriptCode(getUnicodeistScriptTag(state));
                if (ref?.current) setCopyDialogVisibility(true);
            };

        if (ref.current) {
            Channel.get('event').sub('embed', embed);
            Channel.get('event').sub('exportImage', exportImage);
            Channel.get('event').sub('contribute', contribute);
        }
        return () => {
            Channel.get('event').unsub('embed', embed);
            Channel.get('event').unsub('exportImage', exportImage);
            Channel.get('event').unsub('contribute', contribute);
        };
    }, [ref, state]);
    return (
        <div>
            <CopyDialog visibility={copyDialogVisibility} setVisibility={setCopyDialogVisibility} embedCode={embedCode} scriptCode={scriptCode} />
            <DownloadDialog visibility={downloadDialogVisibility} setVisibility={setDownloadDialogVisibility} domRef={ref} />
            <ContributeDialog visibility={contributeDialogVisibility} setVisibility={setContributeDialogVisibility} domRef={ref} />
            <div ref={ref} style={refStyles} onDragOver={onDragOver}>
                {symbols.map(symbol => <CanvasSymbol key={symbol.id} symbol={symbol} />)}
            </div>

        </div>
    );
};
export default Canvas;