import ACTIONS from './../../actions';
export default [
    [
        'bulk center horizontally',
        {
            symbols: [
                { id: 'U_0', char: 'A', left:0, top:0 },
                { id: 'U_1', char: 'B', left:15, top:11 },
                { id: 'U_2', char: 'C', left:30, top:12 },
                { id: 'U_3', char: 'D', left:80, top:13 },
                { id: 'U_4', char: 'E', left:90, top:99 },
                { id: 'U_5', char: 'F', left:100, top:100 },
            ],
            selected: ['U_0', 'U_2', 'U_3', 'U_4', 'U_5'],
            width: 500
        },
        {
            type: ACTIONS.BULK_CENTER_HORIZONALLY,
            payload: 'left'
        },
        (expect, response) => {
            expect(response.symbols[0].left).toBe(200);
            expect(response.symbols[1].left).toBe(15);// unchanged
            expect(response.symbols[2].left).toBe(230);
            expect(response.symbols[3].left).toBe(280);
            expect(response.symbols[4].left).toBe(290);
            expect(response.symbols[5].left).toBe(300);
        },
    ],
];

