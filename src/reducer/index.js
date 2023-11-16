/* eslint-disable no-debugger */
import ACTIONS from './actions';
import {uniqueID, count, filter} from 'src/utils';
import {getMaxHeight, getMaxWidth} from 'src/constants';
import allSymbols from './../Symbols';
import { uncompress, keyFramesManager } from './utils';

import {
    WIDTH, HEIGHT,
    PANEL_WIDTH,
    DEFAULT_THEME,
    SYMBOL_BASE_FONTFAMILY,
    SYMBOL_BASE_FONTWEIGHT,
    LET_UNICODE_PANEL_OPEN_AFTER_SELECTION,
    MIN_SCALE,
    MAX_SCALE,
    MIN_ZINDEX,
    MAX_ZINDEX,
    UNSUPPORTEDFILE_MESSAGE,
    DEFAULT_BACKGROUND_ALPHA,
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_SYMBOL_COLOR,
    DEFAULT_PREVENT_RELOAD
} from 'src/constants';

const createSymbol = ({ char, zIndex, left, top }) => {
    const u = `${uniqueID}`;
    return {
        id: u,
        char,
        label : `${u}`,
        zIndex,
        left,
        top,
        color: DEFAULT_SYMBOL_COLOR,
        fontFamily: SYMBOL_BASE_FONTFAMILY,
        fontWeight: SYMBOL_BASE_FONTWEIGHT,
        skewX: 0,
        skewY: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        blur: 0,
        opacity: 1,
        scale:1,
        scaleX:1,
        scaleY:1,
        targetUp: false,
        faded: false,
        animation: false,
        additionalStyles:false,
        italic: false
    };
};

const base = {
    backgroundColorAlpha: DEFAULT_BACKGROUND_ALPHA,
    width: WIDTH,
    height: HEIGHT,
    maxWidth: getMaxWidth(),
    maxHeight: getMaxHeight(),
    symbols: [],
    addPanelVisibility: false,
    focusedSymbolId: null,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    asciiSelectorFilter: '',
    symbolsFilter: '',
    asciiPanelFilterByIconName: '',
    letAsciiPanelOpenAfterSelection: LET_UNICODE_PANEL_OPEN_AFTER_SELECTION,
    superFocus: false,
    canScrollSymbols: true,
    scrollTop : 0,
    bgStyles:false,
    keyFrames:keyFramesManager.synch(),
    preventReload: DEFAULT_PREVENT_RELOAD,
    fullscreen: false,
    availableSymbols: [],
    selected: [],
    swapMode: false 
};


