import Item from '../Item';
import { uniqueID } from '../../../../../../../../../../utils';
import useStyles from './styles';
const Family = ({ data, label, onSelect }) => {
    const classes = useStyles();
    return <div className={classes.Container}>
        <h1>{label}</h1>
        <div className={classes.ItemsContainer}>
            {data.map(d => 
                d.char === 'breakingLine'
                    // ? <div key={`${uniqueID}`} className={classes.Br} />
                    ? <hr key={`${uniqueID}`} className={classes.Br} />
                    : <Item key={`${label}-${d.char}`} char={d.char} onSelect={onSelect} />
            )}
        </div>
    </div>;
};
export default Family;