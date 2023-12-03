import {css2json2} from './utils';
import benchs from './utils.benckmarks';
describe('should work as expected', () => {
    test.each(benchs)('%s', (_,{input, expected}) => {
        expect(css2json2(input)).toMatchObject(expected);
    });
});