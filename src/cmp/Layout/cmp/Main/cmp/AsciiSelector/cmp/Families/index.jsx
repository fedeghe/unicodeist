import { useContext, useState } from 'react';

import SnackMessage from 'src/cmp/SnackMessage';
import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './styles';

import Family from './cmp/Family';


const Families = () => {
    const classes = useStyles({border: 10}),
        [open, setOpen] = useState(false),
        [messageChar, setMessageChar] = useState(''),
        {
            dispatch,
            state: {
                letAsciiPanelOpenAfterSelection,
                availableSymbols,
                filteredCount
            }
        } = useContext(ctx),
        closePanel = () => dispatch({
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: false
        }),
        showConfirmation = char => {
            setMessageChar(char);
            setOpen(char.length > 0);
        },
        hideConfirmation = () => setOpen(false),
        onSelect = (char) => {
            dispatch({
                type: ACTIONS.ADD_SYMBOL,
                payload: char
            });
            letAsciiPanelOpenAfterSelection ? showConfirmation(char) : closePanel();
        };

    return <div className={classes.Container}>
        {Boolean(filteredCount) && 
            availableSymbols.map(({label, data}) => <Family key={label} data={data} label={label} onSelect={onSelect}/>)
        }
        {open && <SnackMessage message={`${messageChar} added`} onClose={hideConfirmation} open={open} setOpen={setOpen}/>}
        
    </div>;
};
export default Families;