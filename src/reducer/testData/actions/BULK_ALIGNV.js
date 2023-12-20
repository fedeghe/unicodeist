import ACTIONS from './../../actions';
export default [
    [
        'align selected vert',
        {
            symbols: [
                { id: 'U_0', char: 'A', left:10, top:10 },
                { id: 'U_1', char: 'B', left:20, top:20 },
                { id: 'U_2', char: 'C', left:30, top:33 },
                { id: 'U_4', char: 'D', left:30, top:30 }
            ],
            selected: ['U_0', 'U_1', 'U_2']
        },
        {
            type: ACTIONS.BULK_ALIGNV,
        },
        (expect, response) => {
            expect(response.symbols[0].top).toBe(21);
            expect(response.symbols[1].top).toBe(21);
            expect(response.symbols[2].top).toBe(21);
            expect(response.symbols[3].top).toBe(30);// unchanged
        },
    ],
];

