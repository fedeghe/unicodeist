import { colors } from './base';

const {grayscale : cgs} = colors,
    theme =  {
        mode: 'dark',
        background: {
            main: cgs.dark1,
            panel: cgs.dark2,
            selectorModal: cgs.dark2
        },
        modal : {
            setStringColor: cgs.lightE,
            itemBackground: cgs.dark0,
            itemBackgroundHover: cgs.dark4,
            outline: cgs.lightA,
            hoverOutline: cgs.lightE,
            itemForeground: cgs.lightA,
            itemForegroundOver: cgs.lightF,
        },
        foreground: cgs.lightE,
        border: cgs.lightF,
        radius: {
            selectorModal: '5px' ,
            selectorModalItem: '3px' ,
        },
        sym: {
            background: cgs.dark3,
            backgroundSelected: cgs.dark0,
            foreground: cgs.lightF,
        },
        themeSwitch: {
            lineBg: cgs.dark0,
            roundBg: '#5588dd',
            icon: '#ffdd00',
        },
        unselectedItemHoverBackgound: cgs.mid5,
        accentColor:cgs.lightE
    };

export default theme;