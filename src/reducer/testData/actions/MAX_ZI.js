/* eslint-disable no-unused-vars */
import ACTIONS from './../../actions';
import constants, { MAX_ZINDEX } from './../../../constants';

export default [
    [
        'max zindex',
        {
            symbols: [
                { id: 'U_0', zIndex: 3},
                { id: 'U_1', zIndex: 2 }
            ],
            focusedSymbolId: 'U_1'
        },
        {
            type: ACTIONS.MAX_ZI,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[1];
            
            expect(symbol.zIndex).toBe(4);
        },
    ],
    [
        'max zindex not over',
        {
            symbols: [
                { id: 'U_0', zIndex: MAX_ZINDEX},
                { id: 'U_1', zIndex: 2 }
            ],
            focusedSymbolId: 'U_1'
        },
        {
            type: ACTIONS.MAX_ZI,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[1];
            
            expect(symbol.zIndex).toBe(MAX_ZINDEX);
        },
    ]
    ,
    [
        'max zindex already',
        {
            symbols: [
                { id: 'U_0', zIndex: MAX_ZINDEX},
                { id: 'U_1', zIndex: 2 }
            ],
            focusedSymbolId: 'U_0'
        },
        {
            type: ACTIONS.MAX_ZI,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[0];
            
            expect(symbol.zIndex).toBe(MAX_ZINDEX);
        },
    ]
];

