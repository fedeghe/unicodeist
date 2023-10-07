import dark from './dark';
import bright from './bright';

const themes = {
    dark,
    bright
};
const getTheme = t => themes[t];

export default getTheme;