import ACTIONS from './../../actions';
export default [
    [
        'global - zoom in',
        {
            zoomLevel: 1
        },
        {
            type: ACTIONS.UPDATE_GLOBAL,
            payload: {
                field: 'zoomLevel',
                value: 2
            }
        },
        {zoomLevel:2},
    ],
    [
        'global - width',
        {
            width: 1000
        },
        {
            type: ACTIONS.UPDATE_GLOBAL,
            payload: {
                field: 'width',
                value: 2
            }
        },
        {width:2},
    ],
];

