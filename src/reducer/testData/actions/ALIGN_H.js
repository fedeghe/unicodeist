/* eslint-disable no-unused-vars */
import ACTIONS from './../../actions';

export default [
    [
        'align 2',
        {
            symbols: [
                { id: 'U_0', left: 40},
                { id: 'U_1', left: 30 }
            ],
            focusedSymbolId: 'U_0',
            width: 100
        },
        {
            type: ACTIONS.ALIGN_H,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[0];
            
            expect(symbol.left).toBe(50);
        },
    ]
];

