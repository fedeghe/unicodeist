import ACTIONS from './../../actions';
export default [
    [
        'tune position at zoom base',
        {
            symbols: [
                { id: 'U_0', label: 'A', left: 100, top:100 },
                { id: 'U_1', label: 'B', left: 120, top:120 }
            ],
            focusedSymbolId: 'U_1',
            zoomLevel: 1
        },
        {
            type: ACTIONS.TUNE_SYMBOL_POSITION,
            payload: {
                left: 10,
                top: 50
            }
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[1];
            
            expect(symbol.left).toBe(130);
            expect(symbol.top).toBe(170);
        },
    ],
    [
        'tune position at 200% zoom',
        {
            symbols: [
                { id: 'U_0', label: 'A', left: 100, top:100 },
                { id: 'U_1', label: 'B', left: 120, top:120 }
            ],
            focusedSymbolId: 'U_1',
            zoomLevel: 2
        },
        {
            type: ACTIONS.TUNE_SYMBOL_POSITION,
            payload: {
                left: 10,
                top: 50
            }
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[1];
            
            expect(symbol.left).toBe(125);
            expect(symbol.top).toBe(145);
        },
    ],
    [
        'tune position nothing passed',
        {
            symbols: [
                { id: 'U_0', label: 'A', left: 100, top:100 },
                { id: 'U_1', label: 'B', left: 120, top:120 }
            ],
            focusedSymbolId: 'U_1',
            zoomLevel: 2
        },
        {
            type: ACTIONS.TUNE_SYMBOL_POSITION,
        },
        (expect, response) => {
            expect(response.symbols.length).toBe(2);
            const symbol = response.symbols[1];
            
            expect(symbol.left).toBe(120);
            expect(symbol.top).toBe(120);
        },
    ]

];

