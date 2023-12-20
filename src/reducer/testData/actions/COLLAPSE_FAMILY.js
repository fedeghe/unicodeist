import ACTIONS from './../../actions';
import allSymbols from '../allSymbols';
export default [
    [
        'adds first symbol',
        {
            availableSymbols: allSymbols.map(as => ({
                ...as,
                expanded: as.label === allSymbols[1].label
            })),
        },
        {
            type: ACTIONS.COLLAPSE_FAMILY,
            payload: allSymbols[1].label
        },
        expect => response => {
            const allS = response.availabeSymbols;
            allS.forEach(f => {
                expect(f.expanded).toBeFalsy();
            });
        },
    ]
];

