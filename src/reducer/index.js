
import ACTIONS from './actions';
import {uniqueID} from './../utils';
import {
    WIDTH, HEIGHT,
    SYMBOL_BASE_FONTSIZE,
    PANEL_WIDTH,
    SYMBOL_BASE_FONTFAMILY, SYMBOL_BASE_FONTWEIGHT} from './../constants';

const createSymbol = ({ char, zIndex, left, top }) => {
    const u = `${uniqueID}`
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
        rotation: 0,
        opacity: 1,
        locked: false,
        targetUp: false,
    }
}

const actions = {
        [ACTIONS.INIT]: ({payload: cnf}) => ({
            width: WIDTH,
            height: HEIGHT,
            maxWidth: WIDTH,
            maxHeight: HEIGHT,
            themeKey: 'bright',
            symbols: [],
            addPanelVisibility: false,
            focusedSymbolId: null,
            backgroundColor: '#ffffff',
            asciiPanelFilter: '',
            letAsciiPanelOpenAfterSelection: false,
            embedModalVisibility: false
        }),
        [ACTIONS.SWITCH_THEME]: ({oldState: {themeKey}}) => ({
            themeKey: themeKey === 'bright' ? 'dark' : 'bright'
        }),
        [ACTIONS.RESIZE]: ({payload: {what, value}}) => ({ [what]: value }),
        [ACTIONS.TOGGLE_ADD_PANEL]: ({payload: visibility}) => ({addPanelVisibility : visibility }),
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
            }
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
            }
        },
        [ACTIONS.FOCUS_ON_SYMBOL]: ({
            payload : id,
        }) => ({
            focusedSymbolId: id
        }),
        [ACTIONS.UPDATE_GLOBAL]: ({payload: {field, value}}) => ({[field]: value}),
        [ACTIONS.UPDATE_SYMBOL]: ({payload: {id, field, value}, oldState: {symbols}}) => ({
            symbols: symbols.map(sym => sym.id === id ? {
                    ...sym,
                    [field]: value
                } : sym)
        }),
        [ACTIONS.TUNE_SYMBOL_POSITION]: ({payload: {id, update}, oldState: {symbols}}) => {
            return {
                symbols: symbols.map(sym => sym.id === id ? ({
                    ...sym,
                    left: parseInt(sym.left, 10) + parseInt(update.left, 10),
                    top: parseInt(sym.top, 10) + parseInt(update.top, 10),
                }) : sym)
            }
        }
        ,
        [ACTIONS.MAX_ZI]: ({payload: id, oldState: {symbols}}) => {
            const maxZindex = symbols.reduce((a, n) => n.zIndex > a ? n.zIndex : a, Number.NEGATIVE_INFINITY)
            return {
                symbols: symbols.map(sym => sym.id === id ? ({
                    ...sym,
                    zIndex: maxZindex+1
                }) : sym)
            }
        },
        [ACTIONS.MIN_ZI]: ({payload: id, oldState: {symbols}}) => {
            const minZindex = symbols.reduce((a, n) => n.zIndex < a ? n.zIndex : a, Number.POSITIVE_INFINITY)
            return {
                symbols: symbols.map(sym => sym.id === id ? ({
                    ...sym,
                    zIndex: minZindex-1
                }) : sym)
            }
        },
        [ACTIONS.LET_ASCIIPANEL_OPEN_AFTER_SELECTION] : ({ payload }) => ({
            letAsciiPanelOpenAfterSelection: payload
        }),
        [ACTIONS.SET_ASCIIPANEL_FILTER]: ({payload = ''}) => ({
            asciiPanelFilter: payload
        }),
        [ACTIONS.SET_EMBED_MODAL_VISIBILITY]: ({payload = ''}) => ({
            embedModalVisibility: payload
        }),
        [ACTIONS.INIT_VIEWPORT]: ({payload : {maxWidth, maxHeight}, oldState: {
            width, height
        }}) => {
            const newMaxWidth = ~~maxWidth - PANEL_WIDTH
            const newMaxHeight = ~~maxHeight
            return {
                maxWidth: newMaxWidth, maxHeight: maxHeight,
                height: Math.min(height, newMaxHeight),
                width: Math.min(width, newMaxWidth),
            }
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