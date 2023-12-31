import { createUseStyles } from 'react-jss';
import {
    EXPANDED_SYM_HEIGHT,
    COLLAPSED_SYM_HEIGHT,
    COLLAPSING_SYM_TIME,
    PANEL_WIDTH
} from 'src/constants';

export default createUseStyles(theme => ({
    Container: {//
        flex: 1,
    },
    Sym: ({ expanded = false } = {}) => ({
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        margin: '5px',
        backgroundColor: expanded
            ? theme.sym.backgroundSelected
            : theme.sym.background,
        color: theme.sym.foreground,
        cursor: expanded ? 'default' : 'pointer',
        height: expanded ? `${EXPANDED_SYM_HEIGHT}px` : `${COLLAPSED_SYM_HEIGHT}px`,
        transition: `height ${COLLAPSING_SYM_TIME}s`,
    }),
    Hr: {
        width: '100%',
        border: 'none',
        borderTop: '1px dotted gray',
        margin: 0,
        marginBottom:'10px'
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
    LabelOut: {
        textOverflow: 'ellipsis',
        width: `${PANEL_WIDTH*3/5}px`,
        textAlign:'center',
        overflow: 'hidden',
        textWrap: 'nowrap'
    },

    HoverLight: {
        '&:hover': {
            backgroundColor: theme.unselectedItemHoverBackgound,
        },
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:'5px',
        borderRadius:'5px'
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

    Rotated: ({ rx, ry, rz, skx, sky, blr } = {}) => ({
        ...(blr && {filter: `blur(${blr}px)`}),
        transform: [
            `rotateX(${rx}deg)`,
            `rotateY(${ry}deg)`,
            `rotateZ(${rz}deg)`,
            `skew(${skx}deg,${sky}deg)`
        ].join(' '),
        display:'inline-block',
    }),
}));