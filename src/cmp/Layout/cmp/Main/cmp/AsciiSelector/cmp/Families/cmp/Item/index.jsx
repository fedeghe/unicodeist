import useStyles from './styles';
import { getCodes } from './../../../../../../../../../../utils';
const Item = ({char, onSelect}) => {
    const classes = useStyles(),
        codes = getCodes(char),
        onClick = () => onSelect(char);
    return <div className={classes.Item} onClick={onClick}>
        <div>{char}</div>
        <div className={classes.Small} title="unicode">{codes.unicode}</div>
        <div className={classes.Small} title="octal">oct: {codes.octal}</div>
        <div className={classes.Small} title="decimal">dec: {codes.decimal}</div>
        <div className={classes.Small} title="hexadecimal">hex: {codes.hex}</div>
    </div>;
};
export default Item;