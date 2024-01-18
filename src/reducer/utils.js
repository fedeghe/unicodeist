import {
    LOCALSTORAGE_KEYFRAMES_KEY,
    SYMBOL_DEFAULTS
} from 'src/constants';

import { uniqueID } from 'src/utils';

export const keyFramesManager = {
    synch : toWrite => 
        toWrite
            ? localStorage.setItem(LOCALSTORAGE_KEYFRAMES_KEY, JSON.stringify(toWrite))
            : JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYFRAMES_KEY) || '{}')
};

export const createSymbol = ({ char, zIndex, left, top }) => {
    const u = `${uniqueID}`;
    return {
        id: u,
        char,
        label: `${u}`,
        zIndex,
        left,
        top,
        additionalStyles: SYMBOL_DEFAULTS.ADDITIONAL_STYLES,
        blur: SYMBOL_DEFAULTS.BLUR,
        color: SYMBOL_DEFAULTS.COLOR,
        faded: SYMBOL_DEFAULTS.FADED,
        fontFamily: SYMBOL_DEFAULTS.FONTFAMILY,
        fontWeight: SYMBOL_DEFAULTS.FONTWEIGHT,
        italic: SYMBOL_DEFAULTS.ITALIC,
        opacity: SYMBOL_DEFAULTS.OPACITY,
        rotationX: SYMBOL_DEFAULTS.ROTATIONX,
        rotationY: SYMBOL_DEFAULTS.ROTATIONY,
        rotationZ: SYMBOL_DEFAULTS.ROTATIONZ,
        scale: SYMBOL_DEFAULTS.SCALE,
        scaleX: SYMBOL_DEFAULTS.SCALEX,
        scaleY: SYMBOL_DEFAULTS.SCALEY,
        skewX: SYMBOL_DEFAULTS.SKEWX,
        skewY: SYMBOL_DEFAULTS.SKEWY,
    };
};


const exp = {
    keyFramesManager,
    createSymbol
};

export default exp;