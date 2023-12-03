export default [
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