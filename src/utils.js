import {
    UNICODEIST_SCRIPT_URI,
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
        const inSymbols = symbols.find(({ additionalStyles }) =>
            additionalStyles.includes(`${k}`)
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
        if('label' in sym) {
            child.dataset.id = sym.label;
        }
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
            to = setTimeout(() => { calls = true; }, delay);
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

export const saveAsFileJSON = ({what, compress = false}) =>
    new Promise(resolve => {
        const blob = new Blob([compress ? io.compress(what) : JSON.stringify(what)]);
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

export const getUnicodeistScriptTag = state => {
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

export const seekAllCssRules = css => {
    const first = css.replace(/^\s*\/\/[^\n]*/g, ''),

        ks = first.matchAll(/\s*([^:\s]*)\s?:\s?(.*)?;/g),
        res = [...ks];
    return res.map(r => [r[1], r[2]]);
};

export const css2json = (c, jssify = true) => seekAllCssRules(c)
    .reduce((acc, [k, v]) => {
        const nk = jssify ? k.replace(/(\w)-(\w)/g, (_, a, b) => `${a}${b.toUpperCase()}`) : k;
        acc[nk.toString().trim()] = v.toString().trim();
        return acc;
    }, {});

export const json2string = o => Object.entries(o).reduce(
    (acc, [k, e]) => `${acc}${k}:${e};`,
    ''
);
export const css2string = v => {
    const vals = seekAllCssRules(v),
        ret = vals.reduce((acc, [k, v]) => `${acc}${k}:${v};`, '');
    return ret;
};


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
    getUnicodeistScriptTag,
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
    seekAllCssRules
};
export default def;