const fs = require('fs');

// var i = 0,
//     l = 2 << 16,
//     j = {
//         title: 'all symbols',
//         charSet: []
//     },
//     c;

// while (i < l) {
//     c = String.fromCharCode('0x' + (i).toString(16));
//     !(c.match(/[\p{Cc}\p{Cn}\p{Cs}]+/gu)) &&
//         c.replace(/\p{C}/gu, '').replace(/\n\r/g, '\n')
//             .replace(/\p{Zl}/gu, '\n').replace(/\p{Zp}/gu, '\n')
//             .replace(/\p{Zs}/gu, ' ').length &&

//         j.charSet.push({
//             char: c,
//             decimal: `${i}`,
//             octal: '0' + i.toString(8),
//             hex: '0x' + i.toString(16),
//             unicode: 'U+' + c.charCodeAt(0).toString(16).padStart(4, '0')
//         });
//     i++;
// }


const data = JSON.parse(fs.readFileSync('./0-basic-latin.js')),
    newArr = data.map(family => ({
        title: family.title,
        charSet: family.charSet.map(el => {
            var de = el.charCodeAt(0).toString(10);
            return {
                ...el,
                u: 'U+' + el.charCodeAt(0).toString(16).padStart(4, '0'),
                de,
                oc: '0' + de.toString(8),
                he: '0x' + de.toString(16),
            };
        })
    }));


fs.writeFile('./0-basic-latin-2.js', JSON.stringify(newArr, null, 2), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
});

