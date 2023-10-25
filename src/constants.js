const h = (new Date()).getHours();
// leave that false, scale does the job


export const REPO_URL = 'https://github.com/fedeghe/unicodeist';
export const WIDTH = 500;
export const HEIGHT = 500;
export const MIN_WIDTH = 50;
export const MIN_HEIGHT = 50;
export const PANEL_WIDTH = 300;
export const PANEL_PADDING = 10;
export const ITEM_PICK_PANEL_MARGIN = 20;
export const BASE_FONTSIZE = 16;
export const SYMBOL_BASE_FONTSIZE = 18;
export const SYMBOL_BASE_FONTFAMILY = 'Verdana';
export const SYMBOL_BASE_FONTWEIGHT = '400';
export const PANEL_BGCOLOR = '#444444';
export const EDITOR_BGCOLOR = '#222222';
export const SELECTOR_BGCOLOR = '#AAAAAA';
export const SELECTOR_FGCOLOR = '#000000';
export const ITEM_WIDTH = 100;
export const ITEM_HEIGHT = 140;
export const ITEM_FOOTER_HEIGHT = 20;
export const ITEM_FONTSIZE = '2.5em';
export const DEFAULT_THEME = (h > 20 || h < 7) ? 'dark' : 'bright';
export const FADED_OPACITY = 0.4;
export const LET_UNICODE_PANEL_OPEN_AFTER_SELECTION = true;
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
export const EXPANDED_SYM_HEIGHT = 640;
export const COLLAPSED_SYM_HEIGHT = 70;
export const COLLAPSING_SYM_TIME = 0.3;
export const CLOSE_TOAST_TIMEOUT = 1000;
export const OFFSET_PERC = 0.3;
export const HEADER_HEIGHT = 150;
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
export const DEFAULT_DOWNLOAD_FORMAT = 'json';
export const UNSUPPORTEDFILE_MESSAGE = 'File not supported';


const CONSTS = {
    REPO_URL,
    WIDTH, HEIGHT,
    MIN_WIDTH, MIN_HEIGHT,
    PANEL_WIDTH,
    PANEL_PADDING,
    ITEM_PICK_PANEL_MARGIN,
    BASE_FONTSIZE,
    SYMBOL_BASE_FONTSIZE,
    SYMBOL_BASE_FONTFAMILY,
    PANEL_BGCOLOR,
    EDITOR_BGCOLOR,
    SELECTOR_BGCOLOR,
    SELECTOR_FGCOLOR,
    ITEM_WIDTH,
    ITEM_HEIGHT,
    ITEM_FOOTER_HEIGHT,
    ITEM_FONTSIZE,
    DEFAULT_THEME,
    FADED_OPACITY,
    LET_UNICODE_PANEL_OPEN_AFTER_SELECTION,
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
    DEFAULT_DOWNLOAD_FORMAT,
    UNSUPPORTEDFILE_MESSAGE,
    OFFSET_PERC,
    HEADER_HEIGHT
};
export default CONSTS;