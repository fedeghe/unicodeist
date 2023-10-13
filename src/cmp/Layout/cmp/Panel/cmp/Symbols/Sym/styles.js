
import { createUseStyles } from 'react-jss';

import { EXPANDED_SYM_HEIGHT, COLLAPSED_SYM_HEIGHT } from '../../../../../../../constants';



export default createUseStyles(theme => ({
    Container: {//
        flex: 1,
    },
    Sym: ({ selected = false } = {}) => ({
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        marginTop: '5px',
        backgroundColor: selected
            ? theme.sym.backgroundSelected
            : theme.sym.background,
        color: theme.sym.foreground,
        cursor: selected ? 'default' : 'pointer',
        height: selected ? `${EXPANDED_SYM_HEIGHT}px` : `${COLLAPSED_SYM_HEIGHT}px`,
        transition: 'height 0.2s',
    }),
    Hr: {
        width: '100%',
        border: 'none',
        borderTop: '1px dotted gray',
        margin: 0
    },
    HrP: {
        width: '100%',
        border: 'none',
        borderTop: '1px solid gray',
        margin: 0
    },

    Box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight:''
    },

    Label: {//
        marginRight: '10px',
        fontWeight: 'bold'
    },

    Color: {
        height: '20px',
        width: '20px',
        border: 0,
        padding: 0,
        margin: 0,
        inlineSize: '20px',
        blockSize: '20px',
        appearance: 'meter'
    },

    FontFamilyAndWeight: {
        width: '80px'
    },

    HoverLight: {
        '&:hover': {
            backgroundColor: theme.unselectedItemHoverBackgound,
        },
        display:'flex',
        justifyContent: 'space-between'
    },
    HoverLightActions: {
        display:'flex',
        alignItems:'end',
        flexDirection:'column',
    },

    RotatedContainer: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },

    Rotated: ({ rx, ry, rz } = {}) => ({
        transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
        display:'inline-block',
    }),
}));