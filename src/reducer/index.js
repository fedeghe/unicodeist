
import ACTIONS from './actions';
import {uniqueID, count, filter} from 'src/utils';
import {getMaxHeight, getMaxWidth} from 'src/constants';
import allSymbols from './../Symbols';
import uncompress from './utils';
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
    DEFAULT_SYMBOL_COLOR
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
        faded: false
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
    scrollTop : 0
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
            themeKey: themeKey === 'bright'
                ? 'dark' : 'bright'
        }),
        
        [ACTIONS.RESIZE]: ({
            payload: {what, value}
        }) => ({
            [what]: parseInt(value, 10)
        }),
        
        [ACTIONS.TOGGLE_ADD_PANEL]: ({
            payload: visibility
        }) => ({
            addPanelVisibility : visibility
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

        [ACTIONS.REMOVE_SYMBOL]: ({
            payload : id,
            oldState: { symbols }
        }) => ({
            symbols: symbols.filter(s => s.id !== id),
            focusedSymbolId : null
        }),

        [ACTIONS.CLONE_SYMBOL]: ({
            payload : id,
            oldState: { symbols }
        }) => {
            const clone = {...(symbols.find(s => s.id === id))};
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
            payload: {id, field, value},
            oldState: {symbols}
        }) => ({
            symbols: symbols.map(sym => sym.id === id
                ? {
                    ...sym,
                    [field]: value
                }
                : sym
            )
        }),

        [ACTIONS.TUNE_SYMBOL_POSITION]: ({
            payload: {id, update},
            oldState: {symbols}
        }) => ({
            symbols: symbols.map(sym => sym.id === id
                ? ({
                    ...sym,
                    left: parseInt(sym.left, 10) + parseInt(update.left, 10),
                    top: parseInt(sym.top, 10) + parseInt(update.top, 10),
                })
                : sym
            )
        }),

        [ACTIONS.MAX_ZI]: ({
            payload: id,
            oldState: {symbols}
        }) => {
            const maxZindex = symbols.reduce(
                (a, n) => n.zIndex > a ? n.zIndex : a,
                MIN_ZINDEX
            );
            return {
                symbols: symbols.map(
                    sym => sym.id === id
                        ? ({
                            ...sym,
                            zIndex: maxZindex+1
                        })
                        : sym
                )
            };
        },

        [ACTIONS.MIN_ZI]: ({
            payload: id,
            oldState: {symbols}
        }) => {
            const minZindex = symbols.reduce(
                (a, n) => n.zIndex < a
                    ? n.zIndex
                    : a,
                MAX_ZINDEX
            );
            return {
                symbols: symbols.map(sym => sym.id === id
                    ? ({
                        ...sym,
                        zIndex: Math.max(0, minZindex-1)
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
                width, height
            }
        }) => {
            const newMaxWidth = parseInt(getMaxWidth(), 10) - PANEL_WIDTH,
                newMaxHeight = parseInt(getMaxHeight(), 10);
            return {
                maxWidth: newMaxWidth,
                maxHeight: newMaxHeight,
                width: Math.min(width, newMaxWidth),
                height: Math.min(height, newMaxHeight),
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
        
        [ACTIONS.IMPORT]: ({payload}) => {
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
            return uncompress(newState);
        },
        
        [ACTIONS.ALIGN_H]: ({payload: id, oldState: {symbols, width}}) => ({
            symbols: symbols.map(
                sym => sym.id === id
                ? ({
                    ...sym,
                    left: ~~(width/2)
                })
                : sym
            )
        }),

        [ACTIONS.ALIGN_V]: ({
            payload: id ,
            oldState: {symbols, height}
        }) => ({
            symbols: symbols.map(
                sym => sym.id === id
                ? ({
                    ...sym,
                    top: ~~(height/2)
                })
                : sym
            )
        }),

        [ACTIONS.MOVE_ALL_SYMBOLS]:({
            payload: {leftTune, topTune},
            oldState: { symbols }
        }) => ({
            symbols: symbols.map(sym => {
                const newLeft = parseInt(sym.left + leftTune, 10);
                const newTop = parseInt(sym.top + topTune, 10);
                return {
                    ...sym,
                    left: newLeft,
                    top: newTop
                };
            })
        }),

        [ACTIONS.PAN_ALL_SYMBOLS]: ({payload, oldState: { symbols }}) => ({
            symbols: symbols.map(sym => {
                const minCompliantScale = Math.max(
                    MIN_SCALE,
                    parseInt(sym.scale, 10) - parseInt(payload, 10)
                );
                const compliantScale = Math.min(
                    MAX_SCALE,
                    minCompliantScale
                );
                return {
                    ...sym,
                    scale: compliantScale
                };
            })
        }),

        [ACTIONS.SET_SYMBOLS_FILTER] : ({ payload }) => ({ symbolsFilter: payload}),

        [ACTIONS.REMOVE_ERROR] : ( ) => ({ error: null}),

        [ACTIONS.MOVE_SYMBOL] : ({
            payload: { id, direction },
            oldState: { symbols }
        }) => {
            const position = symbols.findIndex(s =>s.id === id),
                newSymbols = symbols.filter(s =>s.id !== id),
                newPosition = position + direction,
                canProceed = newPosition >= 0 && newPosition <= symbols.length;
            if (canProceed) {
                newSymbols.splice(newPosition, 0, symbols[position]);
            }
            return {
                symbols: canProceed ? newSymbols : symbols
            };
        },

        [ACTIONS.MOVE_TARGET_ONE_PX]: ({payload : key, oldState: {focusedSymbolId, symbols}}) => {
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
        }
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