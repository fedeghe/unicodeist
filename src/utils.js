import {
    UNICODEIST_SCRIPT_URI,
    FONT_FAMILIES_REDUCTION_MAP,
    UNSELECTED
} from './constants';

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

export const cleanCodeFromState = state => {
    const root = document.createElement('div'),
        {
            width, height,
            backgroundColorAlpha, backgroundColor,
            symbols,
            bgStyles
        } = state;
    root.setAttribute('style', [
        `width:${width}px`,
        `height:${height}px`,
        `background-color:${backgroundColor}${backgroundColorAlpha ? '00' : ''}`,
        `position:relative;overflow:hidden`,
        bgStyles ? css2string(bgStyles) : ''
    ].join(';'));


    [...new Set(
        state.symbols
            .filter(symbol => symbol.animation && symbol.animation !== UNSELECTED)
            .map(symbol => symbol.animation)
    )].forEach(a => {
        var s = document.createElement('style');
        s.innerHTML = state.keyFrames[a].keyFrame;
        root.appendChild(s);
    });
    
    
    symbols.map(sym => {
        var child = document.createElement('div');
        child.innerHTML = sym.char;
        child.setAttribute('style',
            [
                ...((sym.animation && sym.animation in state.keyFrames)
                    ? css2string(state.keyFrames[sym.animation].animate).split(';')
                    : []
                ),
                ...(sym.additionalStyles
                    ? css2string(sym.additionalStyles).split(';')
                    : []
                ),
                `z-index:${sym.zIndex}`,
                `font-family:${sym.fontFamily}`,
                `font-weight:${sym.fontWeight}`,
                `color:${sym.color}`,
                `opacity:${sym.opacity}`,
                `position:absolute;transform-origin:center center`,
                sym.blur && `filter:blur(${sym.blur}px)`,
                
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
    , 0);

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

/**
 * TODO: here I should allow the use to see the location & name dialog
 * but still do not know how
 */
export const saveAsStateFileJSON = state =>
    new Promise(resolve => {
        const blob = new Blob([getUnicodeistData(state)]);
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
const cleanCssString = v => v
    .replace(/^\{/, '')
    .replace(/\}$/, '')
    .replace(/\n/g, '');
const getUnicodeistData = j => JSON.stringify({
    sty: {
        w: j.width,
        h: j.height,
        bgc: `${j.backgroundColorAlpha ? '#ffffff00' : j.backgroundColor}`,
        ...(j.bgStyles && {
                bgi: cleanCssString(j.bgStyles)
            }
        ),
    },
    kfs: [...new Set(
        j.symbols
            .filter(symbol => symbol.animation && symbol.animation !== UNSELECTED)
            .map(symbol => symbol.animation)
    )].reduce((acc, animation) => {
        acc[animation] = {
            fk: j.keyFrames[animation].keyFrame.replace(/\n/g, ''),
            an: j.keyFrames[animation].animate.replace(/\n/g, '')
        };
        return acc;
    }, {}),
    sym: j.symbols.map(s => ({
        id: s.id,
        l: s.label,
        cnt: s.char,
        ani: s.animation,
        sty: {
            ...(s.additionalStyles && {
                add: cleanCssString(s.additionalStyles)
            }),
            zi: s.zIndex,
            c: s.color,
            ff: Object.keys(FONT_FAMILIES_REDUCTION_MAP).find(
                k => FONT_FAMILIES_REDUCTION_MAP[k] === s.fontFamily
            ),
            fw: s.fontWeight,
            o: s.opacity,
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
            ...(s.blur && {
                f: {
                    bl: s.blur
                }
            })
        }
    }))
});

export const getUnicodeistScriptTag = state => {
    const dataUnicodeist = getUnicodeistData(state);
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

export function css2json(v) {
    const first = v.replace(/\n/g, ''),
        ks = first.matchAll(/([A-Za-z0-9-_]*):(['"A-Za-z0-9-_.,:/()%#\s]*);?/g),
        vals = [...ks],
        // eslint-disable-next-line no-unused-vars
        ret = vals.reduce((acc, [_, k, v]) => {
            const nk = k.replace(/(\w)-(\w)/g, (_, a, b) => `${a}${b.toUpperCase()}`);
            acc[nk.toString()] = v.toString();
            return acc;
        }, {}),
        sret = JSON.stringify(ret),
        jret = JSON.parse(sret);
    return jret;
}
export function css2string(v) {
    const first = v.replace(/\n/g, ''),
        ks = first.matchAll(/([A-Za-z0-9-_]*):(['"A-Za-z0-9-_.,:/()%#\s]*);?/g),
        vals = [...ks],
        // eslint-disable-next-line no-unused-vars
        ret = vals.reduce((acc, [_, k, v]) => `${acc}${k}:${v};`, '');
    return ret;
}

export const css2jss = ({ keyFrame, animate }) => ({
    ani: css2json(animate),
    kf: keyFrame
});
export const css2jstring = ({ keyFrame, animate }) => ({
    ani: css2string(animate),
    kf: keyFrame
});

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
    importFromFile,
    getUnicodeistData,
    getUnicodeistScriptTag,
    saveAsStateFileJSON,
    saveAsFileJSON,
    getCodes,
    count,
    filter,
    css2jss,
    css2jstring,
    css2string,
    openFullscreen,
    closeFullscreen,
    downloadAs,
    css2json
};
export default def;