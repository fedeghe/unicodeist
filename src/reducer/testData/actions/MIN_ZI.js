/* eslint-disable no-unused-vars */
import ACTIONS from './../../actions';
import { MIN_ZINDEX } from './../../../constants';

export default [
    [
        'min zindex',
        {
            symbols: [
                { id: 'U_0', zIndex: 3},
                { id: 'U_1', zIndex: 4 }
            ],
            focusedSymbolId: 'U_1'
        },
        {
            type: ACTIONS.MIN_ZI,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[1];
            
            expect(symbol.zIndex).toBe(2);
        },
    ],
    [
        'min zindex not under',
        {
            symbols: [
                { id: 'U_0', zIndex: 3},
                { id: 'U_1', zIndex: MIN_ZINDEX }
            ],
            focusedSymbolId: 'U_0'
        },
        {
            type: ACTIONS.MIN_ZI,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[0];
            
            expect(symbol.zIndex).toBe(MIN_ZINDEX);
        },
    ]
    ,
    [
        'min zindex already',
        {
            symbols: [
                { id: 'U_0', zIndex: MIN_ZINDEX},
                { id: 'U_1', zIndex: 2 }
            ],
            focusedSymbolId: 'U_0'
        },
        {
            type: ACTIONS.MIN_ZI,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[0];
            
            expect(symbol.zIndex).toBe(MIN_ZINDEX);
        },
    ]
];

