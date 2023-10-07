import {useContext} from 'react'

import { Button } from '@mui/base/Button';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { FocusTrap } from '@mui/base/FocusTrap';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import ctx from './../../../../../../Context'
import ACTIONS from './../../../../../../reducer/actions'
import useStyles from './styles'
const AddButton = () => {
    const classes = useStyles()
    const {dispatch} = useContext(ctx)

    const openPanel = () => {
        dispatch({
            type: ACTIONS.TOGGLE_ADD_PANEL,
            payload: true
        })
    }
    return <div className={classes.AddButton}>
        <AddCircleRoundedIcon sx={{fontSize:'3em'}} onClick={openPanel}/>
    </div>
}
export default AddButton