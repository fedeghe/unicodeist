import ACTIONS from './../../actions';
const symbols = [
        { id: 'U_0', char: 'A', left:10, top:10, scale:1 },
        { id: 'U_1', char: 'B', left:20, top:20, scale:1 },
        { id: 'U_2', char: 'C', left:30, top:40, scale:1 }
    ],
    state = {
        symbols,
        focusedSymbolId: 'U_0',
        selected: []
    };
export default [
    [
        'move target current - left - no multiplier',
        state,
        {
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: {
                key: 'ArrowLeft',
            }
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(9);
            expect(response.symbols[0].top).toBe(10);
        },
    ],
    [
        'move target current - right - no multiplier',
        state,
        {
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: {
                key: 'ArrowRight',
            }
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(11);
            expect(response.symbols[0].top).toBe(10);
        }
    ],
    [
        'move target current - down - no multiplier',
        state,
        {
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: {
                key: 'ArrowDown',
            }
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(10);
            expect(response.symbols[0].top).toBe(11);
        }
    ],
    [
        'move target current - up - no multiplier',
        state,
        {
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: {
                key: 'ArrowUp',
            }
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(10);
            expect(response.symbols[0].top).toBe(9);
        }
    ],

    [
        'move target current - left - with multiplier',
        state,
        {
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: {
                key: 'ArrowLeft',
                multiplier: true
            }
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(0);
            expect(response.symbols[0].top).toBe(10);
        },
    ],
    
    [
        'move target current - right - with multiplier',
        state,
        {
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: {
                key: 'ArrowRight',
                multiplier: true
            }
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(20);
            expect(response.symbols[0].top).toBe(10);
        }
    ],
    [
        'move target current - down - with multiplier',
        state,
        {
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: {
                key: 'ArrowDown',
                multiplier: true
            }
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(10);
            expect(response.symbols[0].top).toBe(20);
        }
    ],
    [
        'move target current - up - with multiplier',
        state,
        {
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: {
                key: 'ArrowUp',
                multiplier: true
            }
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(10);
            expect(response.symbols[0].top).toBe(0);
        }
    ],

    [
        'move all selected - up - no multiplier',
        {
            ...state,
            selected: ['U_0', 'U_1']
        },
        {
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: {
                key: 'ArrowUp',
            }
        },
        (expect, response) => {
            expect(response.symbols[0].top).toBe(9);
            expect(response.symbols[1].top).toBe(19);
            expect(response.symbols[2].top).toBe(40);
        }
    ],
    
    [
        'move all selected - up - with multiplier',
        {
            ...state,
            selected: ['U_0', 'U_1']
        },
        {
            type: ACTIONS.MOVE_TARGET_ONE_PX,
            payload: {
                key: 'ArrowUp',
                multiplier: true
            }
        },
        (expect, response) => {
            expect(response.symbols[0].top).toBe(0);
            expect(response.symbols[1].top).toBe(10);
            expect(response.symbols[2].top).toBe(40);
        }
    ],
];

