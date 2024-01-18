import ACTIONS from './../../actions';
export default [
    [
        'bulk remove symbol - not selected',
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
            type: ACTIONS.BULK_DELETE,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(1);
            expect(response.symbols[0].char).toBe('B');
            expect(response.selected.length).toBe(0);
            expect(response.focusedSymbolId).toBe('U_1');
        },
    ],
    [
        'bulk remove symbol - include selected',
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
            type: ACTIONS.BULK_DELETE,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(1);
            expect(response.symbols[0].char).toBe('A');
            expect(response.selected.length).toBe(0);
            expect(response.focusedSymbolId).toBeNull();
        },
    ]
];

