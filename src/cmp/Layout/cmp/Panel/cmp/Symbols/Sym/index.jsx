
import { useContext } from 'react';
import { Card, Typography} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
                backgroundColor,
            },
            dispatch
        } = useContext(ctx),
        selected = focusedSymbolId === sym.id,
        classes = useStyles({
            selected,
            backgroundColor,
            color: sym.color,
            rx: sym.rotationX,
            ry: sym.rotationY,
            rz: sym.rotationZ,
            skx: sym.skewX,
            sky: sym.skewY,
        }),
        focus = () => !selected && dispatch({
            type: ACTIONS.FOCUS_ON_SYMBOL,
            payload: sym.id
        }),
        move = (e, direction) => {
            e.stopPropagation();
            dispatch({
                type: ACTIONS.MOVE_SYMBOL,
                payload: {id: sym.id, direction}
            });
        },
        moveUp = e => move(e, -1),
        moveDown = e => move(e, 1);
    
    return <div className={classes.Container}>
        <Card onClick={focus} className={classes.Sym}>
            {selected ? 
            <div>
                <Label sym={sym} />
                <Zindex sym={sym}/>
                <Element sym={sym} backgroundColor={backgroundColor}/>
                <Styles sym={sym} />
                <hr className={classes.Hr} />
                <Position sym={sym} />
            </div> : <div className={classes.HoverLight}>
                <div>
                    <Typography variant="body1">{sym.label}</Typography>
                    <Typography variant="h5">
                        <div className={classes.RotatedContainer}>
                            <div className={classes.Rotated}>{sym.char}</div>
                        </div>
                    </Typography>
                </div>
                <div className={classes.HoverLightActions}>
                    <ArrowDropUpIcon onClick={moveUp}/>
                    <ArrowDropDownIcon onClick={moveDown}/>
                </div>
            </div>}
        </Card>
    </div>;
};

export default Sym;
