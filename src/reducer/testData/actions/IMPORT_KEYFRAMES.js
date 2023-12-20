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
            type: ACTIONS.IMPORT_KEYFRAMES,
            payload: '{"b":"bbb", "c":"ccc"}'
        },
        (expect, response) => {
            expect( Object.keys(response.keyFrames).length ).toBe(3);
        },
    ],
    [
        'import error',
        {
            keyFrames:{
                a:'whatever'
            },
        },
        {
            type: ACTIONS.IMPORT_KEYFRAMES,
            payload: '{}'
        },
        (expect, response) => {
            expect( response.error ).toBe('File not supported');
        },
    ]
];

