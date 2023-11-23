/* eslint-disable no-unused-vars */
import { 
    Chip,
    Tooltip
} from '@mui/material';
import {
    Search as SearchIcon
} from '@mui/icons-material';

import useStyes from './styles';


const Zoom = ({zoom, reset}) => {
    const classes = useStyes();
    return zoom !== 1 && <Tooltip onClick={reset} title="click to reset" className={classes.Container}>
        <SearchIcon/>    
        <Chip label={`${~~(zoom*100)}%`} />
    </Tooltip>;
};
export default Zoom;