/* eslint-disable no-unused-vars */
import Chip from '@mui/material/Chip';
import {
    Search as SearchIcon
} from '@mui/icons-material';

import useStyes from './styles';

const Zoom = ({zoom}) => {
    const classes = useStyes();
    return zoom !== 1 && <div className={classes.Container}>
        <SearchIcon/>
        <Chip label={zoom} />
    </div>;
};
export default Zoom;