import dark from './dark';
import light from './light';

const themes = {
    dark,
    light
};
const getTheme = t => themes[t];

export default getTheme;