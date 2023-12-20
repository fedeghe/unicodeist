import ACTIONS from './../../actions';

export default [
    [
        'remove all',
        {
            keyFrames:{
                a:'whatever',
                b:'whatever',
            },
        },
        {
            type: ACTIONS.REMOVE_ALL_KEY_FRAMES,
        },
        (expect, response) => {
            expect(Object.keys(response.keyFrames)).toMatchObject([]);
        },
    ]
];

