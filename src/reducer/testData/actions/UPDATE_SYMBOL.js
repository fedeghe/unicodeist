import ACTIONS from './../../actions';
export default [
    [
        'global - zoom in',
        {
            symbols: [
                { id: 'U_0', label: 'A' },
                { id: 'U_1', label: 'B' }
            ],
            focusedSymbolId: 'U_1'
        },
        {
            type: ACTIONS.UPDATE_SYMBOL,
            payload: {
                field: 'label',
                value: 'booo'
            }
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[1];
            
            expect(symbol.label).toBe('booo');
        },
    ]
];

