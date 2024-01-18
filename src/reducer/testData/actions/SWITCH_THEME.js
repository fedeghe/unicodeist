import ACTIONS from './../../actions';
export default [
    [
        'to dark',
        {
            themeKey: 'light'
        },
        {
            type: ACTIONS.SWITCH_THEME,
        },
        {
            themeKey: 'dark'
        },
    ],
    [
        'to light',
        {
            themeKey: 'dark'
        },
        {
            type: ACTIONS.SWITCH_THEME,
        },
        {
            themeKey: 'light'
        },
    ],
];
