import {
    DEFAULTS,
    SYMBOL_DEFAULTS,
    MEASURE,
} from './../constants';

export const uncompress = ({
    w: width = DEFAULTS.WIDTH,
    h: height = DEFAULTS.HEIGHT,
    tk: themeKey = DEFAULTS.THEME_KEY,
    bgc: backgroundColor = DEFAULTS.BACKGROUND_COLOR,
    bgca: backgroundColorAlpha = DEFAULTS.BACKGROUND_ALPHA,
    fsid: focusedSymbolId = DEFAULTS.FOCUSED_SYMBOL_ID,
    bgs: bgStyles = DEFAULTS.BACKGROUND_STYLES,
    z: zoomLevel = DEFAULTS.ZOOM_LEVEL,
    sym: symbols = DEFAULTS.SYMBOLS, 
    kf: keyFrames = DEFAULTS.KEYFRAMES,
}) => ({
    width,
    height,
    maxWidth: MEASURE.getMaxWidth(),
    maxHeight: MEASURE.getMaxHeight(),
    backgroundColorAlpha,
    backgroundColor,
    bgStyles,
    
    keyFrames,
    focusedSymbolId: focusedSymbolId?.replace(/U_/, 'U_i'),
    zoomLevel,
    themeKey,
    
    // all the following on import will be defaulted
    // thus NOT EVEN EXPORTED
    addPanelVisibility: DEFAULTS.ADD_PANEL_VISIBILITY,
    asciiSelectorFilter: DEFAULTS.ASCII_SELECTOR_FILTER,
    symbolsFilter: DEFAULTS.SYMBOLS_FILTER,
    letAsciiPanelOpenAfterSelection: DEFAULTS.LET_UNICODE_PANEL_OPEN_AFTER_SELECTION,
    superFocus: DEFAULTS.SUPERFOCUS,
    canScrollSymbols: DEFAULTS.CAN_SCROLL_SYMBOLS,
    scrollTop: DEFAULTS.SCROLL_TOP,
    preventReload: DEFAULTS.PREVENT_RELOAD,
    fullscreen :DEFAULTS.FULLSCREEN_MODE,
    selected: DEFAULTS.SELECTED,
    swapMode: DEFAULTS.SWAP_MODE,
    filteredCount: DEFAULTS.FILTERED_COUNT,
    
    symbols: symbols.map(({
        i, ch, lb, zi, l, t, c, ff, fw, 
        skx, sky, rx, ry, rz, b, o,
        s, sx, sy, as : asl, f
    }) => {
        const id = i.replace(/U_/, 'U_i');
        return {
            id,
            char: ch,
            // if the label is not there then means that on export 
            // was skipped since equal to id
            label: lb || id, 
            zIndex: zi, 
            left: l, 
            top: t, 
            color: c || SYMBOL_DEFAULTS.COLOR, 
            fontFamily: ff || SYMBOL_DEFAULTS.FONTFAMILY, 
            fontWeight: fw || SYMBOL_DEFAULTS.FONTWEIGHT, 
            skewX: skx || SYMBOL_DEFAULTS.SKEWX,
            skewY: sky || SYMBOL_DEFAULTS.SKEWY,
            rotationX: rx || SYMBOL_DEFAULTS.ROTATIONX,
            rotationY: ry || SYMBOL_DEFAULTS.ROTATIONY,
            rotationZ: rz || SYMBOL_DEFAULTS.ROTATIONZ, 
            blur: b || SYMBOL_DEFAULTS.BLUR,
            opacity: o || SYMBOL_DEFAULTS.OPACITY,  
            scale: s || SYMBOL_DEFAULTS.SCALE, 
            scaleX: sx || SYMBOL_DEFAULTS.SCALEX, 
            scaleY: sy || SYMBOL_DEFAULTS.SCALEY, 
            additionalStyles: asl || SYMBOL_DEFAULTS.ADDITIONAL_STYLES, 
            faded: f || SYMBOL_DEFAULTS.FADED,
        };
    })
});


export const compress = ({
    backgroundColorAlpha: bgca,
    backgroundColor: bgc,
    width: w,
    height: h,
    focusedSymbolId: fsid,
    bgStyles: bgs,
    selected: s,
    themeKey: tk,
    zoomLevel: z,
    symbols, 
    keyFrames: kfs,
}) => {
    const kf = Object.entries(kfs).reduce((acc, [k, v]) => {
            if (symbols.some(
                ({additionalStyles}) => additionalStyles.includes(k)
            )) acc[k] = v;
            return acc;
        }, {}),
        hasKf = Object.keys(kf).length;
    return JSON.stringify({
        ...(bgca !== DEFAULTS.BACKGROUND_ALPHA && {bgca}),
        ...(bgc !== DEFAULTS.BACKGROUND_COLOR && {bgc}),
        ...(w !== DEFAULTS.WIDTH && {w}),
        ...(h !== DEFAULTS.HEIGHT && {h}),
        fsid, bgs, s, tk, z,
        // need to include only those actually used
        ...(hasKf && {kf}),
        sym: symbols.map(({
            id: i,
            char: ch,
            label: lb, 
            zIndex: zi, 
            left: l, 
            top: t, 
            color: c, 
            fontFamily: ff, 
            fontWeight: fw, 
            skewX: skx,
            skewY: sky,
            rotationX: rx,
            rotationY: ry,
            rotationZ: rz, 
            blur: b,
            opacity: o,  
            scale: s, 
            scaleX: sx, 
            scaleY: sy, 
            additionalStyles: ast, 
            faded: f, 
        }) => ({
            i, ch, zi, l, t,
            // only if differs from id (default label is = the id)
            ...(lb !== i && {lb}),
            ...(c !== SYMBOL_DEFAULTS.COLOR && {c}),
            ...(ff !== SYMBOL_DEFAULTS.FONTFAMILY && {ff}),
            ...(fw !== SYMBOL_DEFAULTS.FONTWEIGHT && {fw}),
            ...(skx !== SYMBOL_DEFAULTS.SKEWX && {skx}),
            ...(sky !== SYMBOL_DEFAULTS.SKEWY && {sky}),
            ...(rx !== SYMBOL_DEFAULTS.ROTATIONX && {rx}),
            ...(ry !== SYMBOL_DEFAULTS.ROTATIONY && {ry}),
            ...(rz !== SYMBOL_DEFAULTS.ROTATIONZ && {rz}),
            ...(b !== SYMBOL_DEFAULTS.BLUR && {b}),
            ...(o !== SYMBOL_DEFAULTS.OPACITY && {o}),
            ...(s !== SYMBOL_DEFAULTS.SCALE && {s}),
            ...(sx !== SYMBOL_DEFAULTS.SCALEX && {sx}),
            ...(sy !== SYMBOL_DEFAULTS.SCALEY && {sy}),
            ...(sy !== SYMBOL_DEFAULTS.SCALEY && {sy}),
            ...(ast !== SYMBOL_DEFAULTS.ADDITIONAL_STYLES && {as: ast}),
            ...(f !== SYMBOL_DEFAULTS.FADED && {f})
        }))
    });
};

const def = {
    compress,
    uncompress,
};
export default def;