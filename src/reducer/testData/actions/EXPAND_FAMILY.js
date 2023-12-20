import ACTIONS from './../../actions';
import allSymbols from '../allSymbols';
export default [
    [
        'adds first symbol',
        {
            availableSymbols: allSymbols,
        },
        {
            type: ACTIONS.EXPAND_FAMILY,
            payload: allSymbols[1].label
        },
        expect => response => {
            const allS = response.availabeSymbols;
            allS.forEach(f => {
                expect(f.expanded).toBe(f.label === allSymbols[1].label);
            });
        },
    ]
];

