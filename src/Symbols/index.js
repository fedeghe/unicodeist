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

const show = {expanded: false},
    exp = [
        { label: 'Bacis Latin', data: basicLatin, expanded: true },
        { label: 'Latin-1 Supplement', data: latin1Supplement, ...show  },
        { label: "Latin extended-A", data: latinExtendedA, ...show  },
        { label: "Latin extended-B", data: latinExtendedB, ...show  },
        { label: 'Latin extended additional', data:latinExtendedAdditional, ...show },
        { label: "Additional latin extended", data: additionalLatinExtended, ...show },
        { label: "Greek and Coptic", data: greekAndCoptic, ...show  },
        { label: "Cyrillic", data: cyrillic, ...show },
        { label: 'Math', data: math, ...show },
        { label: 'Emojii', data: emojii, ...show  },
        { label: 'Others symbols', data: others, ...show  },
        { label: 'Egyptian Hieroglyphs', data: egyptianHieroglyphs, ...show  }
    ];

export default exp;