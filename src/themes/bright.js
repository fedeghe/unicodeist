import { colors } from './base';

const {grayscale : cgs} = colors,
    theme =  {
        mode: 'bright',
        background: {
            main: cgs.lightE,
            panel: cgs.lightD,
            selectorModal: cgs.lightD
        },
        modal : {
            setStringColor: cgs.dark1,
            itemBackground: cgs.lightE,
            itemBackgroundHover: cgs.lightF,
            outline: cgs.dark1,
            hoverOutline: cgs.dark0,
            itemForeground: cgs.mid5,
            itemForegroundOver: cgs.dark0,
        },
        foreground: cgs.dark1,
        radius: {
            selectorModal: '5px' ,
            selectorModalItem: '3px' ,
        },
        sym: {
            background: cgs.lightE,
            backgroundSelected: cgs.lightF,
            foreground: cgs.dark1,
        },
        themeSwitch: {
            lineBg: cgs.lightF,
            roundBg: '#000099',
            icon: '#FFFF00',
        },
        unselectedItemHoverBackgound: cgs.lightC
    };  

export default theme;