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
            focusedSymbolId: 'U_0'
        },
        {
            type: ACTIONS.FOCUS_ON_SYMBOL,
            payload: 'U_1'
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(3);
            expect(response.focusedSymbolId).toBe('U_1');
        },
    ]
];

