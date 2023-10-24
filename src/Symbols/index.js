
// import basicLatin from './ext/0-basic-latin';
// import latin1Supplement from './ext/1-latin-1-supplement';
// import latinExtendedA from './ext/2-latin-extended-A';
// import latinExtendedB from './ext/3-latin-extended-B';
// import latinExtendedAdditional from './ext/4-latin-extended-Additional';
// import additionalLatinExtended from './ext/5-additional-latin-extended';
// import greekAndCoptic from './ext/6-greek_and_coptic';
// import cyrillic from './ext/7-cyrillic';
// import emojii from './ext/8-emojii';
// import math from './ext/9-math';
// import others from './ext/10-others';

import basicLatin from './0-basic-latin';
import latin1Supplement from './1-latin-1-supplement';
import latinExtendedA from './2-latin-extended-A';
import latinExtendedB from './3-latin-extended-B';
import latinExtendedAdditional from './4-latin-extended-Additional';
import additionalLatinExtended from './5-additional-latin-extended';
import greekAndCoptic from './6-greek_and_coptic';
import cyrillic from './7-cyrillic';
import emojii from './8-emojii';
import math from './9-math';
import others from './10-others';
import egyptianHieroglyphs from './11-egyptian-hieroglyphs.js';


const exp = [
    { label: 'Bacis Latin', data: basicLatin },
    { label: 'Latin-1 Supplement', data: latin1Supplement },
    { label: "Latin extended-A", data: latinExtendedA },
    { label: "Latin extended-B", data: latinExtendedB },
    { label: 'Latin extended additional', data:latinExtendedAdditional},
    { label: "Additional latin extended", data: additionalLatinExtended},
    { label: "Greek and Coptic", data: greekAndCoptic },
    { label: "Cyrillic", data: cyrillic},
    { label: 'Math', data: math},
    { label: 'Emojii', data: emojii },
    { label: 'Others symbols', data: others },
    { label: 'Egyptian Hieroglyphs', data: egyptianHieroglyphs }
];

export default exp;