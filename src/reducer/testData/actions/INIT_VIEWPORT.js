import ACTIONS from './../../actions';

export default [
    [
        'init view',
        {
            symbols: [
                {
                    id: 'U_0',
                    char: 'A',
                    label: 'U_0',
                    zIndex: 4,
                    left:80,
                    top:80,
                    // does not matter the rest
                },
            ],
            width:100,
            height:100,
        },
        {
            type: ACTIONS.INIT_VIEWPORT,
        },
        (expect, response) => {
            expect(response.maxWidth).toBe(420);
            expect(response.maxHeight).toBe(540);
            expect(response.width).toBe(100);
            expect(response.height).toBe(100);
            expect(response.height).toBe(100);
            expect(response.symbols[0].left).toBe(80);
            expect(response.symbols[0].top).toBe(80);
        },
    ]
];

