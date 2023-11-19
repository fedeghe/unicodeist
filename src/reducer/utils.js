import {
    getMaxHeight,
    getMaxWidth,
    LET_UNICODE_PANEL_OPEN_AFTER_SELECTION,
    LOCALSTORAGE_KEYFRAMES_KEY,
} from 'src/constants';

const FFRM = {
    ar: 'Arial',
    v: 'Verdana',
    ta: 'Tahoma',
    tr: 'Trebuchet MS',
    tn: 'Times New Roman',
    ge: 'Georgia',
    ga: 'Garamond',
    c: 'Courier New',
    b: 'Brush Script MT'
};

export const keyFramesManager = {
    synch : toWrite => 
        toWrite
            ? localStorage.setItem(LOCALSTORAGE_KEYFRAMES_KEY, JSON.stringify(toWrite))
            : JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYFRAMES_KEY) || '{}')
};

export const uncompress = c => console.log({c}) || ({
    width: c.sty.w,
    height: c.sty.h,
    maxWidth: getMaxWidth(),
    maxHeight: getMaxHeight(),
    addPanelVisibility: false,
    focusedSymbolId: null,
    backgroundColor: c.sty.bgc.c,
    backgroundColorAlpha: c.sty.bgc.a,
    asciiSelectorFilter: '',
    symbolsFilter: '',
    asciiPanelFilterByIconName: '',
    bgStyles: c.sty.bgi,
    letAsciiPanelOpenAfterSelection: LET_UNICODE_PANEL_OPEN_AFTER_SELECTION,
    superFocus: false,
    canScrollSymbols: true,
    keyFrames: Object.entries(c.kfs).reduce((acc, [k,e]) => {
        acc[k] = {
            animate: e.an,
            keyFrame: e.fk
        };
        return acc;
    }, {}),
    symbols: c.sym.map(s => ({
        id: s.id,
        char: s.cnt,
        label : s.l,
        zIndex: s.sty.zi,
        left:s.sty.t.trn[0],
        top:s.sty.t.trn[1],
        color: s.sty.c,
        animation: s.ani,
        fontFamily: FFRM[s.sty.ff],
        fontWeight: s.sty.fw,
        skewX: s.sty.t?.sk?.[0] || 0,
        skewY: s.sty.t?.sk?.[1] || 0,
        rotationX: s.sty.t?.rx || 0,
        rotationY: s.sty.t?.ry || 0,
        rotationZ: s.sty.t?.rz || 0,
        blur: s.sty?.f?.bl || 0,
        opacity: s.sty.o || 1,
        scale: s.sty.t.s || 1,
        scaleX: s.sty.t.sx || 1,
        scaleY: s.sty.t.sy || 1,
        additionalStyles: s.sty.add,
        targetUp: false,
        faded: false
    }))
});

const exp = {
    uncompress,
    keyFramesManager
};

export default exp;