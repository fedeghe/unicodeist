import ACTIONS from './../../actions';
export default [
    [
        'bulk center vertically',
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
            height: 500
        },
        {
            type: ACTIONS.BULK_CENTER_VERTICALLY,
            payload: 'top'
        },
        (expect, response) => {
            expect(response.symbols[0].top).toBe(200);
            expect(response.symbols[1].top).toBe(11);// unchanged
            expect(response.symbols[2].top).toBe(212);
            expect(response.symbols[3].top).toBe(213);
            expect(response.symbols[4].top).toBe(299);
            expect(response.symbols[5].top).toBe(300);
        },
    ],
];

