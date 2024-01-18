import ACTIONS from './../../actions';
export default [
    [
        'zoom in',
        {
            zoomLevel: 1
        },
        {
            type: ACTIONS.ZOOM_IN,
        },
        {zoomLevel:1.1},
    ],
    [
        'zoom out',
        {
            zoomLevel: 1
        },
        {
            type: ACTIONS.ZOOM_OUT,
        },
        {zoomLevel:0.9},
    ]
];

