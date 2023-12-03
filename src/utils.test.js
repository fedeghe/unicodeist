import benchs from './utils.benckmarks';
import {
    css2json,
    json2string,
    seekAllCssRules,
} from './utils';
describe('css2json - should work as expected', () => {
    test.each(benchs.css2json)('%s', (_,{input, expected}) => {
        expect(css2json(input)).toMatchObject(expected);
    });
});
describe('json2string - should work as expected', () => {
    test.each(benchs.json2string)('%s', (_,{input, expected}) => {
        expect(json2string(input)).toBe(expected);
    });
});
describe('seekAllCssRules - should work as expected', () => {
    test.each(benchs.seekAllCssRules)('%s', (_,{input, expected}) => {
        expect(seekAllCssRules(input)).toMatchObject(expected);
    });
});