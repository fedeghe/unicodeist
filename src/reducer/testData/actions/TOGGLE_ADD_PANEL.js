import ACTIONS from './../../actions';
export default [
    [
        'on',
        {
            addPanelVisibility: false,
            swapMode: false
        },
        {
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: {
                visibility: true
            }
        },
        {
            addPanelVisibility: true,
            swapMode: false
        },
    ],
    [
        'on with swap',
        {
            addPanelVisibility: false,
            swapMode: true
        },
        {
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: {
                visibility: true,
                swapMode: true
            }
        },
        {
            addPanelVisibility: true,
            swapMode: true
        },
    ],

    [
        'off',
        {
            addPanelVisibility: true,
            swapMode: true
        },
        {
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: {
                visibility: false
            }
        },
        {
            addPanelVisibility: false,
            swapMode: false
        },
    ],
    [
        'off with swap',
        {
            addPanelVisibility: true,
            swapMode: true
        },
        {
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: {
                visibility: false,
                swapMode: true
            }
        },
        {
            addPanelVisibility: false,
            swapMode: true
        },
    ],

];
