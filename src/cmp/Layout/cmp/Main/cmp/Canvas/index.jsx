/* eslint-disable no-unused-vars */
import {
    useRef, useContext, useMemo,
    useEffect, useState
} from 'react';

import Channel from '@fedeghe/channeljs';

import CanvasSymbol from './CanvasSymbol';
import ctx from 'src/Context';
import {
    cleanCodeFromState,
    getUnicodeistScriptTag,
    css2string, css2json
} from 'src/utils';
// import { UNSELECTED } from 'src/constants';
import {
    CopyDialog,
    DownloadDialog,
    ContributeDialog,
    KeyEditorDialog,
    BgStylesEditorDialog,
    AdditionalStylesEditorDialog
 } from 'src/cmp/Dialogs';

const Canvas = () => {
    const {
        state: {
            width, height,
            symbols,
            backgroundColor,
            backgroundColorAlpha,
            keyFrames,
            bgStyles,
            zoomLevel
        },
        state,
    } = useContext(ctx),
        keyFramesNames = Object.keys(keyFrames),
        ref = useRef(),
        [copyDialogVisibility, setCopyDialogVisibility] = useState(false),
        [downloadDialogVisibility, setDownloadDialogVisibility] = useState(false),
        [contributeDialogVisibility, setContributeDialogVisibility] = useState(false),
        [keyEditorDialogVisibility, setKeyEditorDialogVisibility] = useState(false),
        [backgrounStylesDialogVisibility, setBackgrounStylesDialogVisibility] = useState(false),
        [additionalStylesEditorDialogVisibility, setAdditionalStylesEditorDialogVisibility] = useState(false),
        [embedCode, setEmbedCode] = useState(''),
        [scriptCode, setScriptCode] = useState(''),
        refStyles = useMemo(() => ({
            ...(bgStyles ? css2json(bgStyles) : {}),
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: backgroundColorAlpha ? `${backgroundColor}00` : backgroundColor,
            outline: backgroundColorAlpha ? '1px dashed gray' : 'none',
            position: 'relative',
            overflow: 'hidden',
            fontSize:'20px',
            zoom: zoomLevel
        }), [height, width, backgroundColor, backgroundColorAlpha, bgStyles, zoomLevel]),

        onDragOver = e => { e.preventDefault(); },
        exportImage = () => setDownloadDialogVisibility(true),
        contribute = () => setContributeDialogVisibility(true),
        keyEditor = () => setKeyEditorDialogVisibility(true),
        backgrounStyles = () => setBackgrounStylesDialogVisibility(true),
        shadowEditor = () => setAdditionalStylesEditorDialogVisibility(true);

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
            Channel.get('event').sub('backgrounStyles', backgrounStyles);
            Channel.get('event').sub('contribute', contribute);
            Channel.get('event').sub('keyEditor', keyEditor);
            Channel.get('event').sub('shadowEditor', shadowEditor);
        }
        return () => {
            Channel.get('event').unsub('embed', embed);
            Channel.get('event').unsub('exportImage', exportImage);
            Channel.get('event').unsub('contribute', contribute);
            Channel.get('event').unsub('backgrounStyles', backgrounStyles);
            Channel.get('event').unsub('keyEditor', keyEditor);
            Channel.get('event').unsub('shadowEditor', shadowEditor);
        };
    }, [ref, state]);
    return (
        <div>
            <CopyDialog visibility={copyDialogVisibility} setVisibility={setCopyDialogVisibility} embedCode={embedCode} scriptCode={scriptCode} />
            <DownloadDialog visibility={downloadDialogVisibility} setVisibility={setDownloadDialogVisibility} domRef={ref} />
            <ContributeDialog visibility={contributeDialogVisibility} setVisibility={setContributeDialogVisibility} domRef={ref} />
            {/* 
                theese needs to be rerendered every time
                cause it must access the localstorage everytime
            */}
            {Boolean(backgrounStylesDialogVisibility) && <BgStylesEditorDialog visibility={backgrounStylesDialogVisibility} setVisibility={setBackgrounStylesDialogVisibility} />}
            {Boolean(additionalStylesEditorDialogVisibility) && <AdditionalStylesEditorDialog visibility={additionalStylesEditorDialogVisibility} setVisibility={setAdditionalStylesEditorDialogVisibility} />}
            {Boolean(keyEditorDialogVisibility) && <KeyEditorDialog visibility={keyEditorDialogVisibility} setVisibility={setKeyEditorDialogVisibility} />}
            <div ref={ref} style={refStyles} onDragOver={onDragOver}>
                {
                    /**
                     * need to loop through all symbols additionalStyles
                     * and collect all keyframes names found not repeated
                     * then set the style tag for each
                     */
                    symbols.reduce((acc, {additionalStyles}) => {
                        if (!additionalStyles) return acc;
                        const foundKf = keyFramesNames.find(kfn => additionalStyles.includes(` ${kfn} `));
                        if (foundKf && !acc.includes(foundKf)) acc.push(foundKf);
                        return acc;
                    }, []).map(
                        kf => <style key={kf}>{keyFrames[kf]}</style>
                    )
                }
                {symbols.map(symbol => <CanvasSymbol key={symbol.id} symbol={symbol} />)}
            </div>

        </div>
    );
};
export default Canvas;