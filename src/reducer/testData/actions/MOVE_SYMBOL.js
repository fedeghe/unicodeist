import ACTIONS from './../../actions';
export default [
    [
        'move up',
        {
            symbols: [
                { id: 'U_0', char: 'A', left:10, top:10, scale:1 },
                { id: 'U_1', char: 'B', left:20, top:20, scale:1 },
                { id: 'U_2', char: 'C', left:30, top:40, scale:1 }
            ],
        },
        {
            type: ACTIONS.MOVE_SYMBOL,
            payload: {
                id: 'U_1',
                direction: -1
            }
        },
        (expect, response) => {
            expect(response.symbols[0].id).toBe('U_1');
            expect(response.symbols[1].id).toBe('U_0');
            expect(response.symbols[2].id).toBe('U_2');
        },
    ],
    [
        'move down',
        {
            symbols: [
                { id: 'U_0', char: 'A', left:10, top:10, scale:1 },
                { id: 'U_1', char: 'B', left:20, top:20, scale:1 },
                { id: 'U_2', char: 'C', left:30, top:40, scale:1 }
            ],
        },
        {
            type: ACTIONS.MOVE_SYMBOL,
            payload: {
                id: 'U_1',
                direction: 1
            }
        },
        (expect, response) => {
            expect(response.symbols[0].id).toBe('U_0');
            expect(response.symbols[1].id).toBe('U_2');
            expect(response.symbols[2].id).toBe('U_1');
        },
    ],

    [
        'cant move down',
        {
            symbols: [
                { id: 'U_0', char: 'A', left:10, top:10, scale:1 },
                { id: 'U_1', char: 'B', left:20, top:20, scale:1 },
                { id: 'U_2', char: 'C', left:30, top:40, scale:1 }
            ],
        },
        {
            type: ACTIONS.MOVE_SYMBOL,
            payload: {
                id: 'U_2',
                direction: 1
            }
        },
        (expect, response) => {
            expect(response.symbols[0].id).toBe('U_0');
            expect(response.symbols[1].id).toBe('U_1');
            expect(response.symbols[2].id).toBe('U_2');
        },
    ],


    [
        'cant move up',
        {
            symbols: [
                { id: 'U_0', char: 'A', left:10, top:10, scale:1 },
                { id: 'U_1', char: 'B', left:20, top:20, scale:1 },
                { id: 'U_2', char: 'C', left:30, top:40, scale:1 }
            ],
        },
        {
            type: ACTIONS.MOVE_SYMBOL,
            payload: {
                id: 'U_0',
                direction: -1
            }
        },
        (expect, response) => {
            expect(response.symbols[0].id).toBe('U_0');
            expect(response.symbols[1].id).toBe('U_1');
            expect(response.symbols[2].id).toBe('U_2');
        },
    ],
];

