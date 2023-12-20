import ACTIONS from './../../actions';
export default [
    [
        'filter',
        {},
        {
            type: ACTIONS.SET_ASCIIPANEL_FILTER,
            payload: 'aa'
        },
        (expect, response) => {
            expect(response.asciiSelectorFilter).toBe('aa');
            expect(response.filteredCount).toBe(2);
        },
    ]
];

