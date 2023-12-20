import ACTIONS from './../../actions';

const symbols = [
    {
        id: 'U_0',
        char: 'A',
        label: 'U_0',
    },
    {
        id: 'U_1',
        char: 'B',
        label: 'U_1',
    },
    {
        id: 'U_2',
        char: 'C',
        label: 'U_3',
    },
];

export default [
    [
        'activate superFocus',
        {
            symbols,
            focusedSymbolId: 'U_0',
            superFocus: false
        },
        {
            type: ACTIONS.SYMBOL_FOCUS,
        },
        (expect, response) => {
            
            expect(response.superFocus).toBeTruthy();
            expect(response.symbols[0].faded).toBeFalsy();
            expect(response.symbols[1].faded).toBeTruthy();
            expect(response.symbols[2].faded).toBeTruthy();
            
        },
    ],
    [
        'deactivate superFocus',
        {
            symbols,
            focusedSymbolId: 'U_0',
            superFocus: true
        },
        {
            type: ACTIONS.SYMBOL_FOCUS,
        },
        (expect, response) => {
            expect(response.superFocus).toBeFalsy();
            expect(response.symbols[0].faded).toBeFalsy();
            expect(response.symbols[1].faded).toBeFalsy();
            expect(response.symbols[2].faded).toBeFalsy();
        },
    ]
];

