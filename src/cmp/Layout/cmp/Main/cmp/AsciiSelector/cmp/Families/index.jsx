import {useContext, useState, useEffect, useCallback} from 'react'
import {uniqueID} from './../../../../../../../../utils';


import CopyDone from './../../../CopyDone'
import ctx from '../../../../../../../../Context'
import ACTIONS from '../../../../../../../../reducer/actions'
import useStyles from './styles'
import symbols from '../../../../../../../../Symbols'

import Item from './../Item'

const Families = () => {
    const classes = useStyles({border: 10})
    const [open, setOpen] = useState(false)
    const {dispatch, state: {
        letAsciiPanelOpenAfterSelection,
        asciiPanelFilter
    }} = useContext(ctx)
    
    const closePanel = () => {
        dispatch({
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: false
        })
    }
    const showConfirmation = char => setOpen(char)
    const hideConfirmation = () => setOpen(false)
    const onSelect = (char) => {
        dispatch({
            type: ACTIONS.ADD_SYMBOL,
            payload: char
        })
        letAsciiPanelOpenAfterSelection ? showConfirmation(char) : closePanel()
    }
    
    return <div className={classes.Container}>
        {symbols
            .filter(({label}) => label.toLowerCase().includes(asciiPanelFilter.toLowerCase()))
            .map(({label, data}) => (
                <div key={label} className={classes.SetContainer}>
                    <h1>{label}</h1>
                    <div className={classes.ItemsContainer}>
                        {data.map(d => d.char === 'breakingLine' ? <div key={`${uniqueID}`} className={classes.Br}/> : <Item key={`${label}-${d.char}`} char={d.char} onSelect={onSelect} />)}
                    </div>
                </div>
            )
        )}
        {open && <CopyDone message={`${open} added`} onClose={hideConfirmation}/>}
    </div>
}
export default Families