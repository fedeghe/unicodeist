/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import CopyDone from './../../../CopyDone';
import ctx from '../../../../../../../../Context';
import ACTIONS from '../../../../../../../../reducer/actions';
import useStyles from './styles';
import allSymbols from '../../../../../../../../Symbols';
import useFilter from './useFilter';

import Family from './cmp/Family';
import { uniqueID } from '../../../../../../../../utils';

const Families = () => {
    const classes = useStyles({border: 10});
    const [open, setOpen] = useState(false);
    const [messageChar, setMessageChar] = useState('');
    const {dispatch, state: {
        letAsciiPanelOpenAfterSelection,
        asciiSelectorFilter
    }} = useContext(ctx);
    
    const closePanel = () => {
        dispatch({
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: false
        });
    };
    const showConfirmation = char => {
        setMessageChar(char);
        setOpen(char.length > 0);
    };
    const hideConfirmation = () => setOpen(false);
    const onSelect = (char) => {
        dispatch({
            type: ACTIONS.ADD_SYMBOL,
            payload: char
        });
        letAsciiPanelOpenAfterSelection ? showConfirmation(char) : closePanel();
    };

    const symbols = useFilter({ allSymbols, filter: asciiSelectorFilter });
    
    return <div className={classes.Container}>
        {symbols.map(({label, data}) => <Family key={label} data={data} label={label} onSelect={onSelect}/>)}
        {/* {symbols.map(r => <Family key={`${uniqueID}`} data={r} label={'lab'} onSelect={onSelect}/>)} */}
        {open && <CopyDone message={`${messageChar} added`} onClose={hideConfirmation} open={open} setOpen={setOpen}/>}
    </div>;
};
export default Families;