import { useContext, useState, useEffect, useRef } from 'react';
import SnackMessage from 'src/cmp/SnackMessage';
import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import useStyles from './styles';
import Family from './cmp/Family';

const Families = () => {
    const classes = useStyles({border: 10}),
        [open, setOpen] = useState(false),
        ref = useRef(),
        [messageChar, setMessageChar] = useState(''),
        {
            dispatch,
            state: {
                letAsciiPanelOpenAfterSelection,
                availableSymbols,
                filteredCount,
                scrollTop,
                swapMode
            }
        } = useContext(ctx),
        closePanel = () => dispatch({
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: {
                visibility: false
            }
        }),
        showConfirmation = char => {
            setMessageChar(char);
            setOpen(char.length > 0);
        },
        hideConfirmation = () => setOpen(false),
        onSelect = (char) => {
            dispatch({
                type: swapMode ? ACTIONS.SWAP_SYMBOL : ACTIONS.ADD_SYMBOL,
                payload: {
                    char,
                    scrollTop: ref.current.scrollTop //not consumed inswapMode
                }
            });
            letAsciiPanelOpenAfterSelection && !swapMode ? showConfirmation(char) : closePanel();
        };

    useEffect(() => {
        ref.current.scrollTop = scrollTop;
    }, []);
    
    return <div className={classes.Container} ref={ref}>
        {Boolean(filteredCount) && 
            availableSymbols.map(({label, data, expanded}) => <Family key={label} data={data} label={label} onSelect={onSelect} expanded={expanded} />)
        }
        {open && <SnackMessage message={`${messageChar} added`} onClose={hideConfirmation} open={open} setOpen={setOpen}/>}
        
    </div>;
};
export default Families;