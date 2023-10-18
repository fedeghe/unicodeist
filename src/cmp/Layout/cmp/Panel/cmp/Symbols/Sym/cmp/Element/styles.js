import { createUseStyles } from 'react-jss';

import bg from './../../../../../../../../../img/bg.png';

export default createUseStyles({
    Container: {
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px 0'
    },
    Left: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        flex: 1, textAlign: 'center', height: 'inherit'
    },
    Mid: {
        
        flex: 4,
        textAlign: 'center',
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize:'4em',
        border: '1px solid black',
        borderRadius: '5px',
        backgroundImage: `url(${bg})`,
        overflow:'hidden'
    },
    Item: {
        cursor: 'pointer'
    },
    Disabled: {
        cursor:'default',
        color:'#888888'
    },
    Char: {
        color: ({sym:{color}}) => color,
        transform: ({sym:{
            rotationX, rotationY, rotationZ,
            scaleX, scaleY
        }}) => `scaleX(${scaleX}) scaleY(${scaleY}) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
        textShadow: '5px 1px 8px black'
    }

});