const actions = {
        [ACTIONS.INIT]: () => ({
            ...base,
            themeKey: DEFAULT_THEME,
            availableSymbols: allSymbols,
            filteredCount: count(allSymbols),
        }),
        [ACTIONS.NEW]: () => base,
        
        [ACTIONS.SWITCH_THEME]: ({
            oldState: {themeKey}
        }) => ({
            themeKey: themeKey === 'light'
                ? 'dark' : 'light'
        }),
        
        [ACTIONS.RESIZE]: ({
            payload: {what, value},
            oldState
        }) => {
            const { symbols } = oldState,
                v = parseInt(value, 10),
                offset = v - oldState[what],
                halfHoffset = offset / 2,
                posDimension = what === 'height' ? 'top' : 'left';
            return {
                [what]: v,
                symbols: symbols.map(s => ({
                    ...s,
                    [posDimension]: s[posDimension] + halfHoffset
                }))
            };
        },
        
        [ACTIONS.TOGGLE_ADD_PANEL]: ({
            payload: {
                visibility,
                swapMode = false
            }
        }) => ({
            addPanelVisibility : visibility,
            swapMode
        }),
        [ACTIONS.CAN_SCROLL_SYMBOLS]: ({payload}) => ({
            canScrollSymbols : payload
        }),
        
        [ACTIONS.ADD_SYMBOL]: ({
            payload : { char, scrollTop },
            oldState: { symbols, width, height}
        }) => {
            // get highest zindex
            const zIndex = Object.values(symbols).reduce(
                    (acc, {zIndex}) => acc > zIndex ? acc : zIndex,
                    0
                ) + 1,
                newSymbol = createSymbol({
                    char,
                    left: width / 2,
                    top: height / 2,
                    zIndex
                });
            return {
                scrollTop,
                focusedSymbolId: newSymbol.id,
                symbols: [
                    ...symbols,
                    newSymbol
                ]
            };
        },
        [ACTIONS.SWAP_SYMBOL]: ({
            payload : { char },
            oldState: { symbols, focusedSymbolId}
        }) => ({
            symbols: symbols.map(symbol =>
                symbol.id === focusedSymbolId
                ? ({
                    ...symbol,
                    char
                }) : symbol
            )
        }),

        [ACTIONS.REMOVE_SYMBOL]: ({
            oldState: { symbols, focusedSymbolId, selected }
        }) => ({
            symbols: symbols.filter(s => s.id !== focusedSymbolId),
            focusedSymbolId : null,
            selected: selected.filter(id => id !== focusedSymbolId)
        }),

        [ACTIONS.BULK_DELETE]: ({
            oldState: { symbols, focusedSymbolId, selected }
        }) => ({
            symbols: symbols.filter(s => !(selected.includes(s.id))),
            focusedSymbolId : selected.includes(focusedSymbolId) ? null : focusedSymbolId,
            selected: []
        }),

        [ACTIONS.CLONE_SYMBOL]: ({
            oldState: { symbols, focusedSymbolId }
        }) => {
            const clone = {...(symbols.find(s => s.id === focusedSymbolId))};
            clone.id = `${uniqueID}`;
            clone.label = 'Clone0ƒ ' + clone.label;
            return {
                symbols: [
                    ...symbols,
                    clone
                ]
            };
        },

        [ACTIONS.FOCUS_ON_SYMBOL]: ({
            payload : id,
            oldState: { symbols }
        }) => ({
            focusedSymbolId: id,
            hoveringId: id,
            superFocus: false, //in case there is one
            // and need to reset faded mode fo all symbols
            symbols: symbols.map(sym => ({
                ...sym,
                faded: false
            })),
        }),
        
        [ACTIONS.UPDATE_GLOBAL]: ({
            payload: {field, value}
        }) => ({ [field]: value }),
        
        [ACTIONS.UPDATE_SYMBOL]: ({
            payload: {field, value},
            oldState: {symbols, focusedSymbolId}
        }) => ({
            symbols: symbols.map(sym => sym.id === focusedSymbolId
                ? {
                    ...sym,
                    [field]: value
                }
                : sym
            )
        }),

        [ACTIONS.TUNE_SYMBOL_POSITION]: ({
            payload: {left, top},
            oldState: {symbols, focusedSymbolId}
        }) => ({
            symbols: symbols.map(sym => sym.id === focusedSymbolId
                ? ({
                    ...sym,
                    left: parseInt(sym.left, 10) + parseInt(left, 10),
                    top: parseInt(sym.top, 10) + parseInt(top, 10),
                })
                : sym
            )
        }),

        [ACTIONS.MAX_ZI]: ({
            oldState: {symbols, focusedSymbolId}
        }) => {
            const maxZindexSymbol = symbols.reduce(
                (a, n) => n.zIndex > a.zIndex ? n : a,
                {zIndex: MIN_ZINDEX}
            );
            if (maxZindexSymbol.id === focusedSymbolId) return {};
            return {
                symbols: symbols.map(
                    sym => sym.id === focusedSymbolId
                        ? ({
                            ...sym,
                            zIndex: maxZindexSymbol.zIndex+1
                        })
                        : sym
                )
            };
        },

        [ACTIONS.MIN_ZI]: ({
            oldState: {symbols, focusedSymbolId}
        }) => {
            const minZindexSymbol = symbols.reduce(
                (a, n) => n.zIndex < a.zIndex ? n : a,
                {zIndex: MAX_ZINDEX}
            );
            if (minZindexSymbol.id === focusedSymbolId) return {};
            return {
                symbols: symbols.map(sym => sym.id === focusedSymbolId
                    ? ({
                        ...sym,
                        zIndex: Math.max(0, minZindexSymbol.zIndex-1)
                    })
                    : sym
                )
            };
        },
        
        [ACTIONS.LET_ASCIIPANEL_OPEN_AFTER_SELECTION] : ({
            payload
        }) => ({
            letAsciiPanelOpenAfterSelection: payload
        }),
        
        [ACTIONS.SET_ASCIIPANEL_FILTER]: ({
            payload: asciiSelectorFilter,
        }) => {
            const newAvailableSymbols = filter({
                symbols: allSymbols,
                filter: asciiSelectorFilter
            });
            return {
                asciiSelectorFilter,
                availableSymbols: newAvailableSymbols,
                filteredCount: count(newAvailableSymbols) 
            };
        },
        
        [ACTIONS.INIT_VIEWPORT]: ({
            oldState: {
                width, height,
                symbols
            }
        }) => {
            const newMaxWidth = parseInt(getMaxWidth(), 10) - PANEL_WIDTH,
                newMaxHeight = parseInt(getMaxHeight(), 10),
                newWidth = Math.min(width, newMaxWidth),
                newHeight = Math.min(height, newMaxHeight),
                offsetLeft = Math.min(0, newWidth - width) / 2,
                offsetTop = Math.min(0, newHeight - height) / 2;
            return {
                maxWidth: newMaxWidth,
                maxHeight: newMaxHeight,
                width: newWidth,
                height: newHeight,
                symbols: symbols.map(sym => ({
                    ...sym,
                    top: sym.top + offsetTop,
                    left: sym.left + offsetLeft,
                }))
            };
        },

        [ACTIONS.SYMBOL_FOCUS]: ({
            oldState: { focusedSymbolId, superFocus, symbols }
        }) => ({
            // toggle superFocus
            superFocus: !superFocus,
            // if it was superFocused then remove all faded
            // otherwise set all others faded
            symbols: symbols.map(sym => ({
                ...sym,
                faded: superFocus
                    ? false
                    : sym.id !== focusedSymbolId
            }))
        }),
        
        [ACTIONS.IMPORT]: ({payload, oldState}) => {
            let newState;
            try {
                newState = JSON.parse(payload);
                if (!('sty' in newState) || !('sym' in newState)) {
                    throw UNSUPPORTEDFILE_MESSAGE;
                }
            } catch(e) {
                return {
                    error: UNSUPPORTEDFILE_MESSAGE
                };
            }
            var t = uncompress(newState);
            return {
                ...t,
                keyFrames: {
                    ...oldState.keyFrames,
                    ...t.keyFrames
                }
            };
        },
        [ACTIONS.IMPORT_KEYFRAMES]: ({payload, oldState}) => {
            let keyFrames;
            try {
                keyFrames = JSON.parse(payload);
                const els = Object.values(keyFrames);
                if (!('name' in els[0]) || !('keyFrame' in els[0])) {
                    throw UNSUPPORTEDFILE_MESSAGE;
                }
            } catch(e) {
                return {
                    error: UNSUPPORTEDFILE_MESSAGE
                };
            }
            return {
                keyFrames: {
                    ...oldState.keyFrames,
                    ...keyFrames
                }
            };
        },
        
        [ACTIONS.ALIGN_H]: ({
            oldState: {symbols, width, focusedSymbolId}
        }) => ({
            symbols: symbols.map(
                sym => sym.id === focusedSymbolId
                ? ({
                    ...sym,
                    left: ~~(width/2)
                })
                : sym
            )
        }),

        [ACTIONS.ALIGN_V]: ({
            oldState: {symbols, height, focusedSymbolId}
        }) => ({
            symbols: symbols.map(
                sym => sym.id === focusedSymbolId
                ? ({
                    ...sym,
                    top: ~~(height/2)
                })
                : sym
            )
        }),

        [ACTIONS.MOVE_ALL_SYMBOLS]:({
            payload: {leftTune, topTune},
            oldState: { symbols, selected }
        }) => ({
            symbols: symbols.map(sym => {
                const tuned = !selected.length || selected.includes(sym.id),
                    newLeft = parseInt(sym.left + (tuned ? leftTune : 0), 10),
                    newTop = parseInt(sym.top + (tuned ? topTune : 0), 10);
                return {
                    ...sym,
                    left: newLeft,
                    top: newTop
                };
            })
        }),

        [ACTIONS.PAN_ALL_SYMBOLS]: ({
            payload: pan,
            oldState: { symbols, selected }
        }) => ({
            symbols: symbols.map(sym => {
                const tuned = !selected.length || selected.includes(sym.id),
                    minCompliantScale = Math.max(
                        MIN_SCALE,
                        parseInt(sym.scale, 10) - (tuned ? parseInt(pan, 10) : 0)
                    ),
                    compliantScale = Math.min(
                        MAX_SCALE,
                        minCompliantScale
                    );
                return {
                    ...sym,
                    scale: compliantScale
                };
            })
        }),

        [ACTIONS.SET_SYMBOLS_FILTER] : ({ payload: symbolsFilter }) => ({ symbolsFilter }),

        [ACTIONS.REMOVE_ERROR] : ( ) => ({ error: null}),
        [ACTIONS.TOGGLE_ITALIC] : ({
            oldState:{
                symbols,
                focusedSymbolId
            }
        }) => ({ 
            symbols: symbols.map(symbol => symbol.id === focusedSymbolId
                ? ({
                    ...symbol,
                    italic: !symbol.italic
                })
                : symbol
            )
        }),

        // not on focusedSymbolId
        [ACTIONS.MOVE_SYMBOL] : ({
            payload: { id, direction },
            oldState: { symbols }
        }) => {
            const position = symbols.findIndex(s =>s.id === id),
                newSymbols = symbols.filter(s => s.id !== id),
                newPosition = position + direction,
                canProceed = newPosition >= 0 && newPosition <= symbols.length;
            if (canProceed) {
                newSymbols.splice(newPosition, 0, symbols[position]);
            }
            return {
                symbols: canProceed ? newSymbols : symbols
            };
        },

        [ACTIONS.MOVE_TARGET_ONE_PX]: ({
            payload : key,
            oldState: {
                focusedSymbolId, symbols
            }
        }) => {
            const what = {
                ArrowLeft: {field: 'left', diff: -1},
                ArrowRight: {field: 'left', diff: 1},
                ArrowUp: {field: 'top', diff: -1},
                ArrowDown: {field: 'top', diff: 1},
            }[key];
            return {symbols: symbols.map(s => (
                s.id === focusedSymbolId ? 
                {
                    ...s,
                    [what.field]: s[what.field] + what.diff
                } : s
            ))};
        },

        [ACTIONS.UPDATE_KEY_FRAME]: ({
            payload: {name, keyFrame, animate},
            oldState: { keyFrames }
        }) => {
            const newKeyFrames = {
                ...keyFrames,
                [name]: {
                    name,
                    keyFrame,
                    animate
                }
            };
            keyFramesManager.synch(newKeyFrames);
            return {
                keyFrames: newKeyFrames
            };
        },
        [ACTIONS.REMOVE_KEY_FRAME]:({
            payload: { name },
            oldState: { keyFrames, symbols }
        }) => {
            const newKeyFrames = {...keyFrames};
            delete newKeyFrames[name];
            keyFramesManager.synch(newKeyFrames);
            return {
                keyFrames: newKeyFrames,
                symbols: symbols.map(s => ({
                    ...s,
                    animation: s.animation === name ? null : s.animation
                }))
            };
        },
        [ACTIONS.REMOVE_ALL_KEY_FRAMES]:({
            oldState: {symbols}
        }) => {
            keyFramesManager.synch({});
            return {
                keyFrames: {},
                symbols: symbols.map(s => ({...s, animation: null}))
            };
        },
        [ACTIONS.EXPAND_FAMILY]:({
            oldState: {availableSymbols},
            payload: label
        }) => {
            
            return {
                availableSymbols: availableSymbols.map(as => ({
                    ...as,
                    expanded: as.label === label
                }))
            };
        },
        [ACTIONS.COLLAPSE_FAMILY]:({
            oldState: {availableSymbols},
            payload: label
        }) => {
            
            return {
                availableSymbols: availableSymbols.map(as => ({
                    ...as,
                    expanded: as.label === label ? false : as.expanded
                }))
            };
        },

        [ACTIONS.TOGGLE_SYMBOL_SELECTION]: ({payload: id, oldState: {selected}}) => ({
            selected: selected.includes(id)
                ? selected.filter(i => i!==id)
                : [...selected, id]
        }),
        [ACTIONS.TOGGLE_SYMBOLS_SELECTION]: ({payload: what, oldState: {selected, symbols}}) => {
            switch(what) {
                case 'selectAll': 
                    return {selected: symbols.map(s =>s.id)};
                case  'unselectAll': 
                    return {selected: []};
                case 'invertAll': 
                    return {
                        selected: symbols
                            .filter(sym =>!(selected.includes(sym.id)))
                            .map(sym => sym.id)};
            }
            return {};
        },

        [ACTIONS.BULK_ALIGNV]: ({
            oldState: { symbols, selected }
        }) => {
            const mean = parseInt(
                symbols
                    .filter(({id}) => selected.includes(id))
                    .reduce((acc, {top}) => acc + top, 0) / selected.length,
                10
            );
            
            return {
                symbols: symbols.map(
                    sym => selected.includes(sym.id)
                        ? {...sym, top: mean}
                        : sym
                )
            };
        },
        [ACTIONS.BULK_ALIGNH]: ({
            oldState: { symbols, selected }
        }) => {
            const mean = parseInt(
                symbols
                    .filter(({id}) => selected.includes(id))
                    .reduce((acc, {left}) => acc + left, 0) / selected.length,
                10
            );
            
            return {
                symbols: symbols.map(
                    sym => selected.includes(sym.id)
                        ? {...sym, left: mean}
                        : sym
                )
            };
        },
        [ACTIONS.BULK_SPACE]: ({ oldState: { symbols, selected }, payload : what}) => {
            const sortedSymbols = symbols
                    .filter(({id})=> selected.includes(id))
                    .sort((a, b) => a[what] - b[what]),
                lastIndex = sortedSymbols.length - 1,
                min = sortedSymbols[0][what],
                max = sortedSymbols[lastIndex][what],
                span = max - min,
                step = span / lastIndex;

            return {
                symbols: symbols.map(sym => {
                    const index = sortedSymbols.findIndex(({id}) => id === sym.id);
                    if (index >= 0) {
                        return {
                            ...sortedSymbols[index],
                            [what]: parseInt(min + index * step, 10)
                        };
                    }
                    return sym;
                })
            };
        },

    },
    reducer = (oldState, action) => {
        const { payload = {}, type } = action;
        if (typeof type === 'undefined') throw new Error('Action type not given');
        if (type in actions){
            return {
                ...oldState,
                ...actions[type]({payload, oldState})
            };
        } else {
            console.warn(`Action ${type} not expected`);
        }
        return oldState;
    };

const exp = () => ({
    reducer,
    init: (cnf = {}) => reducer({}, {type: ACTIONS.INIT, payload: cnf})
});

export default exp;