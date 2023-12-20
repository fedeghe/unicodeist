import exp from './index';

import testActions from './testData/actions';
import ACTIONS from './actions';
const {
    reducer,
    base
} = exp();

describe('reducer should work as expected', () => {

    it('init&new work as expected', () => {
        expect(reducer({}, {type: ACTIONS.INIT})).toMatchObject(base);
        expect(reducer({}, {type: ACTIONS.NEW})).toMatchObject(base);
        expect(reducer({}, {type: ACTIONS.CAN_SCROLL_SYMBOLS, payload: true})).toMatchObject({
            canScrollSymbols: true
        });
    });
    it('all trivial actions work as expected', () => {
        expect(reducer(
            {},
            {type: ACTIONS.CAN_SCROLL_SYMBOLS, payload: false}
        )).toMatchObject({
            canScrollSymbols: false
        });
        expect(reducer(
            {},
            {type: ACTIONS.TOGGLE_ARROW_EVENTS, payload: true}
        )).toMatchObject({
            arrowEventsActive: true
        });
        expect(reducer(
            {},
            {type: ACTIONS.TOGGLE_ARROW_EVENTS, payload: false}
        )).toMatchObject({
            arrowEventsActive: false
        });
        expect(reducer(
            {keyFrames: {'something': {is: 'here'}}},
            {type: ACTIONS.REMOVE_ALL_KEY_FRAMES}
        )).toMatchObject({
            keyFrames: {}
        });
        expect(reducer(
            {error: {'what': 'ever'}},
            {type: ACTIONS.REMOVE_ERROR}
        )).toMatchObject({
            error: null
        });
        expect(reducer(
            {zoomLevel: 10},
            {type: ACTIONS.ZOOM_ZERO}
        )).toMatchObject({
            zoomLevel: 1
        });
        expect(reducer(
            {canScrollSymbols: false},
            {type: ACTIONS.CAN_SCROLL_SYMBOLS, payload:true}
        )).toMatchObject({
            canScrollSymbols: true
        });
        expect(reducer(
            {symbolsFilter: 'aaaa'},
            {type: ACTIONS.SET_SYMBOLS_FILTER, payload:'bbb'}
        )).toMatchObject({
            symbolsFilter: 'bbb'
        });

        expect(reducer(
            {canScrollSymbols: true},
            {type: ACTIONS.CAN_SCROLL_SYMBOLS, payload:false}
        )).toMatchObject({
            canScrollSymbols: false
        });




        expect(reducer(
            {letAsciiPanelOpenAfterSelection: true},
            {type: ACTIONS.LET_ASCIIPANEL_OPEN_AFTER_SELECTION, payload: false}
        )).toMatchObject({
            letAsciiPanelOpenAfterSelection: false
        });
        expect(reducer(
            {letAsciiPanelOpenAfterSelection: false},
            {type: ACTIONS.LET_ASCIIPANEL_OPEN_AFTER_SELECTION, payload: true}
        )).toMatchObject({
            letAsciiPanelOpenAfterSelection: true
        });



    });
    it.each(testActions.RESIZE)(
        'should work - %s',
        (_,oldstate, action, expected, matcher = 'toMatchObject') => {
            expect(reducer(oldstate, action))[matcher](expected);
        }
    );

    it.each(testActions.SWITCH_THEME)(
        'should work - %s',
        (_,oldstate, action, expected, matcher = 'toMatchObject') => {
            expect(reducer(oldstate, action))[matcher](expected);
        }
    );

    it.each(testActions.TOGGLE_ADD_PANEL)(
        'should work - %s',
        (_,oldstate, action, expected, matcher = 'toMatchObject') => {
            expect(reducer(oldstate, action))[matcher](expected);   
        }
    );
    it.each(testActions.ADD_SYMBOL)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.SWAP_SYMBOL)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.REMOVE_SYMBOL)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.BULK_DELETE)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.CLONE_SYMBOL)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.FOCUS_ON_SYMBOL)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );


    it.each(testActions.ZOOM)(
        'should work - %s',
        (_, oldstate, action, expected) => {
            expect(reducer(oldstate, action)).toMatchObject(expected);
        }
    );
    it.each(testActions.UPDATE_GLOBAL)(
        'should work - %s',
        (_, oldstate, action, expected) => {
            expect(reducer(oldstate, action)).toMatchObject(expected);
        }
    );

    it.each(testActions.UPDATE_SYMBOL)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.TUNE_SYMBOL_POSITION)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.MAX_ZI)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.MIN_ZI)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.SET_ASCIIPANEL_FILTER)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.INIT_VIEWPORT)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            window.innerHeight = 600;
            window.innerWidth = 800;
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.SYMBOL_FOCUS)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.IMPORT)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.IMPORT_KEYFRAMES)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.ALIGN_H)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.ALIGN_V)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.MOVE_ALL_SYMBOLS)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.PAN_ALL_SYMBOLS)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.MOVE_SYMBOL)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

    it.each(testActions.MOVE_TARGET_ONE_PX)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.UPDATE_KEY_FRAME)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.REMOVE_KEY_FRAME)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.REMOVE_ALL_KEY_FRAMES)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.EXPAND_FAMILY)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );
    it.each(testActions.COLLAPSE_FAMILY)(
        'should work - %s',
        (_, oldstate, action, checker) => {
            const res = reducer(oldstate, action);
            checker(expect, res);
        }
    );

});
