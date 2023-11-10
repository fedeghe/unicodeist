/* eslint-disable no-unused-vars */
import { createUseStyles } from 'react-jss';
import { css2json } from 'src/utils';
import bgBright from 'src/img/bgBright.png';
import bgDark from 'src/img/bgDark.png';

export default createUseStyles(theme => ({
    Container: {
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: `${theme.spacing.small}px 0px`
        
    },
    Left: {
        display: 'flex',
        flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        height: 'inherit'
    },
    Mid: {
        flex: 3,
        textAlign: 'center',
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize:'4em',
        outline: `1px solid ${theme.border}`,
        borderRadius: '5px',
        backgroundImage: `url(${theme.mode === 'bright' ? bgBright: bgDark})`,
        overflow:'hidden'
    },
    Item: {
        cursor: 'pointer',
        width:'30px'
    },
    Disabled: {
        cursor:'default',
        color:'#888888'
    },
    Char: ({ sym : {
        color, rotationX, rotationY, rotationZ,
        scaleX, scaleY, skewX, skewY,
        additionalStyles, blur, opacity
    }}) => ({
        color,
        ...(additionalStyles && css2json(additionalStyles)),
        transform:[
            `scaleX(${scaleX})`,
            `scaleY(${scaleY})`,
            `rotateX(${rotationX}deg)`,
            `rotateY(${rotationY}deg)`,
            `rotateZ(${rotationZ}deg)`,
            `skew(${skewX}deg,${skewY}deg)`
        ].join(' '),
        filter: blur ? `blur(${blur}px)` : '',
        opacity: opacity,
        fontSize:'2em'
    })

}));