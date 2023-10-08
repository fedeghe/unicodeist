
import { useContext} from 'react';
import Box from '@mui/material/Box';
import ctx from './../../../../../../../../../Context';
import ACTIONS from './../../../../../../../../../reducer/actions';
import useStyles from './../../styles';


const Styles = ({sym}) => {
    const classes = useStyles(),
        { dispatch } = useContext(ctx);
    return <div className={classes.SectionStyles}>
        <div style={{display:'flex',justifyContent:'space-between'}}  className={classes.SectionStylesContainer}>
            <div>
                <Box className={classes.Box}>
                    <span className={classes.Label} >Font:</span>
                    <select  className={classes.FontFamilyAndWeight} value={sym.fontFamily} onChange={e => {
                        var v = e.target.value;
                        dispatch({
                            type: ACTIONS.UPDATE_SYMBOL,
                            payload: {id: sym.id, field:'fontFamily', value: v}
                        });
                    }}>
                        {
                        [
                            'Arial', 'Verdana', 'Tahoma',
                            'Trebuchet MS',
                            'Times New Roman',
                            'Georgia',
                            'Garamond',
                            'Courier New',
                            'Brush Script MT'
                        ].map(family => 
                            <option key={family} value={family}>{family}</option>
                        )
                        }
                    </select>
                    
                </Box>
            </div>
            <div>
                <Box className={classes.Box}>
                    <span className={classes.Label} >Color:</span>
                    <input className={classes.Color} type="color" onChange={e => {
                        var v = e.target.value;
                        dispatch({
                            type: ACTIONS.UPDATE_SYMBOL,
                            payload: {id: sym.id, field:'color', value: v}
                        });
                    }} value={sym.color} />
                </Box>
            </div>
        </div>
        <div className={classes.SectionStylesContainer}>
            <Box className={classes.Box}>
                <div>
                    <span className={classes.Label} >Weight:</span>
                    <select  className={classes.FontFamilyAndWeight} value={sym.fontWeight} onChange={e => {
                        var v = e.target.value;
                        dispatch({
                            type: ACTIONS.UPDATE_SYMBOL,
                            payload: {id: sym.id, field:'fontWeight', value: v}
                        });
                    }}>
                        {
                            Array.from(
                                {length: 9},
                                (_, i) => (i+1)*100
                            ).map(
                                weight => <option key={weight} value={weight}>{weight}</option>
                            )
                        }
                    </select>
                </div>
            </Box>
            
        </div>
        <div className={classes.SectionStylesContainer}>
            <Box className={classes.Box}>
                <span  className={classes.Label} >Font size:</span>
                <span>{sym.fontSize}</span>
                <input type="range" min={1} max={1000} step={1} value={sym.fontSize} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: {id: sym.id, field:'fontSize', value: v}
                    });
                }}/>
            </Box>
        </div>
        <div className={classes.SectionStylesContainer}>
            <Box className={classes.Box}>
                <span  className={classes.Label} >Scale:</span>
                <span>{sym.scale}</span>
                <input type="range" min={0} max={10} step={0.1} value={sym.scale} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: {id: sym.id, field:'scale', value: v}
                    });
                }}/>
            </Box>
        </div>
        <div className={classes.SectionStylesContainer}>
            <Box className={classes.Box}>
                <span  className={classes.Label} >Rotation:</span>
                <span>{sym.rotation}</span>
                <input type="range" min={-180} max={180} value={sym.rotation} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: {id: sym.id, field:'rotation', value: v}
                    });
                }}/>
            </Box>
        </div>
        <div className={classes.SectionStylesContainer}>
            <Box className={classes.Box}>
                <span  className={classes.Label} >Opacity:</span>
                <span> {sym.opacity}</span>
                <input type="range" min={0} max={1} step={0.1} value={sym.opacity} onChange={e => {
                    var v = e.target.value;
                    dispatch({
                        type: ACTIONS.UPDATE_SYMBOL,
                        payload: {id: sym.id, field:'opacity', value: v}
                    });
                }}/>
            </Box>
        </div>
    </div>;
};

export default Styles;