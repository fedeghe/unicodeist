import ACTIONS from './../../actions';
export default [
    [
        'adds first symbol',
        {
            symbols: [],
            width: 200,
            height: 200,
        },
        {
            type: ACTIONS.ADD_SYMBOL,
            payload: {
                char: 'A'
            }
        },
        expect => response => {
            expect(response.symbols.length).toBe(1);
            const symbol = response.symbols[0];
            expect(symbol.char).toBe('A');
            expect(symbol.id).toMatch(/U_\d*/);
            expect(symbol.left).toBe(100);
            expect(symbol.top).toBe(100);
        },
    ],
    [
        'adds another symbol',
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
        },
        {
            type: ACTIONS.ADD_SYMBOL,
            payload: {
                char: 'C'
            }
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(3);
            const symbol0 = response.symbols[0],
                symbol2 = response.symbols[2];
            expect(symbol0.zIndex).toBeLessThan(symbol2.zIndex);
            expect(symbol2.char).toBe('C');
            expect(symbol2.id).toMatch(/U_\d*/);
            expect(symbol2.left).toBe(100);
            expect(symbol2.top).toBe(100);
        },
    ]
];

