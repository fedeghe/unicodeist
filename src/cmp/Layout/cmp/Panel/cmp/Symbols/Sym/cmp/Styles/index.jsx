
import { useContext, useCallback } from 'react';
import Box from '@mui/material/Box';

import Uslider from './../../../../../../../../Uslider';
import ctx from './../../../../../../../../../Context';
import { FONT_FAMILIES } from './../../../../../../../../../constants';
import scaleRotConfig from './scaleAndRotation.config';
import ACTIONS from './../../../../../../../../../reducer/actions';
import useStyles from './../../styles';
import useElementStyles from './styles';

const Styles = ({ sym }) => {
    const classes = useStyles(),
        localClasses = useElementStyles(),
        { dispatch } = useContext(ctx),
        onChangeFontFamily = useCallback(e => dispatch({
            type: ACTIONS.UPDATE_SYMBOL,
            payload: { id: sym.id, field: 'fontFamily', value: e.target.value }
        }), []),
        onChangeColor = useCallback(e => dispatch({
            type: ACTIONS.UPDATE_SYMBOL,
            payload: { id: sym.id, field: 'color', value: e.target.value }
        }), []),
        onChangeFontWeight = useCallback(e => dispatch({
            type: ACTIONS.UPDATE_SYMBOL,
            payload: { id: sym.id, field: 'fontWeight', value: e.target.value }
        }), []);

    return <div className={localClasses.SectionStyles}>
        <div className={localClasses.SectionStylesContainer}>
            <Box className={classes.Box}>
                <div>
                    <span className={classes.Label} >Font:</span>
                    <select className={classes.FontFamilyAndWeight} value={sym.fontFamily} onChange={onChangeFontFamily}>{FONT_FAMILIES.map(family =>
                        <option key={family} value={family}>{family}</option>
                    )}</select>
                </div>
                <div>
                    <span className={classes.Label} >Color:</span>
                    <input className={classes.Color} type="color" onChange={onChangeColor} value={sym.color} />
                </div>
            </Box>
        </div>
        <div className={localClasses.SectionStylesContainer}>
            <Box className={classes.Box}>
                <div>
                    <span className={classes.Label} >Weight:</span>
                    <select className={classes.FontFamilyAndWeight} value={sym.fontWeight} onChange={onChangeFontWeight}>
                        {Array.from({ length: 9 }, (_, i) => (i + 1) * 100).map(
                            weight => <option key={weight} value={weight}>{weight}</option>
                        )}
                    </select>
                </div>
            </Box>
        </div>
        <div className={localClasses.SectionStylesContainer}>
            {scaleRotConfig.map(({ label, field, step, min, max, rounder, unit, fallback, quickTune }) => (
                <Uslider key={label}
                    label={label} value={sym[field]}
                    min={min} max={max} step={step}
                    unit={unit}
                    rounder={rounder}
                    quickTune={quickTune}
                    onChange={
                        e => {
                            var v = rounder(e.target.value, 10) || fallback;
                            dispatch({
                                type: ACTIONS.UPDATE_SYMBOL,
                                payload: { id: sym.id, field, value: v }
                            });
                        }
                    }
                />
            ))}
        </div>
        <div className={localClasses.SectionStylesContainer}>
            <Uslider key={'opacity'} label={"Opacity"} value={sym.opacity} min={0} max={1} step={0.1}
                onChange={
                    e => {
                        var v = parseFloat(e.target.value, 10);
                        dispatch({
                            type: ACTIONS.UPDATE_SYMBOL,
                            payload: { id: sym.id, field: 'opacity', value: v }
                        });
                    }
                }
            />
        </div>
    </div>;
};

export default Styles;