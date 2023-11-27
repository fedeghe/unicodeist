import { useContext } from 'react';
import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import { Card, Typography } from '@mui/material';
import {
    ArrowDropUp as ArrowDropUpIcon,
    ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';

import {
    Label, Zindex, Element,
    Styles, Position
} from './cmp';

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
        // with native checkbox ...react wants onChange....but on the upper (expand/collapse)
        // the onClick matter thus here must check if it does not come from a checkbox
        focus = e => 
            !expanded && e.target.type !== 'checkbox' && dispatch({
                type: ACTIONS.FOCUS_ON_SYMBOL,
                payload: id
            }),
        onCheckToggle = e => {
            dispatch({
                type: ACTIONS.TOGGLE_SYMBOL_SELECTION,
                payload: id,
            });
            e.stopPropagation();
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
                </div> : <div className={classes.HoverLight}>
                    {Boolean(symbols.length > 1) &&
                        <input type="checkbox" value="1" checked={selected.includes(id)} onChange={onCheckToggle} />
                    }
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
