/* eslint-disable no-unused-vars */
import ACTIONS from './../../actions';

export default [
    [
        'align 2',
        {
            symbols: [
                { id: 'U_0', top: 40},
                { id: 'U_1', top: 30 }
            ],
            focusedSymbolId: 'U_0',
            height: 100
        },
        {
            type: ACTIONS.ALIGN_V,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[0];
            
            expect(symbol.top).toBe(50);
        },
    ]
];

