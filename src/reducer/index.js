
import { uniqueID, count, filter, unbounce } from 'src/utils';
import io from 'src/io';
import {
    PANEL_WIDTH,
    MIN_SCALE,
    MAX_SCALE,
    MIN_ZINDEX,
    MAX_ZINDEX,
    UNSUPPORTEDFILE_MESSAGE,
    UNDO_UNBOUNCING,    
    DEFAULTS,
    MEASURE,
    MOVE_MULTIPLIER
} from 'src/constants';

import ACTIONS from './actions';
import allSymbols from './../Symbols';
import { keyFramesManager, createSymbol } from './utils';
import undoableActions from './undoables';

let historyCursor = 0;

const history = [],

    base = {
        backgroundColorAlpha: DEFAULTS.BACKGROUND_ALPHA,
        width: DEFAULTS.WIDTH,
        height: DEFAULTS.HEIGHT,
        maxWidth: MEASURE.getMaxWidth(),
        maxHeight: MEASURE.getMaxHeight(),
        symbols: DEFAULTS.SYMBOLS,
        addPanelVisibility: DEFAULTS.ADD_PANEL_VISIBILITY,
        focusedSymbolId: DEFAULTS.FOCUSED_SYMBOL_ID,
        backgroundColor: DEFAULTS.BACKGROUND_COLOR,
        asciiSelectorFilter: DEFAULTS.ASCII_SELECTOR_FILTER,
        symbolsFilter: DEFAULTS.SYMBOLS_FILTER,
        letAsciiPanelOpenAfterSelection: DEFAULTS.LET_UNICODE_PANEL_OPEN_AFTER_SELECTION,
        superFocus: DEFAULTS.FUPERFOCUS,
        canScrollSymbols: DEFAULTS.CAN_SCROLL_SYMBOLS,
        scrollTop: DEFAULTS.SCROLL_TOP,
        bgStyles: DEFAULTS.BACKGROUND_STYLES,
        keyFrames: keyFramesManager.synch(),
        preventReload: DEFAULTS.PREVENT_RELOAD,
        fullscreen: DEFAULTS.FULLSCREEN_MODE,
        selected: DEFAULTS.SELECTED,
        swapMode: DEFAULTS.SWAP_MODE,
        zoomLevel: DEFAULTS.ZOOM_LEVEL,
        arrowEventsActive: true,
        themeKey: DEFAULTS.THEME_KEY,
        availableSymbols: allSymbols,
        filteredCount: count(allSymbols),
    },

    actions = {
        [ACTIONS.INIT]: () => base, // not undoable
        
        [ACTIONS.NEW]: () => base,  // undoable

        [ACTIONS.SWITCH_THEME]: ({ oldState: { themeKey } }) => ({
            themeKey: themeKey === 'light' ? 'dark' : 'light'
        }),

        [ACTIONS.RESIZE]: ({
            payload: { what, value },
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
            addPanelVisibility: visibility,
            swapMode
        }),

        [ACTIONS.CAN_SCROLL_SYMBOLS]: ({ payload }) => ({
            canScrollSymbols: !!payload
        }),

        [ACTIONS.TOGGLE_ARROW_EVENTS]: ({ payload }) => ({
            arrowEventsActive: !!payload
        }),

        [ACTIONS.ADD_SYMBOL]: ({
            payload: { char },
            oldState: { symbols, width, height }
        }) => {
            // get highest zindex
            const zIndex = Object.values(symbols).reduce(
                    (acc, { zIndex }) => acc > zIndex ? acc : zIndex,
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

        [ACTIONS.SWAP_SYMBOL]: ({
            payload: { char },
            oldState: { symbols, focusedSymbolId }
        }) => ({
            symbols: symbols.map(symbol =>
                symbol.id === focusedSymbolId
                    ? ({
                        ...symbol,
                        char
                    })
                    : symbol
            )
        }),

        [ACTIONS.REMOVE_SYMBOL]: ({
            oldState: { symbols, focusedSymbolId, selected }
        }) => {
            const newSymbols = symbols.filter(s => s.id !== focusedSymbolId),
                newSelected = selected.filter(id => id !== focusedSymbolId);
            return {
                symbols: newSymbols,
                focusedSymbolId: null,
                selected: newSelected.length > 1 ? newSelected : []
            };
        },

        [ACTIONS.BULK_DELETE]: ({
            oldState: { symbols, focusedSymbolId, selected }
        }) => ({
            symbols: symbols.filter(s => !(selected.includes(s.id))),
            focusedSymbolId: selected.includes(focusedSymbolId) ? null : focusedSymbolId,
            selected: []
        }),

        [ACTIONS.CLONE_SYMBOL]: ({
            oldState: { symbols, focusedSymbolId }
        }) => {
            const clone = { ...(symbols.find(s => s.id === focusedSymbolId)) };
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
            payload: id,
            oldState: { symbols }
        }) => ({
            focusedSymbolId: id,
            superFocus: false, //in case there is one
            // and need to reset faded mode fo all symbols
            symbols: symbols.map(sym => ({
                ...sym,
                faded: false
            })),
        }),

        [ACTIONS.ZOOM_ZERO]: () => ({ zoomLevel: 1 }),

        [ACTIONS.ZOOM_IN]: ({
            oldState: { zoomLevel }
        }) => ({
            zoomLevel: parseFloat((zoomLevel + 0.1).toFixed(1))
        }),

        [ACTIONS.ZOOM_OUT]: ({
            oldState: { zoomLevel }
        }) => ({
            zoomLevel: Math.max(parseFloat((zoomLevel - 0.1).toFixed(1)), 0.1)
        }),

        [ACTIONS.UPDATE_GLOBAL]: ({
            payload: { field, value }
        }) => ({ [field]: value }),

        [ACTIONS.UPDATE_SYMBOL]: ({
            payload: { field, value },
            oldState: { symbols, focusedSymbolId }
        }) => ({
            symbols: symbols.map(
                sym => sym.id === focusedSymbolId
                    ? {
                        ...sym,
                        [field]: value
                    }
                    : sym
            )
        }),

        [ACTIONS.TUNE_SYMBOL_POSITION]: ({
            payload: { left = 0, top = 0 },
            oldState: { symbols, focusedSymbolId, zoomLevel }
        }) => ({
            symbols: symbols.map(
                sym => sym.id === focusedSymbolId
                    ? ({
                        ...sym,
                        left: parseInt(sym.left, 10) + parseInt(left / zoomLevel, 10),
                        top: parseInt(sym.top, 10) + parseInt(top / zoomLevel, 10),
                    })
                    : sym
            )
        }),

        [ACTIONS.MAX_ZI]: ({
            oldState: { symbols, focusedSymbolId }
        }) => {
            const maxZindex = symbols.reduce(
                (max, s) => s.zIndex > max ? s.zIndex : max,
                MIN_ZINDEX
            );
            return  {
                symbols: symbols.map(
                    sym => sym.id === focusedSymbolId
                        ? ({
                            ...sym,
                            zIndex: maxZindex === sym.zIndex ? maxZindex : Math.min(maxZindex + 1, MAX_ZINDEX)
                        })
                        : sym
                )
            };
        },

        [ACTIONS.MIN_ZI]: ({
            oldState: { symbols, focusedSymbolId }
        }) => {
            const minZindex = symbols.reduce(
                (min, s) => s.zIndex < min ? s.zIndex : min,
                MAX_ZINDEX
            );
            return  {
                symbols: symbols.map(
                    sym => sym.id === focusedSymbolId
                        ? ({
                            ...sym,
                            zIndex: minZindex === sym.zIndex ? minZindex : Math.max(minZindex - 1, MIN_ZINDEX)
                        })
                        : sym
                )
            };
        },

        [ACTIONS.LET_ASCIIPANEL_OPEN_AFTER_SELECTION]: ({ payload }) => ({
            letAsciiPanelOpenAfterSelection: !!payload
        }),

        [ACTIONS.SET_ASCIIPANEL_FILTER]: ({ payload: asciiSelectorFilter }) => {
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

            const newMaxWidth = parseInt(MEASURE.getMaxWidth(), 10) - PANEL_WIDTH,
                newMaxHeight = parseInt(MEASURE.getMaxHeight(), 10),
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

        [ACTIONS.IMPORT]: ({ payload, oldState }) => {
            let newState;
            try {
                newState = JSON.parse(payload);
                if (!('sym' in newState)) {
                    throw UNSUPPORTEDFILE_MESSAGE;
                }
            } catch (e) {
                return {
                    error: UNSUPPORTEDFILE_MESSAGE
                };
            }
            const t = io.uncompress(newState);
            return {
                ...t,
                keyFrames: {
                    ...oldState.keyFrames,
                    ...t.keyFrames
                },
                availableSymbols: allSymbols,
                filteredCount: count(allSymbols)
            };
        },

        [ACTIONS.IMPORT_KEYFRAMES]: ({ payload, oldState }) => {
            let keyFrames;
            try {
                keyFrames = JSON.parse(payload);
                const els = Object.values(keyFrames);
                if ( els.length === 0 ) {
                    throw UNSUPPORTEDFILE_MESSAGE;
                }
            } catch (e) {
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
            oldState: { symbols, width, focusedSymbolId }
        }) => ({
            symbols: symbols.map(
                sym => sym.id === focusedSymbolId
                    ? ({
                        ...sym,
                        left: ~~(width / 2)
                    })
                    : sym
            )
        }),

        [ACTIONS.ALIGN_V]: ({
            oldState: { symbols, height, focusedSymbolId }
        }) => ({
            symbols: symbols.map(
                sym => sym.id === focusedSymbolId
                    ? ({
                        ...sym,
                        top: ~~(height / 2)
                    })
                    : sym
            )
        }),

        [ACTIONS.MOVE_ALL_SYMBOLS]: ({
            payload: { leftTune, topTune },
            oldState: { symbols, selected }
        }) => ({
            symbols: symbols.map(
                sym => {
                    const tuned = !selected.length || selected.includes(sym.id),
                        newLeft = parseInt(sym.left + (tuned ? leftTune : 0), 10),
                        newTop = parseInt(sym.top + (tuned ? topTune : 0), 10);
                    return {
                        ...sym,
                        left: newLeft,
                        top: newTop
                    };
                }
            )
        }),

        [ACTIONS.PAN_ALL_SYMBOLS]: ({
            payload: pan,
            oldState: { symbols, selected }
        }) => ({
            symbols: symbols.map(sym => {
                const tuned = !selected.length || selected.includes(sym.id),
                    minCompliantScale = Math.max(
                        MIN_SCALE,
                        parseFloat(sym.scale, 10) - (tuned ? parseInt(pan, 10) : 0)
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

        [ACTIONS.SET_SYMBOLS_FILTER]: ({ payload: symbolsFilter }) => ({ symbolsFilter }),

        [ACTIONS.REMOVE_ERROR]: () => ({ error: null }),

        // not on focusedSymbolId
        [ACTIONS.MOVE_SYMBOL]: ({
            payload: { id, direction },
            oldState: { symbols }
        }) => {
            const position = symbols.findIndex(s => s.id === id),
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
            payload: { key, multiplier },
            oldState: {
                focusedSymbolId, symbols,
                selected
            }
        }) => {
            const what = {
                    ArrowLeft: { field: 'left', diff: -1 },
                    ArrowRight: { field: 'left', diff: 1 },
                    ArrowUp: { field: 'top', diff: -1 },
                    ArrowDown: { field: 'top', diff: 1 },
                }[key],
                mustConsider = selected.length
                    ? ({ id }) => selected.includes(id)
                    : ({ id }) => id === focusedSymbolId;

            return {
                symbols: symbols.map(s =>
                    mustConsider(s)
                        ? {
                            ...s,
                            [what.field]: s[what.field] + what.diff*(multiplier ? MOVE_MULTIPLIER : 1)
                        }
                        : s
                )
            };
        },

        [ACTIONS.UPDATE_KEY_FRAME]: ({
            payload: { name, keyFrame },
            oldState: { keyFrames }
        }) => {
            const newKeyFrames = {
                ...keyFrames,
                [name]: keyFrame
            };
            keyFramesManager.synch(newKeyFrames);
            return {
                keyFrames: newKeyFrames
            };
        },

        [ACTIONS.REMOVE_KEY_FRAME]: ({
            payload: { name },
            oldState: { keyFrames }
        }) => {
            const newKeyFrames = { ...keyFrames };
            delete newKeyFrames[name];
            keyFramesManager.synch(newKeyFrames);
            return {
                keyFrames: newKeyFrames,
            };
        },

        [ACTIONS.REMOVE_ALL_KEY_FRAMES]: () => {
            keyFramesManager.synch({});
            return {
                keyFrames: {},
            };
        },

        [ACTIONS.EXPAND_FAMILY]: ({
            oldState: { availableSymbols },
            payload: label
        }) => {

            return {
                availableSymbols: availableSymbols.map(as => ({
                    ...as,
                    expanded: as.label === label
                }))
            };
        },

        [ACTIONS.COLLAPSE_FAMILY]: ({
            oldState: { availableSymbols },
            payload: label
        }) => {

            return {
                availableSymbols: availableSymbols.map(as => ({
                    ...as,
                    expanded: as.label === label ? false : as.expanded
                }))
            };
        },

        [ACTIONS.TOGGLE_SYMBOL_SELECTION]: ({ payload: id, oldState: { selected } }) => ({
            selected: selected.includes(id)
                ? selected.filter(i => i !== id)
                : [...selected, id]
        }),
        
        [ACTIONS.TOGGLE_SYMBOLS_SELECTION]: ({ payload: what, oldState: { selected, symbols } }) => {
            switch (what) {
                case 'selectAll':
                    return { selected: symbols.map(s => s.id) };
                case 'unselectAll':
                    return { selected: [] };
                case 'invertAll':
                    return {
                        selected: symbols
                            .filter(sym => !(selected.includes(sym.id)))
                            .map(sym => sym.id)
                    };
            }
            return {};
        },

        [ACTIONS.BULK_ALIGNV]: ({
            oldState: { symbols, selected }
        }) => {
            const mean = parseInt(
                symbols
                    .filter(({ id }) => selected.includes(id))
                    .reduce((acc, { top }) => acc + top, 0) / selected.length,
                10
            );

            return {
                symbols: symbols.map(sym =>
                    selected.includes(sym.id)
                        ? { ...sym, top: mean }
                        : sym
                )
            };
        },

        [ACTIONS.BULK_ALIGNH]: ({
            oldState: { symbols, selected }
        }) => {
            const mean = parseInt(
                symbols
                    .filter(({ id }) => selected.includes(id))
                    .reduce((acc, { left }) => acc + left, 0) / selected.length,
                10
            );

            return {
                symbols: symbols.map( sym =>
                    selected.includes(sym.id)
                        ? { ...sym, left: mean }
                        : sym
                )
            };
        },

        [ACTIONS.BULK_SPACE]: ({ oldState: { symbols, selected }, payload: what }) => {
            const sortedSymbols = symbols
                .filter(({ id }) => selected.includes(id)),
                // .sort((a, b) => a[what] - b[what]),
                lastIndex = sortedSymbols.length - 1,
                min = sortedSymbols[0][what],
                max = sortedSymbols[lastIndex][what],
                span = max - min,
                step = span / lastIndex;

            return {
                symbols: symbols.map(sym => {
                    const index = sortedSymbols.findIndex(({ id }) => id === sym.id);
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

        [ACTIONS.BULK_CENTER_HORIZONALLY]: ({ oldState: { symbols, width, selected } }) => {
            const { min, max } = symbols
                .filter(({ id }) => selected.includes(id))
                .reduce(
                    (acc, symbol) => {
                        symbol.left < acc.min && (acc.min = symbol.left);
                        symbol.left > acc.max && (acc.max = symbol.left);
                        return acc;
                    }
                    , { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }),
                meanLeft = (min + max) / 2,

                targetLeft = width / 2,
                diffLeft = targetLeft - meanLeft;
            return {
                symbols: symbols.map( symbol =>
                    selected.includes(symbol.id)
                        ? { ...symbol, left: symbol.left + diffLeft }
                        : symbol
                )
            };
        },

        [ACTIONS.BULK_CENTER_VERTICALLY]: ({ oldState: { symbols, height, selected } }) => {
            const { min, max } = symbols
                .filter(({ id }) => selected.includes(id))
                .reduce(
                    (acc, symbol) => {
                        symbol.top < acc.min && (acc.min = symbol.top);
                        symbol.top > acc.max && (acc.max = symbol.top);
                        return acc;
                    }
                    , { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }),
                meanTop = (min + max) / 2,
                targetTop = height / 2,
                diffTop = targetTop - meanTop;
            return {
                symbols: symbols.map(symbol =>
                    selected.includes(symbol.id)
                        ? { ...symbol, top: symbol.top + diffTop }
                        : symbol
                )
            };
        },

        [ACTIONS.UNDO]: () => {
            const previous = history[historyCursor - 1];
            historyCursor--;
            return { ...previous };
        },

        [ACTIONS.SAVE_SCROLL]: ({payload}) => ({scrollTop : payload})
    },

    unbounced = unbounce(({prev}) => {
        history[historyCursor++] = prev;
    }, UNDO_UNBOUNCING),

    reducer = (oldState, action) => {
        const { payload = {}, type } = action;
        if (typeof type === 'undefined') throw new Error('Action type not given');
        if (type in actions) {
            const changes = actions[type]({ payload, oldState }),
                newState = {
                    ...oldState,
                    ...changes
                },
                changedKeys = Object.keys(changes);

            undoableActions.includes(type) && unbounced({
                prev: Object.entries(oldState).reduce((acc, [k, v]) => {
                    if (changedKeys.includes(k)) acc[k] = v;
                    return acc;
                }, {})
            });
            return {
                ...newState,
                canUndo: historyCursor > 0,
                undos: historyCursor
            };
        } else {
            console.warn(`Action ${type} not expected`);
        }
        return oldState;
    };

const exp = () => ({
    reducer,
    init: (cnf = {}) => reducer({}, { type: ACTIONS.INIT, payload: cnf }),
    base
});

export default exp;