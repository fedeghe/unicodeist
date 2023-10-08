import { useContext, useState } from 'react';



import CopyDone from './../../../CopyDone';
import ctx from '../../../../../../../../Context';
import ACTIONS from '../../../../../../../../reducer/actions';
import useStyles from './styles';
import symbols from '../../../../../../../../Symbols';


import Family from './cmp/Family';

const Families = () => {
    const classes = useStyles({border: 10});
    const [open, setOpen] = useState(false);
    const {dispatch, state: {
        letAsciiPanelOpenAfterSelection,
        asciiPanelFilterBySet
    }} = useContext(ctx);
    
    const closePanel = () => {
        dispatch({
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: false
        });
    };
    const showConfirmation = char => setOpen(char);
    const hideConfirmation = () => setOpen(false);
    const onSelect = (char) => {
        dispatch({
            type: ACTIONS.ADD_SYMBOL,
            payload: char
        });
        letAsciiPanelOpenAfterSelection ? showConfirmation(char) : closePanel();
    };
    
    return <div className={classes.Container}>
        {symbols
            .map(({label, data}) => {
                const filteredData = data.filter(({char, description = ''})=>{
                    return description.toLowerCase().split(',').some(s => s.includes(asciiPanelFilterBySet))
                        || char === asciiPanelFilterBySet;
                });
                return filteredData.length &&  {
                    label, 
                    data:filteredData
                };
            })
            .filter(Boolean)
            .map(({label, data}) => <Family key={label} data={data} label={label} onSelect={onSelect}/>
        )}
        {open && <CopyDone message={`${open} added`} onClose={hideConfirmation} open={open} setOpen={setOpen}/>}
    </div>;
};
export default Families;