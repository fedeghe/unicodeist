const css2json = [
    [
        'empty case',
        {
            input: '',
            expected: {}
        }
    ],
    [
        'basic case',
        {
            input: `{
                background-color :#fff;
                color: green;
            }`,
            expected: {
                backgroundColor: '#fff',
                color: 'green'
            }
        }
    ],
    [
        'image bg base64',
        {
            input: `{
                background-image : url('data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==');
                color: green;
                content: 'xxx';
            }`,
            expected: {
                backgroundImage: `url('data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==')`,
                color: 'green',
                content: "'xxx'"
            }
        }
    ],
];

const json2string = [
    [
        'empty case',
        {
            input: {},
            expected: ''
        }
    ],
    [
        'basic case I',
        {
            input: {a:1},
            expected: 'a:1;'
        }
    ],
    [
        'basic case II',
        {
            input: {a:1,b:3},
            expected: 'a:1;b:3;'
        }
    ]
];

const seekAllCssRules = [
    [
        'empty case',
        {
            input: '',
            expected: []
        }
    ],
    [
        'empty case 2',
        {
            input: '{}',
            expected: []
        }
    ],
    [
        'few',
        {
            input: `{
                color:red;
            }`,
            expected: [
                [
                'color',
                'red']
            ]
        }
    ],
];

export default {
    css2json,
    json2string,
    seekAllCssRules
};