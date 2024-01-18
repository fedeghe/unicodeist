import ACTIONS from './../../actions';
export default [
    [
        'swap symbol',
        {
            symbols: [
                {
                    id: 'U_0',
                    char: 'A',
                    label: 'U_0',
                    zIndex: 4,
                    // does not matter the rest
                },
                {
                    id: 'U_1',
                    char: 'B',
                    label: 'U_1',
                    zIndex: 1,
                    // does not matter the rest
                }
            ],
            width: 200,
            height: 200,
            focusedSymbolId: 'U_1'
        },
        {
            type: ACTIONS.SWAP_SYMBOL,
            payload: {
                char: 'b'
            }
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[1];
            
            expect(symbol.char).toBe('b');
        },
    ]
];

