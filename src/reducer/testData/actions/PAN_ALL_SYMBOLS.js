import ACTIONS from './../../actions';
export default [
    [
        'pan 2 selected',
        {
            symbols: [
                { id: 'U_0', char: 'A', left:10, top:10, scale:1 },
                { id: 'U_1', char: 'B', left:20, top:20, scale:1 },
                { id: 'U_2', char: 'C', left:30, top:40, scale:1 }
            ],
            focusedSymbolId: 'U_1',
            selected: ['U_0', 'U_1']
        },
        {
            type: ACTIONS.PAN_ALL_SYMBOLS,
            payload: -2
        },
        (expect, response) => {
            expect(response.symbols[0].scale).toBe(3);
            expect(response.symbols[1].scale).toBe(3);
            expect(response.symbols[2].scale).toBe(1);// unchanged
        },
    ],
    [
        'pan all',
        {
            symbols: [
                { id: 'U_0', char: 'A', left:10, top:10, scale:1 },
                { id: 'U_1', char: 'B', left:20, top:20, scale:1 },
                { id: 'U_2', char: 'C', left:30, top:40, scale:1 }
            ],
            focusedSymbolId: 'U_1',
            selected: []
        },
        {
            type: ACTIONS.PAN_ALL_SYMBOLS,
            payload: -2
        },
        (expect, response) => {
            expect(response.symbols[0].scale).toBe(3);
            expect(response.symbols[1].scale).toBe(3);
            expect(response.symbols[2].scale).toBe(3);// unchanged
        },
    ],
];

