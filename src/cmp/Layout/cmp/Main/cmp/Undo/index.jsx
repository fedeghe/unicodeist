import { 
    Tooltip,
    IconButton,
    Chip
} from '@mui/material';
import {Undo as UndoIcon} from '@mui/icons-material';

import useStyes from './styles';

const Undo = ({undo, undos}) => {
    const classes = useStyes();
    return <Tooltip onClick={undo} title="undo" className={classes.Container}>
        <IconButton>
            <UndoIcon/>
            <Chip label={undos} />
        </IconButton>
    </Tooltip>;
};
export default Undo;