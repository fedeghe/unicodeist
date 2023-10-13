
import ACTIONS from './actions';
import {uniqueID} from './../utils';
import {
    WIDTH, HEIGHT,
    SYMBOL_BASE_FONTSIZE,
    PANEL_WIDTH,
    DEFAULT_THEME,
    SYMBOL_BASE_FONTFAMILY,
    SYMBOL_BASE_FONTWEIGHT,
    LET_UNICODE_PANEL_OPEN_AFTER_SELECTION,
    MIN_SCALE,
    MAX_SCALE,
    MIN_ZINDEX,
    MAX_ZINDEX
} from './../constants';


const createSymbol = ({ char, zIndex, left, top }) => {
    const u = `${uniqueID}`;
    return {
        id: u,
        char,
        label : `Label for ${u}`,
        zIndex,
        left,
        top,
        color: '#000000',
        fontSize: SYMBOL_BASE_FONTSIZE,
        fontFamily: SYMBOL_BASE_FONTFAMILY,
        fontWeight: SYMBOL_BASE_FONTWEIGHT,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        scale:1,
        scaleX:1,
        scaleY:1,
        targetUp: false,
        faded: false
    };
};

const actions = {
        [ACTIONS.INIT]: () => ({
            width: WIDTH,
            height: HEIGHT,
            maxWidth: WIDTH,
            maxHeight: HEIGHT,
            themeKey: DEFAULT_THEME,
            // themeKey: 'bright',
            symbols: [],
            addPanelVisibility: false,
            focusedSymbolId: null,
            backgroundColor: '#ffffff',
            asciiSelectorFilter: '',
            symbolsFilter: '',
            asciiPanelFilterByIconName: '',
            letAsciiPanelOpenAfterSelection: LET_UNICODE_PANEL_OPEN_AFTER_SELECTION,
            embedModalVisibility: false,
            superFocus: false // isolate focusedSymbolId
        }),
        
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
        
        [ACTIONS.ADD_SYMBOL]: ({
            payload : char,
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
            superFocus: false, //in case there is one
            // and need to reset faded mode fo all symbols
            symbols: symbols.map(sym => ({
                ...sym,
                faded: false
            }))
        }),
        
        [ACTIONS.UPDATE_GLOBAL]: ({
            payload: {field, value}
        }) => ({
            [field]: value
        }),
        
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
        }) => {
            return {
                symbols: symbols.map(sym => sym.id === id
                    ? ({
                        ...sym,
                        left: parseInt(sym.left, 10) + parseInt(update.left, 10),
                        top: parseInt(sym.top, 10) + parseInt(update.top, 10),
                    })
                    : sym
                )
            };
        },

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
            payload
        }) => ({
            asciiSelectorFilter: payload
        }),
        
        [ACTIONS.SET_EMBED_MODAL_VISIBILITY]: ({
            payload = ''
        }) => ({
            embedModalVisibility: payload
        }),
        
        [ACTIONS.INIT_VIEWPORT]: ({
            payload : {maxWidth, maxHeight},
            oldState: {
                width, height
            }
        }) => {
            const newMaxWidth = parseInt(maxWidth, 10) - PANEL_WIDTH,
                newMaxHeight = parseInt(maxHeight, 10);
            return {
                maxWidth: newMaxWidth,
                maxHeight: maxHeight,
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
        
        [ACTIONS.IMPORT]: ({payload}) => ({...payload}),
        
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