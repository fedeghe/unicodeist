import testData from './../../testData';
import ACTIONS from './../../actions';
export default [
    [
        'height',
        {
            height: 100,
            width: 100,
            symbols: testData.symbols
        },
        {
            type: ACTIONS.RESIZE,
            payload: {
                what: 'height',
                value:200
            }
        },
        {
            height: 200,
            width: 100,
            undos: 1,
            canUndo: true,
            symbols: [
                {
                    ...testData.symbols[0],
                    top:300
                },
                {
                    ...testData.symbols[1],
                    top: 220
                }
            ]
        },
        // 'toMatchObject'
        'toEqual'
    ],
    [
        'width',
        {
            height: 100,
            width: 100,
            symbols: testData.symbols
        },
        {
            type: ACTIONS.RESIZE,
            payload: {
                what: 'width',
                value:200
            }
        },
        {
            height: 100,
            width: 200,
            undos: 1,
            canUndo: true,
            symbols: [
                {
                    ...testData.symbols[0],
                    left: 220
                },
                {
                    ...testData.symbols[1],
                    left:339
                }
            ]
        },
        // 'toMatchObject'
        'toEqual'
    ]
];
