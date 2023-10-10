import latin1Supplement from './1-latin-1-supplement';
import basicLatin from './0-basic-latin';
import latinExtendedA from './2-latin-extended-A';
import latinExtendedB from './3-latin-extended-B';
import latinExtendedAdditional from './4-latin-extended-Additional';
import additionalLatinExtended from './5-additional-latin-extended';
import greekAndCoptic from './6-greek_and_coptic';
import cyrillic from './7-cyrillic';
import emojii from './8-emojii';

const exp = [{
    label: 'Bacis Latin',
    data: basicLatin
},{
    label: 'Latin-1 Supplement',
    data: latin1Supplement
},{
    label: "Latin extended-A",
    data: latinExtendedA
}, {
    label: "Latin extended-B",
    data: latinExtendedB
}, {
    label: 'Latin extended additional',
    data:latinExtendedAdditional
},{
    label: "Additional latin extended",
    data: additionalLatinExtended
},{
    label: "Greek and Coptic",
    data: greekAndCoptic
},{
    label: "Cyrillic",
    data: cyrillic
},{
    label: 'Emojii',
    data: emojii
}];

export default exp;