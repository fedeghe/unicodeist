import ascii_punct_and_symbols from './ascii_punct_and_symbols';
import ascii_digits from './ascii_digits';
import ascii_latin_alphabet from './ascii_latin_alphabet';
import ascii_latin1_punct_and_symbols from './ascii_latin-1-punct_and_symbols';
import ascii_letter_acc from './ascii_letter_acc';
import base from './basic.json';
import math from './math.json';
// import sub from './sub.json';
import emojii from './emojii.json';

const exp = [{
    label: 'ASCII Punctuation & Symbols',
    data: ascii_punct_and_symbols
},{
    label: 'ASCII Digits',
    data: ascii_digits
},{
    label: 'ASCII Latin Alphabet',
    data: ascii_latin_alphabet
},{
    label: 'ASCII Latin-1 Punctuation & Symbols',
    data: ascii_latin1_punct_and_symbols
},{
    label: 'ASCII letter variations',
    data: ascii_letter_acc
},{
    label: 'Base',
    data: base
},{
    label: 'Math',
    data: math
},{
    label: 'emojii',
    data: emojii
}];

export default exp;