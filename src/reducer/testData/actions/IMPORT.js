import ACTIONS from './../../actions';

import state from './../sample';

export default [
    [
        'import basic',
        {
            keyFrames:{
                a:'whatever'
            },
        },
        {
            type: ACTIONS.IMPORT,
            payload: JSON.stringify(state)
        },
        (expect, response) => {
            expect( response.filteredCount ).toBe(6988);
            expect( response.width ).toBe(500);
            expect( response.height ).toBe(500);
            expect( Object.keys(response.keyFrames).length ).toBe(1);
            
        },
    ], [
        'import error',
        {
            keyFrames:{
                a:'whatever'
            },
        },
        {
            type: ACTIONS.IMPORT,
            payload: state
        },
        (expect, response) => {
            expect( response.error ).toBe('File not supported');
        },
    ], [
        'import error - no sym',
        {
            keyFrames:{
                a:'whatever'
            },
        },
        {
            type: ACTIONS.IMPORT,
            payload: "{}"
        },
        (expect, response) => {
            expect( response.error ).toBe('File not supported');
        },
    ]
];

