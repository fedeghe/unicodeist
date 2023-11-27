import {
    UNICODEIST_SCRIPT_URI,
    FONT_FAMILIES_REDUCTION_MAP,
} from './constants';

import io from 'src/io';


export const uniqueID = new function () {
    var count = 0,
        self = this;
    this.prefix = 'U_';
    this.toString = function () {
        count += 1;
        return self.prefix + count;
    };
}();

export const cleanCode = code => code
    .replace(/class="[^"]*"/mg, '')    // remove class
    .replace(/droppable="droppable"/mg, '')    // remove droppable
    .replace(/\s{2,}/gm, ' ')           // remove double spaces
    .replace(/:\s/gm, ":")             // remove spaces after :
    .replace(/;\s/gm, ";")             // remove spaces after ;
    .replace(/,\s/gm, ",")              // remove spaces after ,
    .replace(/draggable=[true|false]/gm, "");              // remove draggable attrs

const cleanKf = kf => kf.replace(/\n/g, '').replace(/\/\*[^]*?\*\//g, '');

export const cleanCodeFromState = ({
    width, height,
    backgroundColorAlpha, backgroundColor,
    symbols,
    bgStyles,
    keyFrames
}) => {
    const root = document.createElement('div'),
        bgColor = backgroundColorAlpha ? `${backgroundColor}00` : backgroundColor;
    root.setAttribute('style', [
        `width:${width}px`,
        `height:${height}px`,
        'pointer-events: none',
        `background-color:${bgColor.substring(0, 9)}`,
        `position:relative;overflow:hidden`,
        bgStyles ? css2string(bgStyles) : ''
    ].join(';'));

    Object.keys(keyFrames).reduce((acc, k) => {
        const inSymbols = symbols.find(({additionalStyles}) => 
            additionalStyles.includes(` ${k} `)
        );
        if (inSymbols && !acc.includes(k)) acc.push(k);
        return acc;
    }, []).forEach(a => {
        var s = document.createElement('style');
        s.innerHTML = cleanKf(keyFrames[a]);
        root.appendChild(s);
    });

    symbols.map(sym => {
        var child = document.createElement('div');
        child.innerHTML = sym.char;
        child.setAttribute('style',
            [   
                json2string(mergeAdditionalStyles({
                    additionalStyles: sym.additionalStyles,
                    blur: sym.blur
                })),
                `z-index:${sym.zIndex}`,
                `font-family:${sym.fontFamily}`,
                sym.italic && 'font-style:italic',
                `font-weight:${sym.fontWeight}`,
                `color:${sym.color}`,
                `opacity:${sym.opacity}`,
                `position:absolute;transform-origin:center center`,
                `transform:` + [
                    `translate(${sym.left}px,${sym.top}px)`,
                    sym.scale !== 1 && `scale(${sym.scale})`,
                    sym.scaleX !== 1 && `scaleX(${sym.scaleX})`,
                    sym.scaleY !== 1 && `scaleY(${sym.scaleY})`,
                    sym.rotationX && `rotateX(${sym.rotationX}deg)`,
                    sym.rotationY && `rotateY(${sym.rotationY}deg)`,
                    sym.rotationZ && `rotateZ(${sym.rotationZ}deg)`,
                    (sym.skewX || sym.skewY) && `skew(${sym.skewX}deg,${sym.skewY}deg)`,
                ].filter(Boolean).join(' '),
                'font-size:20px'
            ].filter(Boolean).join(';')
        );
        return child;
    }).forEach(c => root.appendChild(c));
    
    return root.outerHTML;
};

export const count = symbols => symbols.reduce(
    (acc, { data }) => acc + data.reduce(
        (acc0, { charSet }) => acc0 + charSet.length
        , 0)
    , 0
);

export const debounce = (func, delay) => {
    var to,
        ret = (...args) => {
            clearTimeout(to);
            to = setTimeout(() => func(...args), delay);
        };
    ret.cancel = function () {
        clearTimeout(to);
    };
    return ret;
};
export const unbounce = (func, delay) => {
    var calls = true,
        to,
        ret = (...args) => {
            clearTimeout(to);
            to = setTimeout(() => {calls = true;}, delay);
            if (calls) func(...args);
            calls = false;
        };
    ret.cancel = function () {
        clearTimeout(to);
    };
    return ret;
};

export const filter = ({ symbols, filter, debug = false }) => {
    let start,
        end;
    if (debug) start = +new Date();
    const res = filter
        ? symbols.map(({ label, data }) => {
            const newData = data.map(({ title, charSet }) => {
                const filteredCharset = charSet.filter(
                    // eslint-disable-next-line no-unused-vars
                    ({ c: char, d: description = '', de, u, oc, he }) => {
                        return false
                            || description.toLowerCase().split(',').some(s => s.includes(filter))
                            || `${char}`.toLowerCase() === filter.toLowerCase()
                            || `${title}`.toLowerCase().includes(filter)
                            // || `${label}`.toLowerCase().includes(lcFilter)
                            || `${de}`.startsWith(filter)
                            || `${oc}`.startsWith(filter)
                            || `${he}`.startsWith(filter)
                            // || `${u}`.startsWith(filter)
                            ;
                    }
                );
                return filteredCharset.length && {
                    title,
                    charSet: filteredCharset
                };
            }).filter(Boolean);
            return newData.length && {
                label,
                data: newData
            };
        }).filter(Boolean)
        : symbols;
    if (debug) {
        end = +new Date();
        console.log('filtering took: ', end - start);
    }
    return res;
};

export const uncompressStateForImport = cstate => {
    const {
        bgca: backgroundColorAlpha,
        w: width,
        h: height,
        mw: maxWidth,
        mh: maxHeight,
        apv: addPanelVisibility,
        fsid: focusedSymbolId,
        bgc: backgroundColor,
        asf: asciiSelectorFilter,
        sf: symbolsFilter,
        alapoas: letAsciiPanelOpenAfterSelection,
        suf: superFocus,
        css: canScrollSymbols,
        sc: scrollTop,
        bgs: bgStyles,
        pr: preventReload,
        fs: fullscreen,
        s: selected,
        sm: swapMode,
        tk: themeKey,
        fc: filteredCount,
        z: zoomLevel = 1,
        sy: symbols, 
        kf: keyFrames
    } = cstate;
    return {
        backgroundColorAlpha,
        width,
        height,
        maxWidth,
        maxHeight,
        addPanelVisibility,
        focusedSymbolId: focusedSymbolId?.replace(/U_/, 'U_i'),
        backgroundColor,
        asciiSelectorFilter,
        symbolsFilter,
        letAsciiPanelOpenAfterSelection,
        superFocus,
        canScrollSymbols,
        scrollTop,
        bgStyles,
        preventReload,
        fullscreen,
        selected,
        swapMode,
        themeKey,
        filteredCount,
        zoomLevel,
        keyFrames,
        symbols: symbols.map(({
            i, ch, lb, zi, l, t, c, ff, fw, 
            skx, sky, rx, ry, rz, b, o,
            s, sx, sy, as, f
        }) => ({
            id: i.replace(/U_/, 'U_i'),
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
            additionalStyles: as, 
            faded: f,
        }))
    };
};

export const compressStateForExport = state => {
    const {
        backgroundColorAlpha: bgca,
        width: w,
        height: h,
        maxWidth: mw,
        maxHeight: mh,
        addPanelVisibility: apv,
        focusedSymbolId: fsid,
        backgroundColor: bgc,
        asciiSelectorFilter: asf,
        symbolsFilter: sf,
        letAsciiPanelOpenAfterSelection: alapoas,
        superFocus: suf,
        canScrollSymbols: css,
        scrollTop: sc,
        bgStyles: bgs,
        preventReload: pr,
        fullscreen: fs,
        selected: s,
        swapMode: sm,
        themeKey: tk,
        filteredCount: fc,
        zoomLevel: z,
        symbols, 
        keyFrames: kf,
    } = state;
    const exp = {
        bgca, bgc,
        w, h, mw, mh,
        apv,
        fsid, asf, sf, alapoas,
        suf, css, sc, bgs, pr, fs,
        s, sm, tk, fc, 
        z,
        kf,
        sy: symbols.map(({
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
            additionalStyles: as, 
            faded: f, 
        }) => ({
            i, ch, lb, zi, l, t, c, ff, fw, 
            skx, sky, rx, ry, rz, b, o,
            s, sx, sy, as, f
        }))
    };
    delete exp.availableSymbols;
    return JSON.stringify(exp);
};

/**
 * TODO: here I should allow the use to see the location & name dialog
 * but still do not know how
 */
export const saveAsStateFileJSON = state =>
    new Promise(resolve => {
        const blob = new Blob([io.compress(state)]);
        resolve(window.URL.createObjectURL(blob));
    });
export const saveAsFileJSON = json =>
    new Promise(resolve => {
        const blob = new Blob([JSON.stringify(json)]);
        resolve(window.URL.createObjectURL(blob));
    });
export const importFromFile = ({ onContentReady }) => {
    const link = document.createElement("input");
    link.type = 'file';
    link.addEventListener('change', function (e) {
        const reader = new FileReader();
        reader.onload = function () {
            onContentReady(reader.result);
        };
        if (e.target.files.length) {
            reader.readAsText(e.target.files[0]);
        }
        document.body.focus();
        e.preventDefault();
    });
    link.click();
};

export const mergeAdditionalStyles = ({ additionalStyles, blur }) => {
    const ast = additionalStyles ? css2json(additionalStyles, false) : {},
        filter = [`blur(${blur}px)`];
    if ('filter' in ast) {
        filter.push(ast.filter);
        delete ast.filter;
    }
    ast.filter = filter.join(' ');
    return ast;
};


const cleanCssString = v => v
    .replace(/^\{/, '')
    .replace(/\}$/, '')
    .replace(/\n/g, '');
const getUnicodeistData = j => JSON.stringify({
    sty: {
        w: j.width,
        h: j.height,
        bgc: {
            c: j.backgroundColor,
            a: j.backgroundColorAlpha
        },
        ...(j.bgStyles && {
            bgi: cleanCssString(j.bgStyles)
        }),
    },
    kfs: Object.keys(j.keyFrames).reduce((acc, k) => {
        const inSymbols = j.symbols.find(({additionalStyles}) => 
            additionalStyles.includes(` ${k} `)
        );
        if (inSymbols) acc[k] = cleanKf(j.keyFrames[k]);
        return acc;
    }, {}),
    sym: j.symbols.map(s => ({
        id: s.id.replace(/U_/, 'U_i'),
        l: s.label,
        cnt: s.char,
        sty: {
            ...(s.additionalStyles ? {
                add: `${json2string(mergeAdditionalStyles({
                    additionalStyles: s.additionalStyles,
                    blur: s.blur || 0
                }))}`
            } : (s.blur && {
                f: {
                    bl: s.blur
                }
            })),
            zi: s.zIndex,
            c: s.color,
            ff: Object.keys(FONT_FAMILIES_REDUCTION_MAP).find(
                k => FONT_FAMILIES_REDUCTION_MAP[k] === s.fontFamily
            ),
            fw: s.fontWeight,
            o: s.opacity,
            it: s.italic,
            t: {
                trn: [s.left, s.top],
                ...(s.scale !== 1 && { s: s.scale }),
                ...(s.scaleX !== 1 && { sx: s.scaleX }),
                ...(s.scaleY !== 1 && { sy: s.scaleY }),
                ...(s.rotationX && { rx: s.rotationX }), // deg
                ...(s.rotationY && { ry: s.rotationY }), // deg
                ...(s.rotationZ && { rz: s.rotationZ }),  // deg
                ...((s.skewX || s.skewY) && { sk: [s.skewX, s.skewY] })  // deg
            },

        }
    }))
});

export const getUnicodeistScriptTag = state => {
    // const dataUnicodeist = getUnicodeistData(state);
    const dataUnicodeist = io.compress(state);
    return `<script src="${UNICODEIST_SCRIPT_URI}" data-unicodeist='${dataUnicodeist}'></script>`;
};

export const getCodes = char => {
    var decimal = char.charCodeAt(0).toString(10),
        unicode = 'U+' + char.charCodeAt(0).toString(16).padStart(4, '0'),
        css = '\\' + char.charCodeAt(0).toString(16).padStart(4, '0'),
        octal = '0' + char.charCodeAt(0).toString(8),
        hex = '0x' + char.charCodeAt(0).toString(16),
        html = '&#' + decimal + ';';
    return {
        decimal, unicode, octal, hex, css, html
    };
};

function seekAllCssRules(css) {
    const first = css.replace(/\n/g, ''),
        ks = first.matchAll(/([A-Za-z0-9-_]*):(['"A-Za-z0-9-_.,:/()%#\s]*);?/g);
    return [...ks];
}

export function css2json(v, jssify = true) {
    const vals = seekAllCssRules(v),
        // eslint-disable-next-line no-unused-vars
        ret = vals.reduce((acc, [_, k, v]) => {
            const nk = jssify ? k.replace(/(\w)-(\w)/g, (_, a, b) => `${a}${b.toUpperCase()}`) : k;
            acc[nk.toString()] = v.toString();
            return acc;
        }, {}),
        sret = JSON.stringify(ret),
        jret = JSON.parse(sret);
    return jret;
}
export function json2string(o) {
    return Object.entries(o).reduce((acc, [k, e]) => {
        return `${acc}${k}:${e};`;
    }, '');
}
export function css2string(v) {
    const vals = seekAllCssRules(v),
        // eslint-disable-next-line no-unused-vars
        ret = vals.reduce((acc, [_, k, v]) => `${acc}${k}:${v};`, '');
    return ret;
}


/* View in fullscreen */
export const openFullscreen = () => {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
};

/* Close fullscreen */
export const closeFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
};

export const downloadAs = fileName => {
    return dataUrl => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.setAttribute('download', fileName);
        a.click();
    };
};


const def = {
    uniqueID,
    cleanCode,
    cleanCodeFromState,
    debounce,
    unbounce,
    importFromFile,
    getUnicodeistData,
    getUnicodeistScriptTag,
    saveAsStateFileJSON,
    saveAsFileJSON,
    getCodes,
    count,
    filter,
    css2string,
    openFullscreen,
    closeFullscreen,
    downloadAs,
    css2json,
    mergeAdditionalStyles,
    compressStateForExport,
    uncompressStateForImport,
};
export default def;