import Item from '../Item';
import { uniqueID } from 'src/utils';
import useStyles from './styles';
const Family = ({ data, label, onSelect }) => {
    const classes = useStyles();
    return <div className={classes.Container}>
        <h1>{label}</h1>
        <div className={classes.ItemsContainer}>
            {data.map((d, i) => <div key={`${d.title}_${i}`}>
                <div className={classes.SubfamilyTitle} key={`${uniqueID}`}><h4>{d.title}</h4></div>
                {d.charSet.map(({c: char}) => {
                    return <Item key={`${uniqueID}`} char={char} onSelect={onSelect} />;
                })}
            </div>)}
        </div>
    </div>;
};
export default Family;