const h = (new Date()).getHours();
// leave that false, scale does the job

export const getMaxHeight = () => ~~window.innerHeight * 0.9;
export const getMaxWidth = () => ~~window.innerWidth * 0.9;

export const REPO_URL = 'https://github.com/fedeghe/unicodeist';
export const MIN_WIDTH = 1;
export const MIN_HEIGHT = 1;
export const PANEL_WIDTH = 300;
export const PANEL_PADDING = 10;
export const PANEL_FONTSIZE = 14;

export const ITEM_WIDTH = 100;
export const ITEM_HEIGHT = 140;
export const ITEM_FOOTER_HEIGHT = 20;
export const ITEM_FONTSIZE = '2.5em';
export const THEMES = {'dark' : 'dark', 'light': 'light'};
export const FADED_OPACITY = 0.4;
export const MIN_SCALE_REV = -150;
export const MIN_SCALE = 0.01;
export const MAX_SCALE = 150;
export const STEP_SCALE = 0.01;
export const MIN_ROT = -180;
export const MAX_ROT= 180;
export const STEP_ROT = 0.1;
export const MIN_BLUR = 0;
export const MAX_BLUR= 20;
export const STEP_BLUR = 0.01;
export const MIN_ZINDEX = 0;
export const MAX_ZINDEX = 10000;
export const EXPANDED_SYM_HEIGHT = 540;
export const COLLAPSED_SYM_HEIGHT = 70;
export const COLLAPSING_SYM_TIME = 0.3;
export const CLOSE_TOAST_TIMEOUT = 1000;
export const OFFSET_PERC = 0.3;
export const HEADER_HEIGHT = 140;
export const LOCALSTORAGE_KEYFRAMES_KEY = 'keyframes';
export const UNSELECTED = '__unselected__';
export const SHOW_UNDO_ICON = true;
export const UNDO_UNBOUNCING = 1000;
export const MOVE_MULTIPLIER = 10;


const TPLS = {
    ADDITIONAL_STYLES: `{
    // animation-name: example;
    // animation-duration: 5s;
    // animation-timing-function: linear;
    // animation-delay: 2s;
    // animation-iteration-count: infinite;
    // animation-direction: alternate;
}`,
    BG_STYLES: `{
    // clip-path: circle(50%);
    // background-image: linear-gradient(180deg, red, yellow);
    // background-image: linear-gradient(to bottom right, red, yellow);
    // background-image: linear-gradient(to right, red , yellow);
    // background-image: url(https://www.dolomiten-suedtirol.com/img-2/content/cortina/2.jpg);
    // background-size: 100% 100%;
}`,
    KEYFRAMES: `@keyframes {
    from {color: red;}
    to {color: blue;}
    // 0% {color: red;}
    // 100% {color: blue;}
}`
};

export const DEFAULTS = {
    WIDTH: 500,
    HEIGHT: 500,
    ADD_PANEL_VISIBILITY: false,
    ASCII_SELECTOR_FILTER: '',
    BACKGROUND_ALPHA: false,
    BACKGROUND_COLOR: '#FFFFFF',
    BACKGROUND_STYLES: false,
    CAN_SCROLL_SYMBOLS: true,
    DOWNLOAD_FORMAT: 'json',
    FILTERED_COUNT: 0,
    FOCUSED_SYMBOL_ID: null,
    FULLSCREEN_MODE: false,
    KEYFRAMES: {},
    LET_UNICODE_PANEL_OPEN_AFTER_SELECTION: true,
    PREVENT_RELOAD: false,
    SCROLL_TOP: 0,
    SELECTED: [],
    SUPERFOCUS: false,
    SYMBOLS_FILTER: '',
    SYMBOLS: [],
    SWAP_MODE: false,
    THEME_KEY: (h > 20 || h < 7) ? THEMES.dark : THEMES.light,
    TPLS,
    ZOOM_LEVEL: 1,
};

export const SYMBOL_DEFAULTS = {
    ADDITIONAL_STYLES: '',
    COLOR: '#000000',
    FADED: false,
    FONTFAMILY: 'Verdana',
    FONTWEIGHT: '400',
    ITALIC: false,
    SKEWX: 0,
    SKEWY: 0,
    ROTATIONX: 0,
    ROTATIONY: 0,
    ROTATIONZ: 0,
    BLUR: 0,
    OPACITY: 1,
    SCALE: 1,
    SCALEX: 1,
    SCALEY: 1,
};

export const FONT_FAMILIES = [
    'Arial', 'Verdana', 'Tahoma',
    'Trebuchet MS',
    'Times New Roman',
    'Georgia',
    'Garamond',
    'Courier New',
    'Brush Script MT'
];
// must be in synch with src/unicodeist/src/index.js
export const FONT_FAMILIES_REDUCTION_MAP = {
    ar: 'Arial',
    v: 'Verdana',
    ta: 'Tahoma',
    tr: 'Trebuchet MS',
    tn: 'Times New Roman',
    ge: 'Georgia',
    ga: 'Garamond',
    c: 'Courier New',
    b: 'Brush Script MT'
};
export const UNICODEIST_SCRIPT_URI = 'https://www.jmvc.org/unicodeist/index.js';
export const DOWNLOAD_FORMATS = {
    json: 'json',
    jpeg: 'jpeg',
    png: 'png'
};
export const UNSUPPORTEDFILE_MESSAGE = 'File not supported';

export const MEASURE = {
    getMaxHeight,
    getMaxWidth,
};
const CONSTS = {
    REPO_URL,
    MIN_WIDTH, MIN_HEIGHT,
    PANEL_WIDTH,
    PANEL_PADDING,
    PANEL_FONTSIZE,
    ITEM_WIDTH,
    ITEM_HEIGHT,
    ITEM_FOOTER_HEIGHT,
    ITEM_FONTSIZE,
    FADED_OPACITY,
    MIN_SCALE,
    MAX_SCALE,
    STEP_SCALE,
    MIN_ROT,
    MAX_ROT,
    STEP_ROT,
    MIN_BLUR,
    MAX_BLUR,
    STEP_BLUR,
    MIN_ZINDEX,
    MAX_ZINDEX,
    EXPANDED_SYM_HEIGHT,
    COLLAPSED_SYM_HEIGHT,
    COLLAPSING_SYM_TIME,
    CLOSE_TOAST_TIMEOUT,
    FONT_FAMILIES,
    UNICODEIST_SCRIPT_URI,
    DOWNLOAD_FORMATS,
    UNSUPPORTEDFILE_MESSAGE,
    OFFSET_PERC,
    HEADER_HEIGHT,
    THEMES,
    
    LOCALSTORAGE_KEYFRAMES_KEY,
    UNSELECTED,
    SHOW_UNDO_ICON,
    DEFAULTS,
    SYMBOL_DEFAULTS,
    MEASURE
};
export default CONSTS;