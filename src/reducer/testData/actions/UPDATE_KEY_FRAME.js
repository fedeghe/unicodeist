import ACTIONS from './../../actions';

export default [
    [
        'import basic',
        {
            keyFrames:{
                a:'whatever'
            },
        },
        {
            type: ACTIONS.UPDATE_KEY_FRAME,
            payload: {
                name: 'a',
                keyFrame: 'nevermind'
            }
        },
        (expect, response) => {
            expect(response.keyFrames.a).toBe('nevermind');
        },
    ]
];

