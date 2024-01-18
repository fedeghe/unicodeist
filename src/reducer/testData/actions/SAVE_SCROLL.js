import ACTIONS from './../../actions';
export default [
    [
        'scroll as expected',
        {
            scrollTop: 0
        },
        {
            type: ACTIONS.SAVE_SCROLL,
            payload: 100
        },
        (expect, response) => {
            expect(response.scrollTop).toBe(100);
        },
    ]
];

