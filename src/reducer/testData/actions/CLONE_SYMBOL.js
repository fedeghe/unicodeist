import ACTIONS from './../../actions';
export default [
    [
        'clone symbol',
        {
            symbols: [
                {
                    id: 'U_0',
                    char: 'A',
                    label: 'U_0',
                    zIndex: 4,
                    // does not matter the rest
                },
            ],
            focusedSymbolId: 'U_0'
        },
        {
            type: ACTIONS.CLONE_SYMBOL,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[1];
            expect(symbol.char).toBe('A');
        },
    ]
];

