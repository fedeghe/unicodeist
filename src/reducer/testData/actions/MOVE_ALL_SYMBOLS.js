import ACTIONS from './../../actions';
export default [
    [
        'move 2 selected',
        {
            symbols: [
                { id: 'U_0', char: 'A', left:10, top:10 },
                { id: 'U_1', char: 'B', left:20, top:20 },
                { id: 'U_2', char: 'C', left:30, top:40 }
            ],
            focusedSymbolId: 'U_1',
            selected: ['U_0', 'U_1']
        },
        {
            type: ACTIONS.MOVE_ALL_SYMBOLS,
            payload: {
                leftTune:10,
                topTune: 20
            }
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(20);
            expect(response.symbols[0].top).toBe(30);

            expect(response.symbols[1].left).toBe(30);
            expect(response.symbols[1].top).toBe(40);

            expect(response.symbols[2].left).toBe(30);// unchanged
            expect(response.symbols[2].top).toBe(40);// unchanged
        },
    ],
    [
        'move all',
        {
            symbols: [
                { id: 'U_0', char: 'A', left:10, top:10 },
                { id: 'U_1', char: 'B', left:20, top:20 },
                { id: 'U_2', char: 'C', left:30, top:40 }
            ],
            focusedSymbolId: 'U_1',
            selected: []
        },
        {
            type: ACTIONS.MOVE_ALL_SYMBOLS,
            payload: {
                leftTune:10,
                topTune: 20
            }
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(20);
            expect(response.symbols[0].top).toBe(30);

            expect(response.symbols[1].left).toBe(30);
            expect(response.symbols[1].top).toBe(40);

            expect(response.symbols[2].left).toBe(40);
            expect(response.symbols[2].top).toBe(60);
        },
    ]
];

