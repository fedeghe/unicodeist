import ACTIONS from './../../actions';
export default [
    [
        'select all symbols',
        {
            selected: [],
            symbols:[
                {id:'U_0'},
                {id:'U_1'},
                {id:'U_2'},
            ]
        },
        {
            type: ACTIONS.TOGGLE_SYMBOLS_SELECTION,
            payload: 'selectAll'
        },
        (expect, response) => {
            expect(response.selected).toContain('U_0');
            expect(response.selected).toContain('U_1');
            expect(response.selected).toContain('U_2');
        },
    ],
    [
        'unselect all symbols',
        {
            selected: ['U_0', 'U_2'],
            symbols:[
                {id:'U_0'},
                {id:'U_1'},
                {id:'U_2'},
            ]
        },
        {
            type: ACTIONS.TOGGLE_SYMBOLS_SELECTION,
            payload: 'unselectAll'
        },
        (expect, response) => {
            expect(response.selected).not.toContain('U_0');
            expect(response.selected).not.toContain('U_1');
            expect(response.selected).not.toContain('U_2');
        },
    ],
    [
        'toggle selection',
        {
            selected: ['U_0', 'U_2'],
            symbols:[
                {id:'U_0'},
                {id:'U_1'},
                {id:'U_2'},
            ]
        },
        {
            type: ACTIONS.TOGGLE_SYMBOLS_SELECTION,
            payload: 'invertAll'
        },
        (expect, response) => {
            expect(response.selected).not.toContain('U_0');
            expect(response.selected).toContain('U_1');
            expect(response.selected).not.toContain('U_2');
        },
    ],
    [
        'toggle identity',
        {
            selected: ['U_0', 'U_2'],
            symbols:[
                {id:'U_0'},
                {id:'U_1'},
                {id:'U_2'},
            ]
        },
        {
            type: ACTIONS.TOGGLE_SYMBOLS_SELECTION,
        },
        (expect, response) => {
            expect(response.selected).toContain('U_0');
            expect(response.selected).not.toContain('U_1');
            expect(response.selected).toContain('U_2');
        },
    ]

];

