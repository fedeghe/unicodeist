import { 
    Tooltip
} from '@mui/material';
import {Undo as UndoIcon} from '@mui/icons-material';

import useStyes from './styles';

const Undo = ({undo, undos}) => {
    const classes = useStyes();
    return <Tooltip onClick={undo} title="undo" className={classes.Container}>
        <UndoIcon/><span>{undos}</span>   
    </Tooltip>;
};
export default Undo;