import ACTIONS from './../../actions';
export default [
    [
        'selects a symbol',
        {
            selected: [],
        },
        {
            type: ACTIONS.TOGGLE_SYMBOL_SELECTION,
            payload: 'some'
        },
        (expect, response) => {
            expect(response.selected).toContain('some');
        },
    ],
    [
        'unselects a symbol',
        {
            selected: ['some'],
        },
        {
            type: ACTIONS.TOGGLE_SYMBOL_SELECTION,
            payload: 'some'
        },
        (expect, response) => {
            expect(response.selected).not.toContain('some');
        },
    ],

];

