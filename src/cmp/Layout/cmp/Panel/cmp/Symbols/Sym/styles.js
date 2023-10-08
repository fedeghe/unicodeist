
import { createUseStyles } from 'react-jss';





export default createUseStyles(theme => ({
    SectionLabel: {
        height: '30px'
    },
    SectionZindex: {
        height: '30px'
    },
    SectionZindexInput: {
        width: '100%'
    },
    SectionStyles: {
        // display:'flex',
        // flex: 2
        marginBottom:'10px'
    },
    SectionStylesContainer: {
        marginTop:'10px'
    },
    SectionPosition: {
        // display:'flex',
        // flex: 2
        marginTop:'10px'
    },
    Container: {//
        flex: 1,
    },
    '@keyframes zoom-in-zoom-out': {
        '0%': {
            transform: 'scale(1, 1)'
        },
        '50%': {
            transform: 'scale(1.5, 1.5)'
        },
        '100%': {
            transform: 'scale(1, 1)'
        }
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
        height: selected ? '520px' : '50px',
        transition: 'height 0.2s',
        ...(selected ? { animation: 'zoom-in-zoom-out 1s ease infinite' } : {})

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
    Box: {//
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
        }
    }

}));