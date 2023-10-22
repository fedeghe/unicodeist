import useStyles from './styles';
import { getCodes } from './../../../../../../../../../../utils';
const Item = ({char, onSelect}) => {
    const classes = useStyles(),
        codes = getCodes(char),
        onClick = () => onSelect(char);
    return <div className={classes.Item} onClick={onClick}>
        <div className={classes.Char}>{char}</div>
        <div className={classes.List}>
            <div>
                <div className={classes.Small} title="unicode">{codes.unicode}</div>
                <div className={classes.Small} title="octal">{codes.octal}</div>
                <div className={classes.Small} title="decimal">{codes.decimal}</div>
            </div>
            <div>
                <div className={classes.Small} title="unicode">&nbsp;</div>
                <div className={classes.Small} title="hexadecimal">{codes.hex}</div>
                <div className={classes.Small} title="css content">{codes.css}</div>
            </div> 
        </div>
    </div>;
};
export default Item;