import ACTIONS from './../../actions';

export default [
    [
        'remove one keyframe',
        {
            keyFrames:{
                a:'whatever',
                b:'whatever',
            },
        },
        {
            type: ACTIONS.REMOVE_KEY_FRAME,
            payload: {
                name: 'a',
            }
        },
        (expect, response) => {
            expect(response.keyFrames.a).toBeUndefined();
        },
    ]
];

