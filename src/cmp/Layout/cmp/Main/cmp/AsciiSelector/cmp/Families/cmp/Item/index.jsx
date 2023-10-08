import useStyles from './styles';
const Item = ({char, onSelect}) => {
    const classes = useStyles();
    return <div className={classes.Item} onClick={() => onSelect(char)}>{char}</div>;
};
export default Item;