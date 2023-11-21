import { useContext} from 'react';
import { uniqueID } from 'src/utils';
import ctx from 'src/Context';
import ACTIONS from 'src/reducer/actions';
import Item from '../Item';
import useStyles from './styles';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';



const Family = ({ data, label, onSelect, expanded }) => {
    const classes = useStyles(),
        {
            dispatch,
        } = useContext(ctx),
        expand = () => dispatch({
            type: ACTIONS.EXPAND_FAMILY,
            payload: label
        }),
        collapse = () => dispatch({
            type: ACTIONS.COLLAPSE_FAMILY,
            payload: label
        });
    return <div className={classes.Container}>
        <h1 className={classes.Exp} onClick={expanded ? collapse : expand}>{label} ({
            data.reduce((acc, e) => acc+e.charSet.length, 0)
        }) {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</h1>
        {expanded && <div className={classes.ItemsContainer}>
            {data.map((d, i) => <div key={`${d.title}_${i}`}>
                <div className={classes.SubfamilyTitle} key={`${uniqueID}`}><h4>{d.title} ({d.charSet.length})</h4></div>
                {d.charSet.map(({c: char}) => {
                    return <Item key={`${uniqueID}`} char={char} onSelect={onSelect} />;
                })}
            </div>)}
        </div>}
    </div>;
};
export default Family;