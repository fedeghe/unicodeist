import ACTIONS from './../../actions';
export default [
    [
        'remove symbol - not selected',
        {
            symbols: [
                { id: 'U_0', char: 'A' },
                { id: 'U_1', char: 'B' },
                { id: 'U_2', char: 'C' }
            ],
            focusedSymbolId: 'U_1',
            selected: ['U_0', 'U_2']
        },
        {
            type: ACTIONS.REMOVE_SYMBOL,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            expect(response.symbols[0].char).toBe('A');
            expect(response.symbols[1].char).toBe('C');
            expect(response.selected.length).toBe(2);
        },
    ],
    [
        'remove symbol - selected among only two',
        {
            symbols: [
                { id: 'U_0', char: 'A' },
                { id: 'U_1', char: 'B' },
                { id: 'U_2', char: 'C' }
            ],
            focusedSymbolId: 'U_1',
            selected: ['U_1', 'U_2']
        },
        {
            type: ACTIONS.REMOVE_SYMBOL,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            expect(response.symbols[0].char).toBe('A');
            expect(response.symbols[1].char).toBe('C');
            expect(response.selected.length).toBe(0);
        },
    ],
    [
        'remove symbol - selected among more',
        {
            symbols: [
                { id: 'U_0', char: 'A' },
                { id: 'U_1', char: 'B' },
                { id: 'U_2', char: 'C' }
            ],
            focusedSymbolId: 'U_1',
            selected: ['U_0', 'U_1', 'U_2']
        },
        {
            type: ACTIONS.REMOVE_SYMBOL,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            expect(response.symbols[0].char).toBe('A');
            expect(response.symbols[1].char).toBe('C');
            expect(response.selected.length).toBe(2);
        },
    ]
];

