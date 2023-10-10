
import { useContext} from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


import Label from './cmp/Label';

import Zindex from './cmp/Zindex';
import Element from './cmp/Element';
import Styles from './cmp/Styles';
import Position from './cmp/Position';

import ctx from '../../../../../../../Context';
import ACTIONS from '../../../../../../../reducer/actions';

import useStyles from './styles';
const Sym = ({sym}) => {

    const {
        state: {
            focusedSymbolId,
            backgroundColor
        },
        dispatch
    } = useContext(ctx);
    console.log({backgroundColor});
    const selected = focusedSymbolId === sym.id;
    const classes = useStyles({
        selected,
        backgroundColor,
        color: sym.color,
        rx: sym.rotationX,
        ry: sym.rotationY,
        rz: sym.rotationZ
    });
    const focus = () => !selected && dispatch({
        type: ACTIONS.FOCUS_ON_SYMBOL,
        payload: sym.id
    });
    
    return <Card onClick={focus} className={classes.Sym}>
        {selected ? 
        <>
            <Label sym={sym} />
            
            
            <Zindex sym={sym}/>
            <Element sym={sym} backgroundColor={backgroundColor}/>
            <Styles sym={sym} />
            <hr className={classes.Hr} />
            <Position sym={sym} />
        </> : <div className={classes.HoverLight}>
            <Typography variant="body1">{sym.label}</Typography>
            <Typography variant="h5">
                <div className={classes.RotatedContainer}>
                    <div className={classes.Rotated}>{sym.char}</div>
                </div>
            </Typography>
        </div>}
        
    </Card>;
};

export default Sym;
