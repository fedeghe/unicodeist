import { useContext, useCallback } from 'react';
import Box from '@mui/material/Box';

import Uslider from 'src/cmp/Uslider';
import ctx from 'src/Context';
import { FONT_FAMILIES } from 'src/constants';
import scaleRotConfig from './scaleAndRotation.config';
import ACTIONS from 'src/reducer/actions';

import useStyles from './../../styles';
import useElementStyles from './styles';

const Styles = ({ sym }) => {
    const classes = useStyles(),
        {
            italic = false, fontFamily,
            color, fontWeight, opacity
        } = sym,
        localClasses = useElementStyles(),
        { dispatch } = useContext(ctx),
        onChangeFontFamily = useCallback(e => dispatch({
            type: ACTIONS.UPDATE_SYMBOL,
            payload: { field: 'fontFamily', value: e.target.value }
        }), [dispatch]),
        onChangeColor = useCallback(e => dispatch({
            type: ACTIONS.UPDATE_SYMBOL,
            payload: {field: 'color', value: e.target.value }
        }), [dispatch]),
        onChangeFontWeight = useCallback(e => dispatch({
            type: ACTIONS.UPDATE_SYMBOL,
            payload: { field: 'fontWeight', value: e.target.value }
        }), [dispatch]),
        onChangeFontItalic = useCallback(() => dispatch({
            type: ACTIONS.UPDATE_SYMBOL,
            payload: { field: 'italic', value: !italic }
        }), [dispatch, italic]);

    return <div className={localClasses.SectionStyles}>
        <div className={localClasses.SectionStylesContainer}>
            <Box className={classes.Box}>
                <div>
                    <span className={classes.Label} >Font:</span>
                    <select className={classes.FontFamilyAndWeight} value={fontFamily} onChange={onChangeFontFamily}>{FONT_FAMILIES.map(family =>
                        <option key={family} value={family}>{family}</option>
                    )}</select>
                </div>
                <div>
                    <span className={classes.Label} >Color:</span>
                    <input className={classes.Color} type="color" onChange={onChangeColor} value={color} />
                </div>
            </Box>
        </div>
        <div className={localClasses.SectionStylesContainer}>
            <Box className={classes.Box}>
                <div>
                    <span className={classes.Label} >Weight:</span>
                    <select className={classes.FontFamilyAndWeight} value={fontWeight} onChange={onChangeFontWeight}>
                        {Array.from({ length: 9 }, (_, i) => (i + 1) * 100).map(
                            weight => <option key={weight} value={weight}>{weight}</option>
                        )}
                    </select>
                </div>
                <div>
                    <span className={classes.Label} >Italic:</span>
                    <input type="checkbox" checked={italic} value="1" onChange={onChangeFontItalic}/>
                </div>
            </Box>
        </div>
        <div className={localClasses.SectionStylesContainer}>
            {scaleRotConfig.map(({ label, field, step, min, max, rounder, unit, quickTune }) => (
                <Uslider key={label}
                    label={label} value={sym[field]}
                    min={min} max={max} step={step}
                    unit={unit}
                    rounder={rounder}
                    quickTune={quickTune}
                    onChange={v => dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: { field, value: v }
                    })}
                />
            ))}
        </div>
        <div className={localClasses.SectionStylesContainer}>
            <Uslider key={'opacity'} label={"Opacity"} value={opacity} min={0} max={1} step={0.01} quickTune rounder={parseFloat}
                onChange={v => dispatch({
                    type: ACTIONS.UPDATE_SYMBOL,
                    payload: { field: 'opacity', value: v}
                })}
            />
        </div>
    </div>;
};

export default Styles;