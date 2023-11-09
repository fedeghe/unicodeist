import { createUseStyles } from 'react-jss';

import bgBright from 'src/img/bgBright.png';
import bgDark from 'src/img/bgDark.png';

export default createUseStyles(theme => console.log({theme}) || ({
    Container: {
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px 0',
        
    },
    Left: {
        display: 'flex',
        flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1, textAlign: 'center', height: 'inherit'
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
    Char: {
        color: ({sym:{color}}) => color,
        transform: ({sym:{
            rotationX, rotationY, rotationZ,
            scaleX, scaleY,
            skewX, skewY
        }}) => [
            `scaleX(${scaleX})`,
            `scaleY(${scaleY})`,
            `rotateX(${rotationX}deg)`,
            `rotateY(${rotationY}deg)`,
            `rotateZ(${rotationZ}deg)`,
            `skew(${skewX}deg,${skewY}deg)`
        ].join(' '),
        filter: ({sym:{blur}}) => blur ? `blur(${blur}px)` : '',
        // textShadow: '5px 1px 8px black'
    }

}));