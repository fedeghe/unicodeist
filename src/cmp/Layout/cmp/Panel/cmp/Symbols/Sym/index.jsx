import { useContext } from 'react';
import { Card, Typography, Checkbox } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Label from './cmp/Label';
import Zindex from './cmp/Zindex';
import Element from './cmp/Element';
import Styles from './cmp/Styles';
import Position from './cmp/Position';
import Animation from './cmp/Animation';
import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './styles';

const Sym = ({ sym }) => {
    const {
            state: {
                focusedSymbolId,
                backgroundColor,
                selected,
                symbols
            },
            dispatch
        } = useContext(ctx),
        {
            id, color,
            rotationX, rotationY, rotationZ,
            skewX, skewY,
            blur, label, char
        } = sym,
        expanded = focusedSymbolId === id,
        classes = useStyles({
            expanded,
            backgroundColor,
            color,
            rx: rotationX,
            ry: rotationY,
            rz: rotationZ,
            skx: skewX,
            sky: skewY,
            blr: blur,
        }),
        focus = () => !expanded && dispatch({
            type: ACTIONS.FOCUS_ON_SYMBOL,
            payload: id
        }),
        onCheckToggle = e => {
            e.stopPropagation();
            dispatch({
                type: ACTIONS.TOGGLE_SYMBOL_SELECTION,
                payload: id,
            });
        },
        move = (e, direction) => {
            e.stopPropagation();
            dispatch({
                type: ACTIONS.MOVE_SYMBOL,
                payload: { id: id, direction }
            });
        },
        moveUp = e => move(e, -1),
        moveDown = e => move(e, 1);
    // console.log({selected});
    return <div className={classes.Container}>
        <Card onClick={focus} className={classes.Sym}>
            {expanded ?
                <div>
                    <Label sym={sym} checked={selected.includes(id)} onClick={onCheckToggle} />
                    <Zindex sym={sym} />
                    <Element sym={sym} backgroundColor={backgroundColor} />
                    <Styles sym={sym} />
                    <hr className={classes.Hr} />
                    <Position sym={sym} />
                    <hr className={classes.Hr} />
                    <Animation sym={sym} />
                </div> : <div className={classes.HoverLight}>
                    {Boolean(symbols.length > 1) &&
                        <div>
                            <Checkbox checked={selected.includes(id)} onClick={onCheckToggle} />
                        </div>}
                    <div>
                        <Typography variant="body1">{label}</Typography>
                        <Typography variant="h5">
                            <div className={classes.RotatedContainer}>
                                <div className={classes.Rotated}>{char}</div>
                            </div>
                        </Typography>
                    </div>
                    <div className={classes.HoverLightActions}>
                        <ArrowDropUpIcon onClick={moveUp} />
                        <ArrowDropDownIcon onClick={moveDown} />
                    </div>
                </div>}
        </Card>
    </div>;
};

export default Sym;
