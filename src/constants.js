const h = (new Date()).getHours();
export const WIDTH = 500;
export const HEIGHT = 500;
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
export const ITEM_SIZE = 100;
export const ITEM_FONTSIZE = '2em';
export const DEFAULT_THEME = (h > 20 || h < 7) ? 'dark' : 'bright';
export const FADED_OPACITY = 0.4;
export const LET_UNICODE_PANEL_OPEN_AFTER_SELECTION = true;

const CONSTS = {
    WIDTH, HEIGHT,
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
    ITEM_SIZE,
    ITEM_FONTSIZE,
    DEFAULT_THEME,
    FADED_OPACITY,
    LET_UNICODE_PANEL_OPEN_AFTER_SELECTION
};
export default CONSTS;